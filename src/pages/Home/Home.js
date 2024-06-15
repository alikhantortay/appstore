import { Hero } from "../../components/HomePage/Hero/Hero";
import { Benefits } from "../../components/HomePage/Benefits/Benefits";
import { BestDeals } from "../../components/HomePage/BestDeals/BestDeals";
import { Categories } from "../../components/HomePage/Categories/Categories";

const Home = () => {
  return (
    <>
      <Hero />
      <Benefits />
      <BestDeals />
      <Categories />
    </>
  );
};

export default Home;
