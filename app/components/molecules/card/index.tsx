import React from 'react';
import type { FC } from 'react';
import {
  Card as StyledCard,
  BankLogo,
} from '@/app/components/molecules/card/card.styled';
import Button from '@/app/components/atoms/button';

interface CardProps {
  isSelected: boolean;
  institution: any;
  handleConnectBank: () => void;
  onSelectBank: any;
}

const Card: FC<CardProps> = ({
  isSelected,
  institution,
  handleConnectBank,
  onSelectBank,
}) => (
  <StyledCard $isSelected={isSelected} onClick={onSelectBank}>
    <BankLogo
      src={institution.logo}
      alt={institution.name}
      width={50}
      height={50}
    /><br />
    {institution.name}<br />
    {isSelected && (
      <Button variant="outline" onClick={handleConnectBank}>
        Connect Bank
      </Button>
    )}
  </StyledCard>
);

export default Card;
