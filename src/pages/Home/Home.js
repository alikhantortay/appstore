import { Helmet } from "react-helmet-async";

import { Hero } from "../../components/HomePage/Hero/Hero";
import { Benefits } from "../../components/HomePage/Benefits/Benefits";
import { BestDeals } from "../../components/HomePage/BestDeals/BestDeals";
import { Categories } from "../../components/HomePage/Categories/Categories";
import { Featured } from "../../components/HomePage/Featured/Featured";
import { Specials } from "../../components/HomePage/Specials/Specials";
import { MobileAccessories } from "../../components/HomePage/MobileAccessories/MobileAccessories";
import { BigDeal } from "../../components/HomePage/BigDeal/BigDeal";
import { OtherDeals } from "../../components/HomePage/OtherDeals/OtherDeals";
import { Subscribtion } from "../../components/HomePage/Subscribtion/Subscribtion";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Clicon - eCommerce Marketplace</title>
      </Helmet>
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
