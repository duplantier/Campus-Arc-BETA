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

declare type RegistrationStake = {
  id: number;
  hash: string;
  amount: number;
  student: Student;
  studentId: string;
  registeredArcModuleId: string;
};
