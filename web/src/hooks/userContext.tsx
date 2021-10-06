import { Context, createContext } from "react";

const userContext: Context<{ user: null }> = createContext({
  user: null,
});

export default userContext;
