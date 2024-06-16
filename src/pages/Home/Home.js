import { Hero } from "../../components/HomePage/Hero/Hero";
import { Benefits } from "../../components/HomePage/Benefits/Benefits";
import { BestDeals } from "../../components/HomePage/BestDeals/BestDeals";
import { Categories } from "../../components/HomePage/Categories/Categories";
import { Featured } from "../../components/HomePage/Featured/Featured";

const Home = () => {
  return (
    <>
      <Hero />
      <Benefits />
      <BestDeals />
      <Categories />
      <Featured />
    </>
  );
};

export default Home;
