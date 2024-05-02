import { Navigate, createBrowserRouter, redirect } from "react-router-dom";
import Login from "./components/Login";
import { me } from "./client/auth";
import Plan from "./components/Plan";
import Transfer from "./components/Transfer";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Plan />,
    loader: handleUnauthorized
  },
  {
   path: '/login',
   element: <Login />
  },
  {
    path: '/transfer/:expense',
    element: <Transfer/>,
    loader: handleUnauthorized
  },
  {
    path: '*',
    element: <Navigate to="/"/>
   }
]);

async function handleUnauthorized() {
  const user = await me();
  if (!user) {
    return redirect("/login");
  }
  return null;
}