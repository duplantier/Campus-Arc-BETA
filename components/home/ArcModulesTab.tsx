import React from "react";

const ArcModulesTab = () => {
  /* 
    1. fetch all the Arc Modules from the database
    2. display them in a grid layout with cards
    3. each card should have the following:
      - category ("Front-End Engineer", "Back-End Engineer", "Solidity Engineer")
      - level ("Beginner", "Intermediate", "Advanced")
      - Title
      - image
      - description
      - Features (Lessons, Time, Projects)
      - Go to Module
  
  */
  return (
    <section className="w-full  flex-col items-center px-20 overflow-auto flex gap-10 h-[80vh] mb-16 rounded-2xl text-xl md:text-4xl border  bg-white ">
      <h1 className="text-center w-full text-gray-950 mt-10 text-5xl righteous-text">
        Arc Modules
      </h1>
      <p className="text-lg text-center w-full -mt-8 text-gray-500">
        Explore the Arc Modules available on Campus Arc and start building
        today!
      </p>
      <div></div>
    </section>
  );
};

export default ArcModulesTab;
