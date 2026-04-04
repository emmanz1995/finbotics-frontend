import { Main, StyledLayout } from './styles';
import Navbar from '../molecules/navbar';

function Layout({ children }: any) {
  return (
    <StyledLayout>
      <div className="layout-header">
        <div>
          <Navbar />
        </div>
        <Main style={{ width: '100%' }}>{children}</Main>
      </div>
    </StyledLayout>
  );
}

export default Layout;
