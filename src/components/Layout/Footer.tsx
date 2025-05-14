import { Link } from "react-router-dom";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.columns}>
        <div className={`${styles.item} ${styles.head}`}>
          <h4>FreshCraft</h4>
          <span>Гусев Артемий Витальевич</span>
          <a href="mailto:jackplay285@gmail.com">jackplay285@gmail.com</a>
        </div>
        <div className={styles.item}>
          <h4>Дополнения</h4>
          <Link to="/dlc">Все дополнения</Link>
          <Link to="/dlc/fantasy">Fantasy - DLC</Link>
          <Link to="/dlc/industry">SteamPunk Industry - DLC</Link>
        </div>
        <div className={styles.item}>
          <h4>Сервера</h4>
          <Link to="/servers">Все сервера</Link>
          <Link to="/servers/season-6">FreshCraft - Season 6</Link>
        </div>
        <div className={styles.item}>
          <h4>Покупки</h4>
          <a href="//boosty.to/grapecreate">Boosty!</a>
        </div>
      </div>
      <p className={styles.copyright}>
        Copyright © FreshCraft 2020-2024. Все права защищены.
        <br />
        © Mojang, 2024. Товарный знак "Minecraft" принадлежит компании Mojang
        Synergies AB
        <br />
        Вся размещенная информация на сайте не является публичной офертой. Мы
        никоим образом не связаны с Mojang, AB.
        <br />
        All information posted on the site is not a public offer. We are in no
        way affiliated with Mojang, AB.
      </p>
    </footer>
  );
};

export default Footer;
