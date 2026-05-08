import styled, { css } from 'styled-components';
import { theme } from '@/app/styles/theme';

interface Props {
  colors: {
    primary: string;
    secondary: string;
    danger: string;
    text: { primary: string };
  };
}
const chooseVariant = (variant: string, theme: Props) => {
  switch (variant) {
    case 'primary':
      return css`
        background-color: ${theme.colors.primary};
        color: white;
        border: 1px solid ${theme.colors.primary};
        &:hover:not(:disabled) {
          background-color: ${theme.colors.primary}e6;
        }
      `;
    case 'secondary':
      return css`
        background-color: ${theme.colors.secondary};
        color: white;
        border: 1px solid ${theme.colors.secondary};
        &:hover:not(:disabled) {
          background-color: ${theme.colors.secondary}e6;
        }
      `;
    case 'outline':
      return css`
        background-color: transparent;
        color: ${theme.colors.primary};
        border: 1px solid ${theme.colors.primary};
        &:hover:not(:disabled) {
          background-color: ${theme.colors.primary}1a;
        }
      `;
    case 'ghost':
      return css`
        background-color: transparent;
        color: ${theme.colors.text.primary};
        border: 1px solid transparent;
        &:hover:not(:disabled) {
          background-color: ${theme.colors.text.primary}1a;
        }
      `;
    case 'danger':
      return css`
        background-color: ${theme.colors.danger};
        color: white;
        border: 1px solid ${theme.colors.danger};
        &:hover:not(:disabled) {
          background-color: ${theme.colors.danger}e6;
        }
      `;
    default:
      return css``;
  }
};

const chooseSize = (size?: string) => {
  switch (size) {
    case 'sm':
      return css`
        padding: 0.375rem 0.75rem;
        font-size: 0.875rem;
      `;
    case 'lg':
      return css`
        padding: 0.75rem 1.5rem;
        font-size: 1.125rem;
      `;
    case 'md':
    default:
      return css`
        padding: 0.5rem 1rem;
        font-size: 1rem;
      `;
  }
};

export const StyledButton = styled.button<{
  $variant: string;
  $size?: string;
  $fullWidth?: string;
  theme?: Props;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: 500;
  border-radius: 0.25rem;
  transition: 0.2s;
  cursor: pointer;
  ${({ $size }) => {
    return chooseSize($size);
  }}
  ${({ $variant }) => {
    return chooseVariant($variant, theme);
  }}
   width: ${({ $fullWidth }) => ($fullWidth === 'full' ? '100%' : 'auto')};
`;

export const LoadingSpinner = styled.div<{ theme: Props }>`
  width: 1rem;
  height: 1rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 0.8s linear infinite;
  background-color: ${theme.colors.primary};
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
