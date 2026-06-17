import styled from 'styled-components';
import { theme, ThemeType } from '@/app/styles/theme';

export const PageContainer = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors?.background};
`;
export const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;
export const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;
export const HeaderContent = styled.div``;
export const Title = styled.h1<ThemeType>`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme?.colors?.text?.primary};
  margin-bottom: 0.5rem;
`;
export const Subtitle = styled.p<ThemeType>`
  font-size: 1rem;
  color: ${({ theme }) => theme?.colors?.text?.secondary};
`;
export const AccountsGrid = styled.div<ThemeType>`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
`;
export const BalanceSection = styled.div`
  margin-top: 1rem;
`;
export const BalanceLabel = styled.p<ThemeType>`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: 0.25rem;
`;
export const BalanceAmount = styled.h4<ThemeType>`
  font-size: 1.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
`;
export const Currency = styled.span<ThemeType>`
  font-size: 1rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors?.text?.secondary};
  margin-right: 0.25rem;
`;
export const ConnectBankCard = styled.div<ThemeType>`
  background-color: white;
  border-radius: ${({ theme }) => theme.radii?.lg};
  box-shadow: ${({ theme }) => theme.shadows?.md};
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 250px;
`;
export const ConnectBankIcon = styled.div<ThemeType>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors?.primary}1a;
  color: ${({ theme }) => theme.colors?.primary};
  margin-bottom: 1rem;
`;
export const ConnectBankTitle = styled.h3<ThemeType>`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors?.text.primary};
  margin-bottom: 0.5rem;
`;
export const ConnectBankDescription = styled.p<ThemeType>`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors?.text.secondary};
  margin-bottom: 1.5rem;
`;
export const SummarySection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;
export const SummaryCard = styled.div<ThemeType>`
  background-color: white;
  border-radius: ${({ theme }) => theme.radii?.lg};
  box-shadow: ${({ theme }) => theme.shadows?.md};
  padding: 1.5rem;
`;
export const SummaryHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
`;
export const SummaryTitle = styled.h3<ThemeType>`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors?.text.primary};
`;
export const SummaryValue = styled.div<ThemeType>`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors?.text?.primary};
`;
export const SummaryDescription = styled.p<ThemeType>`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors?.text?.secondary};
  margin-top: 0.5rem;
`;
