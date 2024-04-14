import { createBrowserRouter, redirect } from "react-router-dom";
import App from "./App";
import Login from "./Login";
import { me } from "./client/auth";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    loader: handleUnauthorized
  },
  {
   path: '/login',
   element: <Login />
  }
]);

async function handleUnauthorized() {
  const user = await me();
  if (!user) {
    return redirect("/login");
  }
  return null;
};