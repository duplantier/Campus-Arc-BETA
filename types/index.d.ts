declare type Student = {
  id?: string;
  eduUsername?: string;
  email?: string;
  ethAddress?: string;
  OCaccessToken?: string;
  OCIdtoken?: string;
  arcModules?: ArcModule[];
  registrationStakes?: RegistrationStake[];
};

declare type ArcModuleAPIEndpoint = {
  reqType: string;
  id?: string;
  category: string;
  level: string;
  title: string;
  imageSrc: string;
  description: string;
  lessons: string;
  time: string;
  projects: string;
  studentId?: string;
  adminKey: string;
};

declare type RegistrationStake = {
  id: string;
  hash: string;
  amount: number;
  student: Student;
  studentId: string;
  registeredArcModuleId: string;
};
