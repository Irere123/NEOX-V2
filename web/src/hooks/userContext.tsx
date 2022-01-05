import { createContext } from "react";

export const UserContext = createContext<{ user: any }>({
  user: null,
});
