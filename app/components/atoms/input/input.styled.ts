import styled, { css } from "styled-components";

export const InputContainer = styled.div<{
  fullWidth?: boolean;
}>`
  display: flex;
  flex-direction: column;
  width: ${props => (props.fullWidth ? '100%' : 'auto')};
  margin-bottom: 1rem;
`;
export const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.25rem;
  color: ${props => props.theme.colors.text.primary};
`;
export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;
export const StyledInput = styled.input<{
  hasError?: boolean;
  hasLeftIcon?: boolean;
  hasRightIcon?: boolean;
}>`
  width: 100%;
  padding: 0.625rem 0.75rem;
  font-size: 1rem;
  border-radius: ${props => props.theme.radii.md};
  border: 1px solid
    ${props =>
      props.hasError ? props.theme.colors.danger : props.theme.colors.border};
  background-color: white;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
  ${props =>
    props.hasLeftIcon &&
    css`
      padding-left: 2.5rem;
    `}
  ${props =>
    props.hasRightIcon &&
    css`
      padding-right: 2.5rem;
    `}
  &:focus {
    outline: none;
    border-color: ${props =>
      props.hasError ? props.theme.colors.danger : props.theme.colors.primary};
    box-shadow: 0 0 0 2px
      ${props =>
        props.hasError
          ? props.theme.colors.danger + '33'
          : props.theme.colors.primary + '33'};
  }
  &:disabled {
    background-color: ${props => props.theme.colors.background};
    cursor: not-allowed;
  }
`;
export const ErrorMessage = styled.p`
  font-size: 0.75rem;
  color: ${props => props.theme.colors.danger};
  margin-top: 0.25rem;
`;
export const IconWrapper = styled.div<{
  $position: 'left' | 'right';
}>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${props => (props.$position === 'left' ? 'left: 0.75rem;' : 'right: 0.75rem;')}
  color: ${props => props.theme.colors.text.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
`;
