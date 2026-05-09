jest.mock('@/app/services/accounts', () => ({
  service: {
    getAccounts: jest.fn(),
  },
}));
jest.mock('@/app/services/balances', () => ({
  service: {
    getAllBalances: jest.fn(),
  },
}));
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

import { render, screen, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import Dashboard from './page';
import { service } from '@/app/services/accounts';
import { service as balanceService } from '@/app/services/balances';

describe('when dashboard page loads', () => {
  describe('when dashboard contents have successfully rendered', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should render dashboard contents correctly', async () => {
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
});
