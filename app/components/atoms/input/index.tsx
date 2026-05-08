import React, { forwardRef } from 'react';
import { IconWrapper, InputWrapper, InputContainer, StyledInput, Label, ErrorMessage } from './input.styled';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, fullWidth, leftIcon, rightIcon, ...rest }, ref) => {
    return (
      <InputContainer>
        {label && <Label>{label}</Label>}
        <InputWrapper>
          {leftIcon && (
            <IconWrapper $position={leftIcon}>{leftIcon}</IconWrapper>
          )}
          <StyledInput
            className="input"
            ref={ref}
            // hasError={!!error}
            // hasLeftIcon={!!leftIcon}
            // hasRightIcon={!!rightIcon}
            {...rest}
          />
          {rightIcon && (
            <IconWrapper $position={rightIcon}>{rightIcon}</IconWrapper>
          )}
        </InputWrapper>
         {error && <ErrorMessage>{error}</ErrorMessage>}
      </InputContainer>
    );
  }
);
Input.displayName = 'Input';
export default Input;
