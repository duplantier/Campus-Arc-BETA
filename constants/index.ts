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

export const ArcModule1 = {
  title: "Introduction to HTML5",
  description:
    "Unlock the foundational skills of web development with our HTML5 Basics course. Whether you're a beginner or looking to refresh your knowledge, this course will empower you to create robust, modern websites from the ground up.",
  category: "Front-End Engineering",
  imageSrc: "html-basics-module-image.png",
  lessons: 23,
  time: "3.5 Hours",
  projects: "5 Projects",
  level: "Beginner",
  whatYouWillLearn: [
    "HTML5 Structure: Understand the core elements and structure of HTML5 to build clean and organized web pages.",
    "Semantic Markup: Learn to use semantic tags to improve accessibility and SEO for your web projects",
    "Forms and Inputs: Master the creation and styling of user input forms, including text fields, checkboxes, and buttons.",
    "Multimedia Integration: Embed and control audio, video, and other multimedia elements directly in your web pages.",
    "Linking and Navigation: Create internal and external links, and develop intuitive navigation systems for users.",
  ],
  arcDesigner: {
    name: "Hüseyin Karataş",
    designation: "Full-Stack Engineer",
    image: "/huseyinkaratas.jpg",
    twitter: "https://x.com/0xDuplantier",
    linkedin: "https://www.linkedin.com/in/huseyinlorakaratas/",
    description:
      "A Full-Stack Engineer with a passion for teaching. He has been working in the tech industry for over 3.5 years and has experience in building web applications with React, Next.js, and Node.js. Hüseyin is excited to share his knowledge with students and help them become successful developers.",
  },
  studentsRegistered: [],
  arcDesignerId: "",
};
