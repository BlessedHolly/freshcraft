import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import styles from "./Header.module.scss";
import BaseButton from "../BaseButton/BaseButton";
import { useGetProfileQuery, useLogoutMutation } from "../../store/apiSlice";
import { LOCAL_STORAGE_ACCESS_TOKEN_KEY } from "../../assets/const";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showMobileNav, setShowMobileNav] = useState(false);
  const token = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
  const [, { isSuccess, isLoading: isLoadingLogout }] = useLogoutMutation();
  const { data: profile } = useGetProfileQuery(undefined, {
    skip: !token || isSuccess || isLoadingLogout,
  });
  const isAuth = Boolean(profile?.email?.value);

  const handleRouteButton = (name: string) => {
    navigate({ pathname: `/${name}` });
  };

  useEffect(() => {
    setShowMobileNav(false);
  }, [location.pathname]);

  return (
    <header className={styles.header}>
      <nav className={styles.desktopNav}>
        <ul>
          <li>
            <Link to="/contacts">Контакты</Link>
          </li>
          <li>
            <Link to="/servers">Сервера</Link>
          </li>
          <li>
            <Link to="/dlc">Дополнения</Link>
          </li>
        </ul>
      </nav>
      <Link to="/" className={styles.logo}>
        <img src="/minecraft_fresh.png" alt="Logo" />
      </Link>
      <BaseButton
        className={styles.authProfileButton}
        onClick={() => navigate(isAuth ? "/profile" : "/auth")}
      >
        {isAuth ? "Профиль" : "Авторизоваться"}
      </BaseButton>
      <svg
        onClick={() => setShowMobileNav(!showMobileNav)}
        data-v-751d99b1=""
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
        className={styles["burgerIcon"]}
      >
        <path
          fillRule="evenodd"
          d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75M3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12m0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75"
          clipRule="evenodd"
        ></path>
      </svg>
      <nav
        className={`${styles.mobileNav} ${showMobileNav ? styles.show : ""}`}
      >
        <BaseButton onClick={() => handleRouteButton("contacts")}>
          Контакты
        </BaseButton>
        <BaseButton onClick={() => handleRouteButton("servers")}>
          Сервера
        </BaseButton>
        <BaseButton onClick={() => handleRouteButton("dlc")}>
          Дополнения
        </BaseButton>
        <BaseButton onClick={() => navigate(isAuth ? "/profile" : "/auth")}>
          {isAuth ? "Профиль" : "Авторизоваться"}
        </BaseButton>
      </nav>
    </header>
  );
};

export default Header;
