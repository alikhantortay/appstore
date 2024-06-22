import { Hero } from "../../components/HomePage/Hero/Hero";
import { Benefits } from "../../components/HomePage/Benefits/Benefits";
import { BestDeals } from "../../components/HomePage/BestDeals/BestDeals";
import { Categories } from "../../components/HomePage/Categories/Categories";
import { Featured } from "../../components/HomePage/Featured/Featured";
import { Specials } from "../../components/HomePage/Specials/Specials";
import { MobileAccessories } from "../../components/HomePage/MobileAccessories/MobileAccessories";
import { BigDeal } from "../../components/HomePage/BigDeal/BigDeal";
import { OtherDeals } from "../../components/HomePage/OtherDeals/OtherDeals";
import { Subscribtion } from "../../components/HomePage/Subscribe/Subscribtion";

const Home = () => {
  return (
    <>
      <Hero />
      <Benefits />
      <BestDeals />
      <Categories />
      <Featured />
      <Specials />
      <MobileAccessories />
      <BigDeal />
      <OtherDeals />
      <Subscribtion />
    </>
  );
};

export default Home;
