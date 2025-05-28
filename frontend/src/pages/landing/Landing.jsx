// src/pages/Home.jsx
import React from "react";
import Header from "../../components/Header";
import Hero from "../../components/Hero";
import ScrollingImages from "../../components/ScrollingImages";
import FeaturedGrid from "../../components/FeaturedGrid";
import Services from "../../components/Services";
import EmailSubscription from "../../components/EmailSubscription";
import Footer from "../../components/Footer";
import SocialEventsBooking from "../../components/Special-s";
import MCMerrysFAQ from "../../components/Faq";

const Home = () => {
  return (
    <div className="min-h-screen bg-[#fff700]">
      <Header />
      <Hero />
      {/* <ScrollingImages /> */}
      <FeaturedGrid />
      <Services />
      <SocialEventsBooking/>
         <MCMerrysFAQ/>
      <EmailSubscription />
      <Footer />
   
    </div>
  );
};

export default Home;
