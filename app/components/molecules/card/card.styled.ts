import styled from 'styled-components';
import Image from 'next/image';

export const Card = styled.div<{ $isSelected: boolean }>`
  padding: 1rem;
  background-color: #6b7280;
  cursor: pointer;
`;

export const BankLogo = styled(Image)`
  height: 50px;
  width: auto;
  object-fit: contain;
  margin-bottom: 1rem;
`;
