// src/pages/Home.jsx
import React from "react";
import Hero from "../../components/Hero";
import Services from "../../components/Services";
import EmailSubscription from "../../components/EmailSubscription";
import SocialEventsBooking from "../../components/Special-s";
import MCMerrysFAQ from "../../components/Faq";
import NetflixStyleGrid from "../../components/FeaturedGrid";
import AdsCarousel from "../../components/Adcarousel";
import ScrollingTextSection from "../../components/ui/Scroller";

const Landing = () => {
  return (
    <div className="min-h-screen bg-[#fff700]">
    
      <Hero />
      {/* <ScrollingImages /> */}
     
      {/* <FeaturedGrid /> */}
      <NetflixStyleGrid/>
      {/* <Services /> */}
      <AdsCarousel/>
      <SocialEventsBooking/>
         <MCMerrysFAQ/>
         
      <EmailSubscription />
       {/* <ScrollingTextSection/> */}
    
   
    </div>
  );
};

export default Landing;
