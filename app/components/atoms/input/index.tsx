import React, { forwardRef } from 'react';
import './styles.scss';

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
      <div className="input-container">
        {label && <label>{label}</label>}
        <div className="input-wrapper">
          {leftIcon && <div className="icon-wrapper">{leftIcon}</div>}
          <input
            className="input"
            ref={ref}
            // hasError={!!error}
            // hasLeftIcon={!!leftIcon}
            // hasRightIcon={!!rightIcon}
            {...rest}
          />
          {rightIcon && <div className="icon-wrapper">{rightIcon}</div>}
        </div>
        {/* {error && <ErrorMessage>{error}</ErrorMessage>} */}
      </div>
    );
  }
);
Input.displayName = 'Input';
export default Input;
