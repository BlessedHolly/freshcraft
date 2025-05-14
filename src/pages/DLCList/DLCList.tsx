import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./DLCList.module.scss";
import BaseButton from "../../components/BaseButton/BaseButton";

interface DLCItem {
  backgroundUrl: string;
  title: string;
  subtitle: string;
  dlcDescriptionUrl: string;
  open: boolean;
}

const initialDlc: DLCItem[] = [
  {
    backgroundUrl: "/temp/dlc-1x1-fantasy.png",
    title: "Fantasy - DLC",
    subtitle:
      "Мифологические и сказочные существа, могущественных боссы! Изучайте магию и покоряйте новые таинственные измерения!",
    dlcDescriptionUrl: "/dlc/fantasy",
    open: false,
  },
  {
    backgroundUrl: "/temp/dlc-1x1-industrial.png",
    title: "SteamPunk Industry - DLC",
    subtitle:
      "Преобладание промышленного производства, энергетики и металлургии. Заводы, механизмы, сложные конструкции и технологии!",
    dlcDescriptionUrl: "/dlc/industrial",
    open: false,
  },
];

const DLCList: React.FC<{ sectionMinHeight?: number }> = ({
  sectionMinHeight = 600,
}) => {
  const [dlc, setDlc] = useState<DLCItem[]>(initialDlc);
  const navigate = useNavigate();

  const toggleOpen = (index: number, value: boolean) => {
    setDlc((prev) =>
      prev.map((item, i) => (i === index ? { ...item, open: value } : item))
    );
  };

  return (
    <section className={styles.dlcList} style={{ minHeight: sectionMinHeight }}>
      <div className={styles.container}>
        <h1>DLC для FreshCraft</h1>
        <p>
          Погрузись в атмосферу FreshCraft с дополнениями на разные темы! Хочешь
          почувствовать себя магом или рыцарем? Или может быть тебя интересуют
          технологии и механизмы? Выбирай что нравится и вперёд к приключениям!
        </p>
        <div className={styles.list}>
          {dlc.map((item, index) => (
            <div
              key={index}
              className={`${styles.item} ${item.open ? styles.open : ""}`}
              style={{ backgroundImage: `url(${item.backgroundUrl})` }}
              onClick={() => toggleOpen(index, true)}
            >
              <div className={styles.openDescButton} />
              <div className={styles.desc} onClick={(e) => e.stopPropagation()}>
                <div
                  className={styles.closeDescButton}
                  onClick={() => toggleOpen(index, false)}
                />
                <div className={styles.text}>
                  <h2>{item.title}</h2>
                  <p>{item.subtitle}</p>
                </div>
                <BaseButton
                  className={styles.moreButton}
                  onClick={() => navigate(item.dlcDescriptionUrl)}
                >
                  Подробнее
                </BaseButton>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DLCList;
