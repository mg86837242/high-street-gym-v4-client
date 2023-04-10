import { Outlet } from 'react-router-dom';
import NavBar from '../components/layouts/NavBar';
import Footer from '../components/layouts/Footer';

export default function PageLayout() {
  return (
    <>
      <NavBar isHome={false} />
      <Outlet />
      <Footer />
    </>
  );
}
