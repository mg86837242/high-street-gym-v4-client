import Hero1 from "../components/Hero1";
import NavBar from "../components/NavBar";
import MainWrapper from "../components/MainWrapper";
import Feature1 from "../components/Feature1";
import Carousel1 from "../components/Carousel1";
import Carousel2 from "../components/Carousel2";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Hero1>
        <NavBar isHome={true} />
      </Hero1>
      <MainWrapper gap={"gap-16"} mt={"mt-16"} mb={"mb-20"}>
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
