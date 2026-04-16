import type { FC } from 'react';
import { CreditCardIcon } from 'lucide-react';
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
  navigate: any;
  handleGetAccountId: any;
  isAccountIdSelected: boolean;
}

const Card: FC<CardProps> = ({
  detail,
  navigate,
  handleGetAccountId,
  isAccountIdSelected,
}) => (
  <AccountCard
    $isAccountIdSelected={isAccountIdSelected}
    onDoubleClick={() => navigate.push(`/dashboard/${detail.id}`)}
    onClick={handleGetAccountId}
    data-testid="test-card-btn"
  >
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
    </AccountFooter>
  </AccountCard>
);

export default Card;
