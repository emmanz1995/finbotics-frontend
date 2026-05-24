jest.mock('@/app/services/accounts', () => ({
  service: {
    getAccounts: jest.fn(),
    onSyncAccount: jest.fn(),
  },
}));
jest.mock('@/app/services/balances', () => ({
  service: {
    getAllBalances: jest.fn(),
  },
}));

const mockNavigate = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockNavigate,
  }),
}));
jest.mock('@/app/components/molecules/accountCard', () => {
  return function mockAccountCard({
    detail,
    handleGetAccountId,
    isAccountIdSelected,
  }: any) {
    return (
      <div data-testid="account-card">
        <p>Current Balance</p>
        <span data-testid={`balance-${detail.id}`}>
          {parseFloat(detail.balance[detail.id]?.amount).toFixed(2)}
        </span>

        <p>{detail.ownerName}</p>

        <button
          data-testid={`select-${detail.id}`}
          onClick={handleGetAccountId}
        >
          Select Account
        </button>

        {isAccountIdSelected && <span>Selected</span>}
      </div>
    );
  };
});

import {
  fireEvent,
  render,
  screen,
  waitFor,
  act,
} from '@testing-library/react';
import { useRouter } from 'next/navigation';
import Dashboard from './page';
import { service } from '@/app/services/accounts';
import { service as balanceService } from '@/app/services/balances';

