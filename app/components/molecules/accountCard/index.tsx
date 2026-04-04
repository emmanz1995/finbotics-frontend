import type { FC } from 'react';
import { CreditCardIcon, TrashIcon, RefreshCcwIcon } from 'lucide-react';
import {
  AccountCard,
  AccountHeader,
  AccountInfo,
  AccountName,
  AccountNumber,
  AccountIcon,
  BalanceSection,
  BalanceLabel,
  BalanceAmount,
  AccountFooter,
  AccountOwner,
  Currency,
} from './styles';
import Button from '@/app/components/atoms/button';

export interface BalanceToReturnProp {
  [key: string]: {
    id: string;
    amount: number;
    currency: string;
    type: string;
    metadata: object;
    accountDetailsId: string;
  };
}
export interface BalanceProps {
  id: string;
  amount: number;
  currency: string;
  type: string;
  metadata: object;
  accountDetailsId: string;
}

export interface AccountDetailsProps {
  id: string;
  resourceId: string;
  iban: string;
  scan: string;
  currency: string;
  ownerName: string;
  balance: BalanceProps[] | any;
}

interface CardProps {
  detail: AccountDetailsProps;
  handleAccountDataSync: (accountId: string) => Promise<void>;
  isLoading: boolean;
}

const Card: FC<CardProps> = ({ detail, handleAccountDataSync, isLoading }) => (
  <AccountCard>
    <AccountHeader>
      <AccountInfo>
        <AccountName>{detail.currency} Account</AccountName>
        <AccountNumber>
          {detail.iban && (
            <>
              IBAN:{' '}
              {`${detail.iban?.slice(0, 4)}...${detail.iban?.slice(18, 22)}`}
            </>
          )}
        </AccountNumber>
      </AccountInfo>
      <AccountIcon>
        <CreditCardIcon size={20} />
      </AccountIcon>
    </AccountHeader>
    <BalanceSection>
      <BalanceLabel>Current Balance</BalanceLabel>
      <BalanceAmount>
        <Currency>£</Currency>
        {parseFloat(detail.balance[detail.id]?.amount).toFixed(2)}
      </BalanceAmount>
    </BalanceSection>
    <AccountFooter>
      <AccountOwner href={`/dashboard/${detail.id}`}>
        {detail.ownerName}
      </AccountOwner>
      <span>
        <Button
          data-testid="test-refresh-btn"
          variant="outline"
          size="sm"
          isLoading={isLoading}
          onClick={() => handleAccountDataSync(detail?.id)}
        >
          <RefreshCcwIcon cursor="pointer" />
        </Button>{' '}
        <Button variant="outline" size="sm" data-testid="test-del-btn">
          <TrashIcon cursor="pointer" />
        </Button>
      </span>
    </AccountFooter>
  </AccountCard>
);

export default Card;
