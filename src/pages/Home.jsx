import Hero from '../components/Home/Hero1';
import NavBar from '../components/layouts/NavBar';
import MainWrapper from '../components/layouts/MainWrapper';
import Feature1 from '../components/Home/Feature1';
import Carousel1 from '../components/Home/Carousel1';
import Carousel2 from '../components/Home/Carousel2';
import Footer from '../components/layouts/Footer';

export default function Home() {
  return (
    <>
      <Hero>
        <NavBar isHome={true} />
      </Hero>
      <MainWrapper gap={'gap-16'} mt={'mt-16'} mb={'mb-20'}>
        <Feature1>
          <Carousel1 />
        </Feature1>
        <Feature1>
          <Carousel2 />
        </Feature1>
      </MainWrapper>
      <Footer />
    </>
  );
}
