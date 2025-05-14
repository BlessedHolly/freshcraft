import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./DLCItem.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import BaseButton from "../../components/BaseButton/BaseButton";
import { getRouterMetaTitle } from "../../utils/routerMeta";

type DLCEntry = {
  headImageUrl: string;
  title: string;
  subtitle: string;
  buttons: {
    title: string;
    url: string;
  }[];
  gallery: string[];
  videoUrl: string;
};

type DLCData = Record<string, DLCEntry>;

const dlcData: DLCData = {
  fantasy: {
    headImageUrl: "/temp/dlc-fantasy.jpg",
    title: "DLC-сборка Fantasy",
    subtitle:
      "Множество новых мобов, новые оружия, данжи, магия и боссы! Мифологические и сказочные существа наполняют мир FreshCraft! Легендарное оружие и экипировка, таинственные измерения и подземелья! Сразись с могущественными боссами и победи их! Изучай магию и заклинания, выбирай расу и класс и вперёд к приключениям!",
    buttons: [
      {
        title: "Приобрести",
        url: "https://boosty.to/grapecreate",
      },
    ],
    gallery: [
      "/temp/dlc-fantasy/screenshot-1.webp",
      "/temp/dlc-fantasy/screenshot-2.webp",
      "/temp/dlc-fantasy/screenshot-3.webp",
      "/temp/dlc-fantasy/screenshot-4.webp",
      "/temp/dlc-fantasy/screenshot-5.webp",
      "/temp/dlc-fantasy/screenshot-6.webp",
    ],
    videoUrl: "https://www.youtube.com/embed/bGiOT0mp04g?si=7wg4mjiZeUKpNpdT",
  },
  industrial: {
    headImageUrl: "/temp/dlc-industrial.jpg",
    title: "DLC-сборка SteamPunk Industry",
    subtitle:
      "Более 15 дополнений к Create! Новые инструменты, технологии, от динозавров до космоса! Стим-панк в ванильной майнкрафт стилистике! Вы сможете построить свой огромный Стимпанк город с заводами, поездами, дирижаблями и огромными механизмами. Начинайте с динозавров и доисторических растений, создавайте машины и транспорт! Развивайте технологии и отправляйтесь изучать различные планеты в космосе!",
    buttons: [
      {
        title: "Приобрести",
        url: "https://boosty.to/grapecreate",
      },
    ],
    gallery: [
      "/temp/dlc-industrial/screenshot-1.webp",
      "/temp/dlc-industrial/screenshot-2.webp",
      "/temp/dlc-industrial/screenshot-3.webp",
      "/temp/dlc-industrial/screenshot-4.webp",
      "/temp/dlc-industrial/screenshot-5.webp",
      "/temp/dlc-industrial/screenshot-6.webp",
    ],
    videoUrl: "https://www.youtube.com/embed/Q27V0-D8fTI?si=5bnNtZLaFNFg-4yQ",
  },
};

export default function DLCItem() {
  const { name } = useParams();
  const navigate = useNavigate();
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const location = useLocation();

  useEffect(() => {
    if (!name || !dlcData[name]) {
      navigate("/");
    }
  }, [name, navigate]);

  useEffect(() => {
    const title = getRouterMetaTitle(location, "dlc-item", name);
    document.title = `FRESHCRAFT | ${title}`;
  }, [location, name]);

  const data = name ? dlcData[name] : null;
  if (!data) return null;

  return (
    <section className={styles.dlcItem}>
      <div
        className={styles.head}
        style={{ backgroundImage: `url(${data.headImageUrl})` }}
      />
      <div className={styles.textContainer}>
        <h1 className={styles.title}>{data.title}</h1>
        <h2 className={styles.subtitle}>{data.subtitle}</h2>
        <div className={styles.buttonsContainer}>
          {data.buttons.map((btn, idx) => (
            <BaseButton key={idx} onClick={() => window.open(btn.url)}>
              {btn.title}
            </BaseButton>
          ))}
        </div>

        <div className={styles.galleryContainer}>
          <Swiper
            modules={[Thumbs, Navigation]}
            spaceBetween={10}
            navigation
            thumbs={{ swiper: thumbsSwiper }}
            className={styles.mainSwiper}
          >
            {data.gallery.map((url, idx) => (
              <SwiperSlide key={idx}>
                <img src={url} alt={`screenshot-${idx + 1}`} />
              </SwiperSlide>
            ))}
          </Swiper>

          <Swiper
            modules={[Thumbs]}
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={3}
            watchSlidesProgress
            className={styles.thumbsSwiper}
          >
            {data.gallery.map((url, idx) => (
              <SwiperSlide key={idx}>
                <img src={url} alt={`thumb-${idx + 1}`} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <iframe
          src={data.videoUrl}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          frameBorder="0"
          className={styles.video}
        />
      </div>
    </section>
  );
}
