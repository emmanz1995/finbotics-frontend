jest.mock('@/app/helpers', () => ({
  Institutions: [
    {
      id: 'REVOLUT_REVOGB21',
      name: 'Revolut',
      bic: 'REVOGB21',
      transaction_total_days: '730',
      countries: ['GB'],
      logo: 'https://storage.googleapis.com/gc-prd-institution_icons-production/UK/PNG/revolut.png',
      max_access_valid_for_days: '90',
    },
    {
      id: 'LLOYDS_BUSINESS_LOYDGB2L',
      name: 'Lloyds Bank Business',
      bic: 'LOYDGB2L',
      transaction_total_days: '730',
      countries: ['GB'],
      logo: 'https://storage.googleapis.com/gc-prd-institution_icons-production/UK/PNG/lloyds.png',
      max_access_valid_for_days: '90',
    },
    {
      id: 'LLOYDS_COMMERCIAL_LOYDGB2L',
      name: 'Lloyds Bank Commercial',
      bic: 'LOYDGB2L',
      transaction_total_days: '730',
      countries: ['GB'],
      logo: 'https://storage.googleapis.com/gc-prd-institution_icons-production/UK/PNG/lloyds.png',
      max_access_valid_for_days: '90',
    },
  ],
}));
jest.mock('@/app/services/onboard', () => ({
  service: {
    handleConnectToBank: jest.fn(),
    ingestAccounts: jest.fn(),
  },
}));

import { render, screen, fireEvent, act } from '@testing-library/react';
import OnBoard from '@/app/onboard/page';
import { service } from '@/app/services/onboard';

describe('when the onboard is rendered', () => {
  describe('when the institution cards are rendered', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should load all the institutions correctly along with all their cards', () => {
      render(<OnBoard />);

      const getTitle = screen.getByText('Connect Your Bank');
      const cardContainer = screen.getByTestId('main-container');

      expect(getTitle).toBeInTheDocument();
      expect(cardContainer).toBeInTheDocument();
      cardContainer.querySelectorAll('h3').forEach(title => {
        expect(title).toBeInTheDocument();
      });
    });
  });
  describe('when the user selects one card', () => {
    it('should select one card and render the connect to bank btn', () => {
      render(<OnBoard />);

      const cardBtn = screen.getByText(/Revolut/i);
      fireEvent.click(cardBtn);

      expect(
        screen.getByRole('button', { name: /Connect Bank/i })
      ).toBeInTheDocument();
    });

    it('should select one card and render the connect to bank btn then send us to the bank provider page', async () => {
      const logSpy = jest.spyOn(console, 'log');
      render(<OnBoard />);

      const cardBtn = screen.queryByText(/Revolut/i);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      fireEvent.click(cardBtn);

      const connectBankBtn = screen.getByRole('button', {
        name: /Connect Bank/i,
      });

      await act(async () => {
        fireEvent.click(connectBankBtn);

        expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument();
      });

      expect(connectBankBtn).not.toBeInTheDocument();
      expect(logSpy).toHaveBeenCalledTimes(1);
      expect(logSpy).toHaveBeenCalledWith('Connecting to Bank...');
      expect(service.handleConnectToBank).toHaveBeenCalledTimes(1);
    });

    it('should fail to connect to bank', async () => {
      (service.handleConnectToBank as jest.Mock).mockImplementation(() => {
        throw new Error('Unable to connect to bank');
      });
      const logErrorSpy = jest.spyOn(console, 'error');
      render(<OnBoard />);

      const cardBtn = screen.queryByText(/Revolut/i);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      fireEvent.click(cardBtn);

      const connectBankBtn = screen.getByRole('button', {
        name: /Connect Bank/i,
      });

      await act(async () => {
        fireEvent.click(connectBankBtn);

        expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument();
      });

      expect(logErrorSpy).toHaveBeenCalledTimes(1);
      expect(logErrorSpy).toHaveBeenCalledWith(
        Error('Unable to connect to bank')
      );
      expect(service.handleConnectToBank).toHaveBeenCalledTimes(1);
    });
  });
});
