declare type Student = {
  eduUsername?: string;
  email?: string;
  ethAddress?: string;
  OCaccessToken?: string;
  OCIdtoken?: string;
  arcModules?: ArcModule[];
  registrationStakes?: RegistrationStake[];
};

declare type ArcModule = {
  id: string;
  category: Category;
  level: Level;
  title: string;
  imageSrc: string;
  description: string;
  lessons: string;
  time: string;
  projects: string;
  student: Student;
  studentId: string;
};

declare type Category =
  | "Front-End Engineer"
  | "Back-End Engineer"
  | "Solidity Engineer";
declare type Level = "Beginner" | "Intermediate" | "Advanced";

declare type RegistrationStake = {
  id: string;
  hash: string;
  amount: number;
  student: Student;
  studentId: string;
  registeredArcModuleId: string;
};
