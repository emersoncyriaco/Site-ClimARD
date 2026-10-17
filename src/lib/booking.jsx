import { createContext, useContext, useState } from "react";
import { scrollTo } from "./scroll";

// Permite que qualquer seção abra o agendamento já preenchido
const BookingContext = createContext(null);

export function BookingProvider({ children }) {
  const [prefill, setPrefill] = useState(null);

  const requestBooking = (data = {}) => {
    setPrefill({ ...data, at: Date.now() });
    scrollTo("#agendar");
  };

  return <BookingContext.Provider value={{ prefill, requestBooking }}>{children}</BookingContext.Provider>;
}

export const useBooking = () => useContext(BookingContext);
