import { useNavigate } from "react-router-dom";
import BaseButton from "../../components/BaseButton/BaseButton";
import styles from "./Home.module.scss";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TOTAL_SLIDES = 10;

export default function Home() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % TOTAL_SLIDES);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className={styles.homeContainer}>
      <section className={styles.welcome}>
        <div className={styles.backgroundContainer}>
          <AnimatePresence>
            {Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0.7 }}
                animate={{ opacity: i === index ? 1 : 0.7 }}
                exit={{ opacity: 0.7 }}
                transition={{ duration: 0.3 }}
                className={styles.backgroundItem}
                style={{
                  backgroundImage: `url('/temp/poster-${i + 1}.webp')`,
                  zIndex: i === index ? 2 : 1,
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                }}
              />
            ))}
          </AnimatePresence>
        </div>

        <div className={styles["welcome-message-wrapper"]}>
          <div className={styles["welcome-message-container"]}>
            <h1>Добро пожаловать на официальный сайт FreshCraft</h1>
            <p>
              Уникальный проект, новое слово в тематике модпаков майнкрафт —
              раскрой потенциал великой игры с проектом FreshCraft.
              <br />
              Освежи впечатление от выживания и получи незабываемые ощущения от
              игрового процесса!
            </p>
            <BaseButton size="big" onClick={() => navigate("/play")}>
              Играть!
            </BaseButton>
          </div>
        </div>
      </section>

      <section className={styles["three-packs"]}>
        <div className={styles["three-packs-container"]}>
          <h2>Сборки</h2>
          <div className={styles["dlc-list"]}>
            <div className={styles["dlc-list-item"]}>
              <img src="/temp/Classic.webp" alt="Classic" />
              <div className={styles["text-info"]}>
                <h3>FreshCraft</h3>
                <p>
                  FreshCraft Classic — это сборка модов майнкрафт, целью которой
                  является освежить и улучшить впечатления от ванильного
                  выживания.
                  <br />
                  Основной упор сделан на приключения.
                </p>
              </div>
            </div>

            <div className={styles["dlc-list-item"]}>
              <img src="/temp/Fantasy.webp" alt="Fantasy" />
              <div className={styles["text-info"]}>
                <h3>FreshCraft Fantasy — DLC</h3>
                <p>
                  Мифологические и сказочные существа, могущественные боссы!
                  Изучайте магию и покоряйте новые таинственные измерения!
                </p>
              </div>
            </div>

            <div className={styles["dlc-list-item"]}>
              <img src="/temp/Industrial.webp" alt="Industrial" />
              <div className={styles["text-info"]}>
                <h3>FreshCraft SteamPunk Industry — DLC</h3>
                <p>
                  Преобладание промышленного производства, энергетики и
                  металлургии. Заводы, механизмы, сложные конструкции и
                  технологии!
                </p>
              </div>
            </div>
          </div>

          <BaseButton size="big" onClick={() => navigate("/dlc")}>
            Все дополнения
          </BaseButton>

          <div className={styles.corner} />
          <div className={styles.corner} />
          <div className={styles.corner} />
          <div className={styles.corner} />
        </div>
      </section>

      <section className={styles["server-pros"]}>
        <h2>Встречайте — сервера!</h2>
        <div className={styles["pros-list"]}>
          <div className={styles["pros-list-item"]}>
            <div className={styles["text-info"]}>
              <h3>Присоединяйся к игрокам на сервер</h3>
              <p>
                Играть с друзьями намного интереснее, особенно когда их так
                много! Заходите на сервера и развивайтесь вместе со всеми
                игроками. Придумай то, кем ты будешь и войди в свою роль.
                Потрясающая атмосфера, отсутствие привата, войс чат и ничего
                лишнего.
              </p>
            </div>
            <img src="/temp/server-pros-1.webp" alt="Server Props One" />
          </div>

          <div className={styles["pros-list-item"]}>
            <div className={styles["text-info"]}>
              <h3>Мы за адекватное сообщество</h3>
              <p>
                Столбы, засорение ландшафта, однообразные и страшные авто-фермы
                не приветствуются! Внимательная и строгая администрация не
                допустит нарушения правил, испорченной атмосферы и общего
                впечатления от игры на сервере, играйте спокойно и с
                удовольствием!
              </p>
            </div>
            <img src="/temp/server-pros-2.webp" alt="Server Props Two" />
          </div>

          <div className={styles["pros-list-item"]}>
            <div className={styles["text-info"]}>
              <h3>Интересное сочетание упрощенного РП и анархии</h3>
              <p>
                Вы можете объединиться с другими игроками, создавать свои
                условные племена, или кланы, обмениваться ресурсами и даже,
                например, объявлять войны другим кланам. Но имейте в виду, что
                на каждого преступника найдётся свой суд! Дайте волю фантазии,
                всё в ваших руках!
              </p>
            </div>
            <img src="/temp/server-pros-3.webp" alt="Server Props Three" />
          </div>
        </div>
        <BaseButton size="big" onClick={() => navigate("/servers")}>
          Сервера
        </BaseButton>
      </section>
    </main>
  );
}
