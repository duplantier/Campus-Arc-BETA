import React from "react";

const CoursesTab = () => {
  return (
    <section className="w-full  flex-col items-center px-20 overflow-auto flex gap-10 h-[80vh] mb-16 rounded-2xl text-xl md:text-4xl border  bg-white ">
      <h1 className="text-center w-full text-gray-950 mt-10 text-5xl righteous-text">
        Courses
      </h1>
      <p className="text-lg text-center w-full -mt-8 text-gray-500">
        Explore the courses available on Campus Arc and start learning today!
      </p>
    </section>
  );
};

export default CoursesTab;
