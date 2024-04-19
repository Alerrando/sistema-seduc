export type OptionType =
  | "name"
  | "adress"
  | "zip"
  | "type"
  | "fone"
  | "email"
  | "cpf"
  | "teachersThirst"
  | "teachersOffice"
  | "amountTime"
  | "registerTeacher"
  | "registerSchool"
  | "rg"
  | "office"
  | "password"
  | "mandatoryBulletin"
  | `teachersThirst.${number}`
  | `teachersOffice.${number}`;

export type InputConfig = {
  label: string;
  htmlFor: string;
  type: string;
  placeholder?: string;
  name: OptionType;
  optionDefault?: string;
  optionType?: string;
  input: "input" | "select";
  maxChars?: number;
  maskHandleForm?: (value: string) => string;
};

export type TypeDefault = {
  id: number;
  name: string;
  edit: boolean;
  inactive: boolean;
};

export type SchoolInfos = {
  adress: string;
  zip: string;
  fone: string;
  email: string;
} & TypeDefault;

export type TeacherInfos = {
  cpf: string;
} & TypeDefault;

export type LessonInfos = {
  id: number;
  registerTeacher: TeacherInfos;
  amountTime: string;
  lessonDay: Date | string;
  registerSchool: SchoolInfos;
  inactive: boolean;
  edit: boolean;
};

export type DefinitionPeriodsInfos = {
  startDate: Date | string;
  endDate: Date | string;
};

export type OfficeInfos = {
  type: string;
} & TypeDefault;

export type TeachersOffice = {
  id: number;
  registerOffice: OfficeInfos;
  registerTeacher: TeacherInfos;
};

export type TeachersThirst = {
  id: number;
  registerSchool: SchoolInfos;
  registerTeacher: TeacherInfos;
};

export type SchoolDTOInfos = {
  id: number;
  name: string;
  datesWork: unknown;
  amountTime: number;
};

export type TeacherDTOInfos = {
  name: string;
  amountTime: number;
  lessonDay: Date | string;
  registerSchool: TeacherInfos;
  amountTimeTotal: number;
};

export type UserInfos = {
  email: string;
  password: string;
  office: OfficeInfos;
  rg: string;
  registerSchool: SchoolInfos;
  level: number;
  mandatoryBulletin: number;
} & TypeDefault;
