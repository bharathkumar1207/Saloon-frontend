import { apiClient } from "./api-client";

export type BookingRequest = {
  name: string;
  phone: string;
  serviceId: string;
  preferredDate: string;
};

export function submitBooking(payload: BookingRequest) {
  return apiClient<{ success: boolean }>("/bookings", {
    method: "POST",
    body: payload,
  });
}
