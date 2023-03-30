import React, { SetStateAction } from "react";

export interface psychologistPageProps {
  imageURL?: string;
  imageAlt?: string;
  fullName?: string;
  title?: string;
  number?: string;
  email?: string;
  telegramUsername?: string;
  description?: string;
  price?: string;
  rating?: string;
  isProfile?: boolean;
  bookings?: any[];
  id: number;
  balance?: number;
}
export interface psychologistModalPropsType {
  psychologistName: string;
  psychologistID: number;
  className?: string;
  closeModal?: React.Dispatch<SetStateAction<boolean>>;
}
