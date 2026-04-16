import { render, screen, fireEvent } from '@testing-library/react';
import Card from '@/app/components/molecules/card';

describe('when card renders', () => {
  const mockHandleConnectBank = jest.fn();
  const mockOnSelectBank = jest.fn();
  let institution = {};
  beforeEach(() => {
    institution = {
      id: 'REVOLUT_REVOGB21',
      name: 'Revolut',
      bic: 'REVOGB21',
      transaction_total_days: '730',
      countries: ['GB'],
      logo: 'https://storage.googleapis.com/gc-prd-institution_icons-production/UK/PNG/revolut.png',
    };
  });
  describe('when texts renders', () => {
    it('should render texts correctly', () => {
      render(
        <Card
          isSelected={false}
          institution={institution}
          handleConnectBank={mockHandleConnectBank}
          onSelectBank={mockOnSelectBank}
        />
      );
      const getBankName = screen.getByText('Revolut');

      expect(getBankName).toBeInTheDocument();
      expect(mockHandleConnectBank).not.toHaveBeenCalled();
      expect(mockOnSelectBank).not.toHaveBeenCalled();
      expect(
        screen.queryByRole('button', {
          name: 'Connect Bank',
        })
      ).not.toBeInTheDocument();
    });

    it('should render texts correctly and the connect bank btn', () => {
      render(
        <Card
          isSelected={true}
          institution={institution}
          handleConnectBank={mockHandleConnectBank}
          onSelectBank={mockOnSelectBank}
        />
      );
      const getBankName = screen.getByText('Revolut');

      expect(getBankName).toBeInTheDocument();
      expect(mockHandleConnectBank).not.toHaveBeenCalled();
      expect(mockOnSelectBank).not.toHaveBeenCalled();
      expect(
        screen.getByRole('button', {
          name: 'Connect Bank',
        })
      ).toBeInTheDocument();
    });
  });
  describe('when user clicks the institution card it should render the connect bank btn', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    it('should click the institution card and render the connect bank btn', () => {
      render(
        <Card
          isSelected={true}
          institution={institution}
          handleConnectBank={mockHandleConnectBank}
          onSelectBank={mockOnSelectBank}
        />
      );

      const cardBtn = screen.getByTestId('bank-card-btn');
      fireEvent.click(cardBtn);
      const connectBankbtn = screen.getByRole('button', {
        name: 'Connect Bank',
      });

      expect(connectBankbtn).toBeInTheDocument();
      expect(mockOnSelectBank).toHaveBeenCalledTimes(1);
      expect(mockHandleConnectBank).toHaveBeenCalledTimes(0);
    });

    it('should redirect user to the bank landing page', () => {
      render(
        <Card
          isSelected={true}
          institution={institution}
          handleConnectBank={mockHandleConnectBank}
          onSelectBank={mockOnSelectBank}
        />
      );

      const cardBtn = screen.getByTestId('bank-card-btn');
      fireEvent.click(cardBtn);

      const connectBankBtn = screen.getByRole('button', {
        name: 'Connect Bank',
      });
      fireEvent.click(connectBankBtn);

      expect(connectBankBtn).toBeInTheDocument();
      expect(mockOnSelectBank).toHaveBeenCalledTimes(2);
      expect(mockHandleConnectBank).toHaveBeenCalledTimes(1);
    });
  });
});
