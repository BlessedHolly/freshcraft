import { FC } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ServerList.module.scss";
import BaseButton from "../../components/BaseButton/BaseButton";

const servers = [
  {
    iconUrl: "/temp/server-ico.png",
    title: "FreshCraft - Season 6",
    subtitle: "Приватный сервер #1",
    serverDescriptionUrl: "/servers/season-6",
    paragraphs: [
      "Сервер с лучшими модами. Уникальное сочетание упрощённого Роле-плей с элементами Анархии. Особенное комьюнити, необычная и чарующая атмосфера, отсутствие лишнего, доната и привата. Это не просто сервер, это новый взгляд на игру! Вместо авто-ферм, занимайтесь добыванием ресурсов, лутайте данжи и отбивайтесь от мобов!",
      "Самая актуальная версия игры!",
      "Более 200 модов!",
    ],
  },
];

interface Server {
  iconUrl: string;
  title: string;
  subtitle: string;
  serverDescriptionUrl: string;
  paragraphs: string[];
}

const ServerList: FC<{ sectionMinHeight: number }> = ({ sectionMinHeight }) => {
  const navigate = useNavigate();

  const handleMoreButton = (url: string) => {
    navigate(url);
  };

  return (
    <section
      className={styles.serverList}
      style={
        { "--sectionMinHeight": `${sectionMinHeight}px` } as React.CSSProperties
      }
    >
      <h1>Сервера FreshCraft</h1>
      <div className={styles.list}>
        {servers.map((item: Server, index: number) => (
          <div key={index} className={styles.item}>
            <img src={item.iconUrl} alt={item.title} />
            <div className={styles.titleContainer}>
              <h2>{item.title}</h2>
              <span>{item.subtitle}</span>
            </div>
            <BaseButton
              size="big"
              onClick={() => handleMoreButton(item.serverDescriptionUrl)}
            >
              Подробнее
            </BaseButton>
            <div className={styles.shortInfoContainer}>
              {item.paragraphs.map((text, i) => (
                <p key={i} className={i === 0 ? styles.firstParagraph : ""}>
                  {text}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServerList;
