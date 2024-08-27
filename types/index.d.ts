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
  arcModulesIds: number[];
  fullName: string;
};

// Declare the UsersArcModules model type
declare type UsersArcModules = {
  id: number;
  userId: number;
  arcModuleId: number;
  isRegistered: boolean;
  completedLessonsIds: number[];
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
  lessonsIds: number[];
  lessonNumber: number;
  time: string;
  projects: string;
  whatYouWillLearn: string[];
  studentsRegisteredIds: number[];
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
  collabStudentsId: number[];
};

// Declare the Gender enum type
declare enum Gender {
  Male = "Male",
  Female = "Female",
}
