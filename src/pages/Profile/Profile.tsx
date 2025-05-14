import { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import styles from "./Profile.module.scss";
import BaseButton from "../../components/BaseButton/BaseButton";
import { useGetProfileQuery, useLogoutMutation } from "../../store/apiSlice";
import { LOCAL_STORAGE_ACCESS_TOKEN_KEY } from "../../assets/const";

export default function Profile() {
  const navigate = useNavigate();
  const [logout, { isLoading }] = useLogoutMutation();

  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const token = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);

  // Отключаем запрос, если нет токена или уже вышли
  const { data: profile } = useGetProfileQuery(undefined, {
    skip: !token || isLoggedOut || isLoading,
  });

  const isAuth = Boolean(profile?.email?.value);

  useEffect(() => {
    if (!isAuth) navigate("/auth", { replace: true });
  }, [isAuth, navigate]);

  const handleLogoutButton = () => {
    logout()
      .unwrap()
      .then(() => {
        localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
        localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
        setIsLoggedOut(true); // Явно отключаем запрос
        navigate("/auth");
      });
  };

  return (
    <section className={styles.profile}>
      <Outlet />
      <BaseButton onClick={handleLogoutButton}>Выйти из аккаунта</BaseButton>
    </section>
  );
}
