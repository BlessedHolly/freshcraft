
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { getMicrosoftCallbackMetaTitle } from "./utils/routerMeta";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import ProfileHome from "./pages/Profile/ProfileHome";
import MicrosoftCallback from "./pages/MicrosoftCallback/MicrosoftCallback";
import Auth from "./pages/Auth/Auth";
import EmailVerify from "./pages/EmailVerify/EmailVerify";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import Play from "./pages/Play/Play";
import Contacts from "./pages/Contacts/Contscts";
import ServerList from "./pages/ServerList/ServerList";
import ServerItem from "./pages/ServerList/ServerItem";
import Rules from "./pages/ServerList/Rules";
import DLCList from "./pages/DLCList/DLCList";
import DLCItem from "./pages/DLCList/DLCItem";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    handle: { title: "Главная", name: "home" },
    children: [
      {
        index: true,
        element: <Home />,
        handle: { title: "Главная", name: "home" },
      },
      {
        path: "auth",
        element: <Auth />,
        handle: { title: "Авторизация", name: "auth" },
      },
      {
        path: "profile",
        element: <Profile />,
        handle: { title: "Профиль", name: "profile" },
        children: [
          {
            index: true,
            element: <ProfileHome />,
            handle: { title: "Профиль", name: "profile-home" },
          },
        ],
      },
      {
        path: "oauth/xbox/callback",
        element: <MicrosoftCallback />,
        handle: {
          title: getMicrosoftCallbackMetaTitle,
          name: "microsoft-callback",
        },
      },
      {
        path: "email-verify/:token",
        element: <EmailVerify />,
        handle: { title: "Подтверждение почты", name: "reset-password" },
      },
      {
        path: "reset-password/:token",
        element: <ResetPassword />,
        handle: { title: "Сброс пароля", name: "reset-password" },
      },
      {
        path: "play",
        element: <Play />,
        handle: { title: "Начать играть", name: "play" },
      },
      {
        path: "contacts",
        element: <Contacts />,
        handle: { title: "Контакты", name: "contacts" },
      },
      {
        path: "servers",
        element: <ServerList sectionMinHeight={603} />,
        handle: { title: "Сервера", name: "servers" },
      },
      {
        path: "servers/:name",
        element: <ServerItem />,
        handle: { name: "server-item" },
      },
      {
        path: "servers/:name/rules",
        element: <Rules />,
        handle: { name: "server-rules" },
      },
      {
        path: "*",
        element: <Navigate to={"/"} />,
      },
      {
        path: "dlc",
        element: <DLCList />,
        handle: { title: "Дополнения", name: "dlc-list" },
      },
      {
        path: "dlc/:name",
        element: <DLCItem />,
        handle: { name: "dlc-item" },
      },
    ],
  },
]);

export default function AppRoutes() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
