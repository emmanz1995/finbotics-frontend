import type { FC } from 'react';
import { StyledButton, LoadingSpinner } from './styles';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: string;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button: FC<ButtonProps> = ({
  children,
  variant,
  size,
  fullWidth,
  ...rest
}) => {
  return (
    <StyledButton variant={variant} size={size} fullWidth={fullWidth} {...rest}>
      {rest.isLoading ? (
        <>
          <LoadingSpinner /> Please wait
        </>
      ) : (
        <>{children}</>
      )}
    </StyledButton>
  );
};

export default Button;