describe('when dashboard page loads', () => {
  describe('when dashboard contents have successfully rendered', () => {
    beforeEach(() => {
      jest.clearAllMocks();

      (service.getAccounts as jest.Mock).mockResolvedValue([
        {
          accountType: 'CACC',
          currency: 'GBP',
          iban: 'GB54REV348758934742893',
          id: '47bd1219-8f8c-4a23-920e-887a1ab5f0bb',
          ownerName: 'Jason Duval',
          resourceId: '99ea4908-9d19-40eb-bb3d-8b833afbb615',
          scan: '05737582956352',
          usage: 'PRIV',
        },
      ]);
      (balanceService.getAllBalances as jest.Mock).mockResolvedValue([
        {
          accountDetailsId: '47bd1219-8f8c-4a23-920e-887a1ab5f0bb',
          amount: 'GBP',
          currency: 'GB54REV348758934742893',
          id: '47bd1219-8f8c-4a23-920e-887a1ab5f0bb-2026-04-05',
          metadata: {
            balanceType: 'interimAvailable',
            referenceDate: '2026-04-05',
          },
          resourceId: '99ea4908-9d19-40eb-bb3d-8b833afbb615',
        },
      ]);
    });

    it('should render dashboard contents correctly', async () => {
      render(<Dashboard />);

      const title = screen.getByText('Your Accounts');
      const balanceTile = screen.getByText('Total Balance');
      const anotherTitle = screen.getByText('Monthly Savings');
      expect(title).toBeInTheDocument();
      expect(balanceTile).toBeInTheDocument();
      expect(anotherTitle).toBeInTheDocument();
      expect(screen.getByText('Loading...')).toBeInTheDocument();

      await waitFor(async () => {
        expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
      });
      const ownerName = screen.getByText('Jason Duval');
      expect(ownerName).toBeInTheDocument();
      expect(service.getAccounts).toHaveBeenCalledTimes(1);
      expect(balanceService.getAllBalances).toHaveBeenCalledTimes(1);
    });
  });
  describe('when button to resync account is clicked', () => {
    beforeEach(() => {
      jest.clearAllMocks();

      (service.getAccounts as jest.Mock).mockResolvedValue([
        {
          accountType: 'CACC',
          currency: 'GBP',
          iban: 'GB54REV348758934742893',
          id: '47bd1219-8f8c-4a23-920e-887a1ab5f0bb',
          ownerName: 'Jason Duval',
          resourceId: '99ea4908-9d19-40eb-bb3d-8b833afbb615',
          scan: '05737582956352',
          usage: 'PRIV',
        },
      ]);
      (balanceService.getAllBalances as jest.Mock).mockResolvedValue([
        {
          accountDetailsId: '47bd1219-8f8c-4a23-920e-887a1ab5f0bb',
          amount: 'GBP',
          currency: 'GB54REV348758934742893',
          id: '47bd1219-8f8c-4a23-920e-887a1ab5f0bb-2026-04-05',
          metadata: {
            balanceType: 'interimAvailable',
            referenceDate: '2026-04-05',
          },
          resourceId: '99ea4908-9d19-40eb-bb3d-8b833afbb615',
        },
      ]);
    });
    it('should render intial state', () => {
      render(<Dashboard />);

      expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });
    it('should render account details action buttons', async () => {
      (service.onSyncAccount as jest.Mock).mockImplementation(() => [{}, {}]);
      (balanceService.getAllBalances as jest.Mock).mockResolvedValue([
        {
          accountDetailsId: '47bd1219-8f8c-4a23-920e-887a1ab5f0bb',
          amount: '200',
          currency: 'GBP',
          id: '47bd1219-8f8c-4a23-920e-887a1ab5f0bb-2026-04-05',
          metadata: {
            balanceType: 'interimAvailable',
            referenceDate: '2026-04-06',
          },
          resourceId: '99ea4908-9d19-40eb-bb3d-8b833afbb615',
        },
      ]);

      render(<Dashboard />);

      await waitFor(async () => {
        expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
      });

      const openBtn = screen.getByTestId(
        'select-47bd1219-8f8c-4a23-920e-887a1ab5f0bb'
      );

      act(() => {
        fireEvent.click(openBtn);
      });

      const refreshBtn = screen.getByTestId('test-refresh-btn');
      const delBtn = screen.getByTestId('test-del-btn');
      const editBtn = screen.getByTestId('test-edit-btn');
      expect(refreshBtn).toBeInTheDocument();
      expect(delBtn).toBeInTheDocument();
      expect(editBtn).toBeInTheDocument();
    });

    it('should resync account once button is clicked', async () => {
      (service.onSyncAccount as jest.Mock).mockImplementation(() => [{}, {}]);

      (balanceService.getAllBalances as jest.Mock).mockResolvedValue([
        {
          accountDetailsId: '47bd1219-8f8c-4a23-920e-887a1ab5f0bb',
          amount: '200',
          currency: 'GBP',
          id: '47bd1219-8f8c-4a23-920e-887a1ab5f0bb-2026-04-05',
          metadata: {
            balanceType: 'interimAvailable',
            referenceDate: '2026-04-06',
          },
          resourceId: '99ea4908-9d19-40eb-bb3d-8b833afbb615',
        },
      ]);

      render(<Dashboard />);

      await waitFor(async () => {
        expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
      });

      const openBtn = screen.getByTestId(
        'select-47bd1219-8f8c-4a23-920e-887a1ab5f0bb'
      );

      act(() => {
        fireEvent.click(openBtn);
      });

      const refreshBtn = screen.getByTestId('test-refresh-btn');
      fireEvent.click(refreshBtn);
      await waitFor(() => {
        expect(screen.queryByText('Loading...')).toBeInTheDocument();
      });

      expect(service.onSyncAccount).toHaveBeenCalledTimes(1);
      expect(service.onSyncAccount).toHaveBeenCalledWith(
        '47bd1219-8f8c-4a23-920e-887a1ab5f0bb'
      );
    });

    it('should redirect to onboarding page', async () => {
      render(<Dashboard />);

      await waitFor(async () => {
        expect(screen.queryByText('Loading...')).toBeInTheDocument();
      });

      const connectToBankBtn = screen.getAllByRole('button', {
        name: /connect bank/i,
      });
      fireEvent.click(connectToBankBtn[1]);

      expect(mockNavigate).toHaveBeenCalledTimes(1);
      expect(mockNavigate).toHaveBeenCalledWith('/onboard-institution');
    });
  });
});
