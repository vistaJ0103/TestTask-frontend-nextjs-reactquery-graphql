export enum EUserRole {
  ADMIN = "ADMIN",
  TRADER = "TRADER",
  MONITOR = "MONITOR",
  MAINTAINER = "MAINTAINER",
  LIQUIDATOR = "LIQUIDATOR",
  USER = "USER",
}

export type UserRoleStrings = keyof typeof EUserRole;

export enum EUserStatus {
  TBA = "TBA",
  APPROVED = "APPROVED",
  BLOCKED = "BOLCKED",
}

export type UserStatusStrings = keyof typeof EUserStatus;

export interface IUser {
  slice(indexOfFirstUser: number, indexOfLastUser: number): unknown;
  _id: string;
  name: string;
  password?: string;
  email: string;
  avatar?: string;
  role?: EUserRole;
  status?: EUserRole;
  online?: boolean;
  created?: Date;
  updated?: Date;
}
