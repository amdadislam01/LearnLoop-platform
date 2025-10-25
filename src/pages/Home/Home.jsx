import React, { useContext } from "react";
import HeroSection from "../../components/HeroSection/HeroSection";
import PopularSkills from "../../components/PopularSkills/PopularSkills";
import HowItWorks from "../../components/HowItWorks/HowItWorks";
import Teacher from "../../components/Teacher/Teacher";
import Testimonials from "../../components/Testimonials/Testimonials";
import { AuthContext } from "../../context/AuthContext";
import Loading from "../../components/Loading/Loading";
import TopRated from "../../components/TopRated/TopRated";

const Home = () => {
  const { loading } = useContext(AuthContext);
  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <HeroSection />
      <PopularSkills />
      <TopRated />
      <Teacher />
      <HowItWorks />
      <Testimonials />
    </>
  );
};

export default Home;
