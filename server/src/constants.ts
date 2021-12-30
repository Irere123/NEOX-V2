export const __prod__ = process.env.NODE_ENV === "production";

export const redirectUrl = !__prod__
  ? "http://localhost:3000/home"
  : "https://next-neox.vercel.app/home";

export const apiBaseUrl = !__prod__
  ? "http://localhost:4000"
  : "https://api-neox-next.herokuapp.com";

export const clientAppUrl = !__prod__
  ? "http://localhost:3000"
  : "https://next-neox.vercel.app";
