import styled from 'styled-components';
import { ThemeType } from '@/app/styles/theme';

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

export const AccountDetailsContainer = styled.div<ThemeType>`
  padding: 1.5rem;
  border-radius: ${({ theme }) => theme.radii?.lg};
  box-shadow: ${({ theme }) => theme.shadows?.lg};
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

export const AccountDetail = styled.div<ThemeType>`
  background-color: ${({ theme }) => theme.colors?.background};
  padding: 1.5rem;
  border-radius: ${({ theme }) => theme?.radii?.lg};
`;

export const SpendingOverviewContainer = styled.div<ThemeType>`
  box-shadow: ${({ theme }) => theme.shadows?.lg};
  background-color: ${({ theme }) => theme.colors?.text?.white};
  padding: 1.5rem;
  height: 400px;
  border-radius: ${({ theme }) => theme.radii?.lg};
  width: 100%;
  margin-bottom: 1.5rem;
`;
export const SpendingPredicationContainer = styled.div<ThemeType>`
  box-shadow: ${({ theme }) => theme.shadows?.lg};
  //background-color: ${({ theme }) => theme.colors?.text?.white};
  background-color: white;
  padding: 1.5rem;
  height: 350px;
  border-radius: ${({ theme }) => theme.radii?.lg};
  margin-bottom: 1.5rem;
`;
export const RecentTransactionContainer = styled.div<ThemeType>`
  box-shadow: ${({ theme }) => theme.shadows?.lg};
  background-color: ${({ theme }) => theme?.colors?.text?.white};
  padding: 1.5rem;
  height: 500px;
  border-radius: ${({ theme }) => theme.radii?.lg};
`;
export const FinancialTipsContainer = styled.div<ThemeType>`
  box-shadow: ${({ theme }) => theme.shadows?.lg};
  background-color: ${({ theme }) => theme.colors?.text?.white};
  padding: 1.5rem;
  height: 400px;
  border-radius: ${({ theme }) => theme.radii?.lg};
`;
export const HeaderContainer = styled.span`
  display: flex;
  align-items: center;
  justify-content: left;
  gap: 0.5rem;
  margin-bottom: 15px;
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
export const TransactionContainer = styled.div<ThemeType>`
  background-color: ${({ theme }) => theme.colors?.text?.white};
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

export const TransactionListContainer = styled.div<ThemeType>`
  background-color: ${({ theme }) => theme.colors?.text?.white};
  border-radius: 6px;
  box-shadow: ${({ theme }) => theme.shadows?.md};
  overflow: hidden;
`;
export const TransactionHeader = styled.div`
  padding: 15px;
  border-bottom: 1px solid #ddd;
`;
export const TransactionTitle = styled.h3<ThemeType>`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 600;
  color: ${({ theme }) => theme.colors?.text?.primary};
  margin-bottom: ${({ theme }) => theme.space?.xs};
`;
export const TransactionSubtitle = styled.p<ThemeType>`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors?.text?.secondary};
`;
export const TransactionTable = styled.div`
  width: 100%;
`;
export const TransactionRow = styled.div<ThemeType>`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.space.md} ${({ theme }) => theme.space.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors?.text?.light};
  transition: background-color 0.2s ease;
  &:last-child {
    border-bottom: none;
  }
  &:hover {
    background-color: ${({ theme }) => theme.colors?.text?.light};
  }
`;
export const TransactionInfo = styled.div`
  flex: 1;
`;
export const TransactionName = styled.div<ThemeType>`
  font-weight: 500;
  color: ${({ theme }) => theme.colors?.text?.primary};
  margin-bottom: ${({ theme }) => theme.space.xs};
`;
export const TransactionMeta = styled.div<ThemeType>`
  display: flex;
  font-size: ${({ theme }) => theme.fontSizes?.sm};
  color: ${({ theme }) => theme.colors?.text?.secondary};
`;
export const TransactionCategory = styled.span<ThemeType>`
  margin-right: ${({ theme }) => theme.space.md};
`;
export const TransactionDate = styled.span``;
export const TransactionAmount = styled.div<{
  $type: 'credit' | 'debit';
  theme: ThemeType;
}>`
  font-weight: 600;
  color: ${({ $type, theme }: any) =>
    $type === 'credit' ? theme.colors?.success : theme.colors?.text?.primary};
  display: flex;
  align-items: center;
  gap: ${({ theme }: any) => theme.space?.xs};
`;

export const IconContainer = styled.div<{
  $category: string;
  theme: ThemeType;
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

export const NotableExpenseHeading = styled.p`
  font-size: 11px;
  color: #9ca3af;
  font-weight: 800;
  margin-top: 0.5rem;
`;

export const NotableExpense = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 0.5rem;
`;
export const ExpenseTag = styled.div`
  padding: 10px;
  background-color: rgb(249, 250, 251);
  border-radius: 6px;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const FrequentStoreDiv = styled.div`
  display: flex;
  gap: 10px;
`;
export const FrequentStoreDesc = styled.p`
  font-size: 10px;
  padding: 3px;
  background-color: rgb(249, 250, 251);
  border-radius: 0.25rem;
  color: rgb(31, 41, 55);
  font-weight: 700;
  margin-top: 0.5rem;
`;

export const PredictionWeekTitle = styled.p`
  font-size: 0.75rem;
  color: rgb(107, 114, 128);
  margin-bottom: 0.25rem;
`;
export const PredictionWeekAmount = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: rgb(31, 41, 55);
  margin-top: 0.5rem;
  margin-bottom: 1rem;
`;
export const FrequentStoreTitle = styled.h6`
  font-size: 0.75rem;
  color: rgb(107, 114, 128);
  margin-bottom: 0.25rem;
`;
// export const AccountDetailsContainer = styled.div``;