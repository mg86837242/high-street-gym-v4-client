import { Outlet } from 'react-router-dom';
import NavBar from '../components/Layout/NavBar';
import Footer from '../components/Layout/Footer';

export default function PageLayout() {
  return (
    <>
      <NavBar isHome={false} />
      <Outlet />
      <Footer />
    </>
  );
}
