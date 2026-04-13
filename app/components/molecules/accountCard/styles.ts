// import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '@/app/styles/theme';

export const AccountCard = styled.div<{ isAccountIdSelected: boolean }>`
  background-color: ${({ isAccountIdSelected }) =>
    isAccountIdSelected ? 'grey' : 'white'};
  border-radius: ${theme.radii?.lg};
  box-shadow: ${theme.shadows?.md};
  padding: 1.5rem;

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  text-decoration: none;
  color: inherit;
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${theme.shadows?.lg};
  }
  cursor: pointer;
`;
export const AccountHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
`;
export const AccountInfo = styled.div``;
export const AccountName = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${theme.colors?.text?.primary};
  margin-bottom: 0.25rem;
`;
export const AccountNumber = styled.p`
  font-size: 0.875rem;
  color: ${theme.colors?.text?.secondary};
`;
export const AccountIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${theme.colors?.primary}1a;
  color: ${theme.colors?.primary};
`;
export const BalanceSection = styled.div`
  margin-top: 1rem;
`;
export const BalanceLabel = styled.p`
  font-size: 0.875rem;
  color: ${theme.colors?.text?.secondary};
  margin-bottom: 0.25rem;
`;
export const BalanceAmount = styled.h4`
  font-size: 1.75rem;
  font-weight: 700;
  color: ${theme.colors?.text?.primary};
`;
export const Currency = styled.span`
  font-size: 1rem;
  font-weight: 400;
  color: ${theme.colors?.text?.secondary};
  margin-right: 0.25rem;
`;
export const AccountFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid ${theme?.colors?.border};
`;
export const AccountOwner = styled.a`
  font-size: 0.875rem;
  color: ${theme.colors?.text?.secondary};
`;
