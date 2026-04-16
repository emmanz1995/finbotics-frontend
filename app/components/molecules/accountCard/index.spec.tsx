import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AccountCard, {
  BalanceProps,
} from '@/app/components/molecules/accountCard';

describe('when card renders', () => {
  describe('when texts renders', () => {
    let props: any = {};
    beforeEach(() => {
      props = {
        detail: {
          id: 'acc-1',
          resourceId: 'resource-1',
          iban: '3252652833643738406283',
          scan: '32526528336437',
          currency: 'USD',
          ownerName: 'Lucia Caminos',
          balance: [
            {
              id: 'balance-1',
              amount: '$20,000',
              currency: 'USD',
              type: 'interimAvailable',
              metadata: {
                referenceDate: '2026-04-13',
                balanceType: 'interimAvailable',
              },
              accountDetailsId: 'acc-1',
            },
          ],
        },
      };
    });
    const mockNavigate = jest.fn();
    const mockHandleGetAccountId = jest.fn();
    it('renders texts correctly', () => {
      render(
        <AccountCard
          detail={props.detail}
          navigate={mockNavigate}
          handleGetAccountId={mockHandleGetAccountId}
          isAccountIdSelected={false}
        />
      );

      const getCurrencyText = screen?.getByText('USD Account');
      const getOwnerName = screen.getByText('Lucia Caminos');

      expect(getCurrencyText).toBeInTheDocument();
      expect(getOwnerName).toBeInTheDocument();
      expect(mockHandleGetAccountId).not.toHaveBeenCalled();
    });
  });

  describe('when user double clicks on card', () => {
    let props: any = {};
    beforeEach(() => {
      props = {
        detail: {
          id: 'acc-1',
          resourceId: 'resource-1',
          iban: '3252652833643738406283',
          scan: '32526528336437',
          currency: 'USD',
          ownerName: 'Lucia Caminos',
          balance: [
            {
              id: 'balance-1',
              amount: '$20,000',
              currency: 'USD',
              type: 'interimAvailable',
              metadata: {
                referenceDate: '2026-04-13',
                balanceType: 'interimAvailable',
              },
              accountDetailsId: 'acc-1',
            },
          ],
        },
      };
    });

    const mockNavigate = {
      push: jest.fn(),
    };
    const mockHandleGetAccountId = jest.fn();
    it('should move user to the [id] dashboard page', async () => {
      render(
        <AccountCard
          detail={props.detail}
          navigate={mockNavigate}
          handleGetAccountId={mockHandleGetAccountId}
          isAccountIdSelected={true}
        />
      );

      const cardBtn = screen.getByTestId('test-card-btn');

      await userEvent.dblClick(cardBtn);

      expect(mockNavigate.push).toHaveBeenCalledTimes(1);
      expect(mockNavigate.push).toHaveBeenCalledWith('/dashboard/acc-1');
    });
  });
  // TODO: to address test once I have figured out styling
  // describe('when user clicks on card', () => {})
});
