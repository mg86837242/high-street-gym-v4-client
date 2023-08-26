import { Outlet } from 'react-router-dom';

import Footer from './Footer';
import NavBar from './NavBar';

export default function PageLayout() {
  return (
    <>
      <NavBar isHome={false} />
      <Outlet />
      <Footer />
    </>
  );
}
