import { FC } from "react";
import styles from "./Contacts.module.scss";
import TelegramPixelInlineIcon from "../../assets/vectors/socials/telegram-px.svg?inline";
import BoostyPixelInlineIcon from "../../assets/vectors/socials/boosty-px.svg?inline";
import YouTubePixelInlineIcon from "../../assets/vectors/socials/youtube-px.svg?inline";
import DiscordPixelInlineIcon from "../../assets/vectors/socials/discord-px.svg?inline";
import VkontaktePixelInlineIcon from "../../assets/vectors/socials/vk-px.svg?inline";
import BaseButton from "../../components/BaseButton/BaseButton";

const socialsList = [
  {
    name: "Telegram",
    iconUrl: TelegramPixelInlineIcon,
    text: "Хотите получать новости в телеграмме? Подписывайтесь и всегда будьте в курсе событий!",
    link: "https://t.me/grapecreate",
  },
  {
    name: "Boosty",
    iconUrl: BoostyPixelInlineIcon,
    text: "Получайте эксклюзивный контент и поддерживайте творчество автора!",
    link: "https://boosty.to/grapecreate",
  },
  {
    name: "YouTube",
    iconUrl: YouTubePixelInlineIcon,
    text: "Обзоры модов и сборки от создателя FreshCraft. Основной канал на Ютуб - Grape Create!",
    link: "https://www.youtube.com/channel/UCvbAKuWO0fOGxQ1mCBFAhzg",
  },
  {
    name: "Discord",
    iconUrl: DiscordPixelInlineIcon,
    text: "Тех-Поддержка, общение, новости! Присоединяйтесь к нашему Дискорд сообществу.",
    link: "https://discord.gg/26pmYEkfGM",
  },
  {
    name: "Vkontakte",
    iconUrl: VkontaktePixelInlineIcon,
    text: "Пользуйтесь ВКонтакте? У создателя проекта так же есть группа с новостями и не только!",
    link: "https://vk.com/public193542939",
  },
];

const Contacts: FC = () => {
  const handleButton = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <section className={styles.contacts}>
      <h1>Контакты</h1>
      <p>
        Все полезные ссылки на источники информации: тех-поддержка,
        <br />
        новости, сообщества и каналы
      </p>
      <div className={styles.list}>
        {socialsList.map((item, index) => (
          <div className={styles.item} key={index}>
            <div
              className={styles.iconWrapper}
              style={{ ["--blurBgUrl" as string]: `url(${item.iconUrl})` }}
            >
              <img src={item.iconUrl} alt={item.name} />
            </div>
            <div className={styles.textAndButtonContainer}>
              <p>{item.text}</p>
              <BaseButton
                onClick={() => handleButton(item.link)}
                size="big"
                fullSpace
              >
                {item.name}
              </BaseButton>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Contacts;
