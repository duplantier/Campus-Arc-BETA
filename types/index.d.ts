// Declare the Student model type
declare type Student = {
  id: number;
  eduUsername: string;
  email?: string;
  ethAddress?: string;
  OCaccessToken?: string;
  registeredArcModulesIds: string[];
  registrationStakesIds: string[];
};

// Declare the ArcDesigner model type
declare type ArcDesigner = {
  id: number;
  arcModulesIds: string[];
  fullName: string;
};

// Declare the UsersArcModules model type
declare type UsersArcModules = {
  id: number;
  userId: number;
  arcModuleId: number;
  isRegistered: boolean;
  completedLessonsIds: string[];
  isCollaborate: boolean;
};

// Declare the ArcModule model type
declare type ArcModule = {
  id: number;
  category: string;
  level: string;
  title: string;
  imageSrc: string;
  description: string;
  lessonsIds: string[];
  lessonNumber: number;
  time: string;
  projects: string;
  whatYouWillLearn: string[];
  studentsRegisteredIds: string[];
  arcDesignersId: number[];
};

// Declare the Lesson model type
declare type Lesson = {
  id: number;
  title: string;
  description: string;
  videoSrc: string;
  arcModuleId: number;
  isCompleted: boolean;
};

// Declare the RegistrationStake model type
declare type RegistrationStake = {
  id: number;
  hash: string;
  amount: number;
  studentId: number;
  registeredArcModuleId: number;
  collabStudentsId: string[];
};

// Declare the Gender enum type
declare enum Gender {
  Male = "Male",
  Female = "Female",
}
