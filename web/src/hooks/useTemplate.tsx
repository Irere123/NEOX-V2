import { createContext } from "react";

export const TemplateContext = createContext<{
  template: string;
  setTemplate: any;
}>({
  template: "study_group",
  setTemplate: () => {},
});
