import React from "react";

export interface timeslotPropType {
  dropdownItems: string[];
  header: string;
  iconToShow?: any;
  setHeader: React.Dispatch<React.SetStateAction<any>>;
}

export interface CustomInputProps {
  placeholder: string;
  topText: string;
  setValue: React.Dispatch<React.SetStateAction<any>>;
  isHidden?: boolean;
  isPassword?: boolean;
  className?: string;
  inputProps?: object;
}
export interface protectedRouteProps {
  path: string;
  children: React.ReactNode;
  checkRoles?: string[];
}
export interface searchPageCardProps {
  name?: string;
  description?: string;
  tags?: any;
  pricing?: string;
  score?: string;
  imageURL?: string;
  psychologistID?: number;
}

export default interface UserType {
  name: string;
  surname: string;
  email: string;
  id: string;
  balance: number;
  role: "admin" | "specialist" | "patient";
  isAuth: boolean;
}
