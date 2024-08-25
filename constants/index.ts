export const exampleArcModules = [
  {
    title: "Introduction to HTML5",
    description:
      "Learn the basics of HTML5 and get started with web development.",
    category: "Front-End Engineering",
    imageSrc: "html-basics-module-image.png",
    lessons: "23 Lessons",
    time: "3.5 Hours",
    projects: "5 Projects",
    level: "Beginner",
  },
  {
    title: "CSS3 Fundamentals",
    description: "Master the fundamentals of CSS3 and web design skills.",
    category: "Front-End Engineering",
    imageSrc: "css3-fundamentals.png",
    lessons: "56 Lessons",
    time: "6 Hours",
    projects: "8 Projects",
    level: "Intermediate",
  },
  {
    title: "Full-Stack Development with Next.js",
    description:
      " Learn how to build full-stack applications with Next.js and React.",
    category: "Full-Stack Engineering",
    imageSrc: "fullstack-nextjs-dev.png",
    lessons: "87 Lessons",
    time: "11 Hours",
    projects: "3 Projects",
    level: "Advanced",
  },
];

export const exampleStudentData = {
  eduUsername: "duplantier.edu",
  email: "",
  ethAddress: "0xaF6Ef7E769D4BAFCdc5bd60a036D89248086F4C1",
  OCaccessToken:
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiIsImtpZCI6ImFybjphd3M6a21zOmFwLW5vcnRoZWFzdC0yOjQ5NTEzMDE4NjU2OTprZXkvNDk4OWM3MTItZTdhYi00ZjJkLWFlMjEtZDE3MGJiNmE0MTMyIn0",
  registeredArcModules: [
    {
      id: 1,
      title: "Introduction to HTML5",
      description:
        "Learn the basics of HTML5 and get started with web development.",
      category: "Front-End Engineering",
      imageSrc: "html-basics-module-image.png",
      lessons: 23,
      time: "3.5 Hours",
      projects: "5 Projects",
      level: "Beginner",
      completedLessons: 5,
    },
  ],
  registrationStakes: [
    {
      id: 1,
      hash: "0xc6942f890649807b36ed13d77fdf498a10d88da2bd615fd2e0579c229dc037a9",
      amount: "0.01 EDU",
      status: "Staked",
      registeredArcModule: {
        id: 1,
        title: "Introduction to HTML5",
        description:
          "Learn the basics of HTML5 and get started with web development.",
        category: "Front-End Engineering",
        imageSrc: "html-basics-module-image.png",
        lessons: "23 Lessons",
        time: "3.5 Hours",
        projects: "5 Projects",
        level: "Beginner",
      },
      collabs: [
        {
          id: 1,
          name: "Melik Toprakli",
          designation: "Middle East Technichal University",
          image: "/student1.webp",
        },
        {
          id: 2,
          name: "Baris Karaman",
          designation: "Bahcesehir University",
          image: "/student2.webp",
        },
      ],
    },
  ],
};
