import styled from 'styled-components';
import { theme } from '@/app/styles/theme';

export const GridLayout = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.5rem;
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
  margin-top: 1.5rem;
`;

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const AccountDetailsContainer = styled.div`
  padding: 1.5rem;
  border-radius: ${theme.radii?.lg};
  box-shadow: ${theme.shadows?.lg};
  background-color: white;
`;

export const AccountHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
`;
export const AccountInfo = styled.div``;
export const BalanceInfo = styled.div``;
export const BalanceAmount = styled.div`
  display: flex;
  align-items: center;
`;

export const AccountDetailsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
`;

export const AccountDetail = styled.div`
  background-color: ${theme.colors?.background};
  padding: 1.5rem;
  border-radius: ${theme?.radii?.lg};
`;

export const SpendingOverviewContainer = styled.div`
  box-shadow: ${theme.shadows?.lg};
  background-color: ${theme.colors?.text?.white};
  padding: 1.5rem;
  height: 400px;
  border-radius: ${theme.radii?.lg};
  width: 100%;
  margin-bottom: 1.5rem;
`;
export const SpendingPredicationContainer = styled.div`
  box-shadow: ${theme.shadows?.lg};
  background-color: ${theme.colors?.text?.white};
  padding: 1.5rem;
  height: 350px;
  border-radius: ${theme.radii?.lg};
  margin-bottom: 1.5rem;
`;
export const RecentTransactionContainer = styled.div`
  box-shadow: ${theme.shadows?.lg};
  background-color: ${theme?.colors?.text?.white};
  padding: 1.5rem;
  height: 500px;
  border-radius: ${theme.radii?.lg};
`;
export const FinancialTipsContainer = styled.div`
  box-shadow: ${theme.shadows?.lg};
  background-color: ${theme.colors?.text?.white};
  padding: 1.5rem;
  height: 400px;
  border-radius: ${theme.radii?.lg};
`;
export const HeaderContainer = styled.span`
  display: flex;
  align-items: center;
  justify-content: left;
  gap: 0.5rem;
`;
export const GroupedRows = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  gap: 1.5rem;
  width: 100%;
  @media (max-width: 992px) {
    flex-direction: column;
  }
`;
export const FirstColumn = styled.div``;
export const SecondColumn = styled.div``;

export const Pagination = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
`;

export const StyledTabs = styled.div``;
export const StyledTabsOption = styled.div``;
export const TransactionContainer = styled.div`
  background-color: ${theme.colors?.text?.white};
  width: 100%;
`;
export const TransactionDetailsContainer = styled.div`
  padding: 10px 0;
  margin: 15px;
  display: flex;
  justify-content: left;
  align-items: center;
  width: 100%;
`;
// export const AccountDetailsContainer = styled.div``
// export const AccountDetailsContainer = styled.div``
// export const AccountDetailsContainer = styled.div``

export const TransactionListContainer = styled.div`
  background-color: ${theme.colors?.text?.white};
  border-radius: 6px;
  box-shadow: ${theme.shadows?.md};
  overflow: hidden;
`;
export const TransactionHeader = styled.div`
  padding: 15px;
  border-bottom: 1px solid #ddd;
`;
export const TransactionTitle = styled.h3`
  font-size: ${theme.fontSizes.lg};
  font-weight: 600;
  color: ${theme.colors?.text?.primary};
  margin-bottom: ${theme.space?.xs};
`;
export const TransactionSubtitle = styled.p`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors?.text?.secondary};
`;
export const TransactionTable = styled.div`
  width: 100%;
`;
export const TransactionRow = styled.div`
  display: flex;
  align-items: center;
  padding: ${theme.space.md} ${theme.space.lg};
  border-bottom: 1px solid ${theme.colors?.text?.light};
  transition: background-color 0.2s ease;
  &:last-child {
    border-bottom: none;
  }
  &:hover {
    background-color: ${theme.colors?.text?.light};
  }
`;
export const TransactionInfo = styled.div`
  flex: 1;
`;
export const TransactionName = styled.div`
  font-weight: 500;
  color: ${theme.colors?.text?.primary};
  margin-bottom: ${theme.space.xs};
`;
export const TransactionMeta = styled.div`
  display: flex;
  font-size: ${theme.fontSizes?.sm};
  color: ${theme.colors?.text?.secondary};
`;
export const TransactionCategory = styled.span`
  margin-right: ${theme.space.md};
`;
export const TransactionDate = styled.span``;
export const TransactionAmount = styled.div<
  {
    $type: 'credit' | 'debit';
  }
>`
  font-weight: 600;
  color: ${({ $type, theme }: any) =>
    $type === 'credit' ? theme.colors?.success : theme.colors?.text?.primary};
  display: flex;
  align-items: center;
  gap: ${({ theme }: any) => theme.space?.xs};
`;

export const IconContainer = styled.div<{
  $category: string;
}>`
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }: any) => theme.radii?.md};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${({ theme }: any) => theme.space?.md};
  background-color: ${({ $category, theme }: any) => {
    switch ($category.toLowerCase()) {
      case 'groceries':
        return `${theme.colors?.success}15`;
      case 'dining':
        return `${theme.colors?.warning}15`;
      case 'transportation':
        return `${theme.colors?.info}15`;
      case 'shopping':
        return `${theme.colors?.secondary}15`;
      case 'utilities':
        return `${theme.colors?.gray[500]}15`;
      case 'entertainment':
        return `${theme.colors?.secondary}15`;
      case 'income':
      case 'payment':
        return `${theme.colors?.success}15`;
      default:
        return theme.colors?.text?.light;
    }
  }};
  color: ${({ $category, theme }: any) => {
    switch ($category.toLowerCase()) {
      case 'groceries':
        return theme?.colors?.success;
      case 'dining':
        return theme?.colors?.warning;
      case 'transportation':
        return theme?.colors?.info;
      case 'shopping':
        return theme?.colors?.secondary;
      case 'utilities':
        return theme?.colors?.gray[500];
      case 'entertainment':
        return theme?.colors?.secondary;
      case 'income':
      case 'payment':
        return theme?.colors?.success;
      default:
        return theme?.colors?.text.secondary;
    }
  }};
`;
