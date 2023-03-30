export interface BookingCalendarCardType {
  comments: string;
  id: number;
  appointed_at: string;
  nameId: number;
  end_time: string;
  specialist_id?: number | string;
  approved: boolean;
  patient_id?: number | string;
  room_id: string;
}

export interface BookingsCalendarPropsType {
  bookings: bookingType[];
  id: string | number;
}

export interface bookingType {
  appointed_at: string;
  approved: boolean;
  comments: string;
  end_time: string;
  id: number;
  patient_id: number;
  room_id: string;
  specialist_id: number;
}

export interface BookingsNoCalendarPropsType {
  bookings: bookingType[];
  id: string | number;
  patient_name: string;
}
