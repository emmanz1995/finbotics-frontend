// import { useNavigate } from 'react-router-dom';
import {
  HomeIcon,
  PlusCircle,
  Wallet,
  // ArrowLeftIcon,
  // CreditCardIcon,
  // AlertCircleIcon,
  // User2Icon,
  // LogOutIcon,
} from 'lucide-react';
import styled from 'styled-components';
import { theme } from '@/app/styles/theme';

const Nav = styled.nav`
  width: 100%;
  background-color: ${theme?.colors?.card};
  padding: 10px;
`;
const NavMainSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;
const UnorderedList = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
`;
const List = styled.li`
  list-style: none !important;
`;
const HyperLink = styled.a`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-decoration: none;
  gap: 2px;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme?.space?.sm};
`;
const LogoText = styled.h1`
  font-size: 1.25rem;
  font-weight: 600;
`;

const Navbar = () => {
  // const navigate = useNavigate();

  return (
    <Nav>
      <NavMainSection>
        <Logo>
          <Wallet
            className="w-8 h-8"
            style={{
              color: 'rgb(106,85,250)',
            }}
          />
          <LogoText>Finbotics</LogoText>
        </Logo>
        <UnorderedList>
          <List>
            <HyperLink href="/accounts-dashboard">
              <HomeIcon size={15} /> Dashboard
            </HyperLink>
          </List>
          <List>
            <HyperLink href="/onboard-institution">
              <PlusCircle size={15} /> Connect Bank
            </HyperLink>
          </List>
          {/* <List>
            <HyperLink href="/profile/:id">
              <User2Icon size={15} /> Profile
            </HyperLink>
          </List> */}
          {/* <List>
            <HyperLink href="/">
              <User2Icon size={15} /> Emmanuel Okuchukwu
            </HyperLink>
          </List> */}
          {/* <List>
            <HyperLink href="" onClick={handleLogout}>
              <LogOutIcon size={15} /> Logout
            </HyperLink>
          </List> */}
        </UnorderedList>
      </NavMainSection>
    </Nav>
  );
};

export default Navbar;
