import { Hero } from "../../components/HomePage/Hero/Hero";
import { Benefits } from "../../components/HomePage/Benefits/Benefits";
import { BestDeals } from "../../components/HomePage/BestDeals/BestDeals";
import { Categories } from "../../components/HomePage/Categories/Categories";
import { Featured } from "../../components/HomePage/Featured/Featured";
import { Specials } from "../../components/HomePage/Specials/Specials";

const Home = () => {
  return (
    <>
      <Hero />
      <Benefits />
      <BestDeals />
      <Categories />
      <Featured />
      <Specials />
    </>
  );
};

export default Home;
