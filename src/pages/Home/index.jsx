import Footer from '../../components/layouts/Footer';
import MainWrapper from '../../components/layouts/MainWrapper';
import NavBar from '../../components/layouts/NavBar';

import Carousel1 from './Carousel1';
import Feature1 from './Feature1';
import Hero from './Hero1';
import Section1 from './Section1';

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
      </MainWrapper>
      <Section1 />
      <Footer />
    </>
  );
}
