import styled from 'styled-components';

interface Props {
  theme: {
    colors: {
      background: string;
      text: {
        primary: string;
        secondary: string;
      };
    };
  };
}

export const PageContainer = styled.div<Props>`
  min-height: 100vh;
  background-color: ${props => props.theme.colors.background};
`;
export const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

export const Title = styled.h1<Props>`
  font-size: 2rem;
  font-weight: 700;
  color: ${props => props.theme.colors?.text?.primary};
  margin-bottom: 0.5rem;
`;
export const Subtitle = styled.p<Props>`
  font-size: 1rem;
  color: ${props => props.theme.colors?.text?.secondary};
`;

export const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;
export const HeaderContent = styled.div``;
