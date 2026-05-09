import type { FC, ReactNode, ButtonHTMLAttributes } from 'react';
import { StyledButton, LoadingSpinner } from './button.styled';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: string;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const Button: FC<ButtonProps> = ({
  children,
  variant,
  size,
  fullWidth,
  ...rest
}) => {
  return (
    <StyledButton
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      {...rest}
    >
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
