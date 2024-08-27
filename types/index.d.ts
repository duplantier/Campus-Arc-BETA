declare type Student = {
  id?: number;
  eduUsername?: string;
  email?: string;
  ethAddress?: string;
  OCaccessToken?: string;
  OCIdtoken?: string;
  registeredArcModules?: ArcModule[];
  registrationStakes?: RegistrationStake[];
};

declare type ArcDesigner = {
  id?: number;
  fullName?: string;
  arcModules?: ArcModule[];
};

declare type ArcModule = {
  id?: number;
  category: string;
  level: string;
  imageSrc: string
  description: string;
  lessons: number;
  time: string;
  projects: string;
  whatYouWillLearn: string[];
  studentsRegistered: Student[];
  arcDesigner: ArcDesigner;
  arcDesignerId: string;

};

declare type RegistrationStake = {
  id: number;
  hash: string;
  amount: number;
  student: Student;
  studentId: string;
  registeredArcModuleId: string;
};
