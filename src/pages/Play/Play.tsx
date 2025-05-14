import { useNavigate } from "react-router-dom";
import styles from "./Play.module.scss";
import BaseButton from "../../components/BaseButton/BaseButton";
import RecursiveComponent from "../../components/RecursiveComponent/RecursiveComponent";
import { ReactNode } from "react";

type HtmlTag =
  | "div"
  | "span"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "blockquote"
  | "br"
  | "b"
  | "i"
  | "p"
  | "section"
  | "ol"
  | "li"
  | "strong"
  | "a"
  | "ul"
  | "iframe"
  | "Element"
  | "s";

type AllowedTag = HtmlTag | typeof BaseButton;

type ChildElement = {
  tag: AllowedTag;
  value?: ReactNode;
  elementProps?: Record<string, unknown>;
  children?: ChildElement[];
};

type SectionType = {
  backgroundUrl: string;
  title: string;
  subtitle: string;
  button: {
    value: string;
  };
  mainElements: ChildElement[];
};

const Play = () => {
  const navigate = useNavigate();
  const sections: SectionType[] = [
    {
      backgroundUrl: "/temp/poster-3.webp",
      title: "ОКУНИСЬ В БЕСКОНЕЧНЫЕ ПРОСТОРЫ УЛУЧШЕННОЙ ИГРЫ!",
      subtitle:
        "Освежи свой игровой опыт майнкрафт и посмотри на игру по другому! Обновлены все сферы и каждый аспект. Новые мобы, боссы, данжи, механизмы, декорации и прочие мелочи и всё это с потрясающей атмосферой Главная особенность - это проработанный визуал, а так же изменённый геймплей и всё это в ванильной стилистики!",
      button: {
        value: "👤 Одиночная игра",
      },
      mainElements: [
        {
          tag: "h2",
          value: "🖥️ Подготовка ПК:",
        },
        {
          tag: "h3",
          value: "Приблизительные системные требования",
        },
        {
          tag: "blockquote",
          children: [
            {
              tag: "span",
              value: "🫐 Минимальные",
            },
            {
              tag: "br",
            },
            {
              tag: "b",
              value: "Процессор:",
            },
            {
              tag: "span",
              value: " Intel Core i5-2500K 4 ядра - @3.3Ггц /",
            },
            {
              tag: "br",
            },
            {
              tag: "span",
              value: "AMD FX-6300 6 ядер - @3.5Ггц",
            },
            {
              tag: "br",
            },
            {
              tag: "b",
              value: "Оперативная память:",
            },
            {
              tag: "span",
              value: " 6Гб ОЗУ",
            },
            {
              tag: "br",
            },
            {
              tag: "b",
              value: "Видеокарта:",
            },
            {
              tag: "span",
              value: " NVIDIA GTX 660 2Гб / AMD HD7870 2 Гб",
            },
            {
              tag: "br",
            },
            {
              tag: "b",
              value: "Место на диске:",
            },
            {
              tag: "span",
              value: " 3Гб",
            },
          ],
        },
        {
          tag: "blockquote",
          children: [
            {
              tag: "span",
              value: "🍇 Рекомендованные",
            },
            {
              tag: "br",
            },
            {
              tag: "b",
              value: "Процессор:",
            },
            {
              tag: "span",
              value: " Intel Core i5-8400 6 ядер - @2.8Ггц /",
            },
            {
              tag: "br",
            },
            {
              tag: "span",
              value: "AMD Ryzen 5 1400 4 ядра - @3.2Ггц",
            },
            {
              tag: "br",
            },
            {
              tag: "b",
              value: "Оперативная память:",
            },
            {
              tag: "span",
              value: " 12Гб ОЗУ",
            },
            {
              tag: "br",
            },
            {
              tag: "b",
              value: "Видеокарта:",
            },
            {
              tag: "span",
              value: " NVIDIA GTX 1060 6Гб / AMD Radeon RX 480 8Гб",
            },
            {
              tag: "br",
            },
          ],
        },
        {
          tag: "ol",
          children: [
            {
              tag: "li",
              children: [
                {
                  tag: "strong",
                  value: "Установка Java:",
                },
                {
                  tag: "div",
                  children: [
                    {
                      tag: "p",
                      value:
                        "Большинство лаунчеров автоматически загружают и устанавливают java. Но, всё же убедитесь, что у вас установлена последняя актуальная версия java, если у вас что-то не работает.",
                    },
                    {
                      tag: "blockquote",
                      children: [
                        {
                          tag: "a",
                          value: "Официальный сайт java.com",
                          elementProps: {
                            href: "https://www.java.com",
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              tag: "li",
              children: [
                {
                  tag: "strong",
                  value: "Лаунчер:",
                },
                {
                  tag: "ul",
                  children: [
                    {
                      tag: "p",
                      value: "Установите желаемый лаунчер.",
                    },
                    {
                      tag: "blockquote",
                      children: [
                        {
                          tag: "span",
                          value: "Рекомендуемые лаунчеры: ",
                        },
                        {
                          tag: "strong",
                          value: "Официальный Minecraft launcher",
                        },
                        {
                          tag: "span",
                          value: ", или же альтернативный: ",
                        },
                        {
                          tag: "strong",
                          value: "Legacy launcher",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              tag: "li",
              children: [
                {
                  tag: "strong",
                  value: "Сборка:",
                },
                {
                  tag: "ul",
                  children: [
                    {
                      tag: "p",
                      children: [
                        {
                          tag: "span",
                          value:
                            "Ознакомиться с обновлениями и узнать последнюю версию сборки вы можете в канале ",
                        },
                        {
                          tag: "a",
                          value: '"🆕|новости"',
                          elementProps: {
                            href: "https://discord.com/channels/555723601752621086/1094278224017641574",
                          },
                        },
                        {
                          tag: "span",
                          value:
                            ", ознакомиться и скачать сборку можно в канале ",
                        },
                        {
                          tag: "a",
                          value: '"✅│играть"',
                          elementProps: {
                            href: "https://discord.com/channels/555723601752621086/1150884247012380743",
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          tag: "h2",
          value: "⚙️ Установка сборок:",
        },
        {
          tag: "ol",
          children: [
            {
              tag: "li",
              children: [
                {
                  tag: "p",
                  children: [
                    {
                      tag: "span",
                      value: 'Распакуйте архив с сборкой так, чтобы в папке "',
                    },
                    {
                      tag: "strong",
                      value: "C:\\Users\\Имя_Пользователя\\AppData\\Roaming",
                    },
                    {
                      tag: "span",
                      value: '" находилась папка "',
                    },
                    {
                      tag: "strong",
                      value: ".minecraft",
                    },
                    {
                      tag: "span",
                      value: '" из архива.',
                    },
                  ],
                },
                {
                  tag: "blockquote",
                  children: [
                    {
                      tag: "span",
                      value:
                        'Перед этим шагом убедитесь в том, что вы удалили старый клиент игры из папки "',
                    },
                    {
                      tag: "strong",
                      value: "C:\\Users\\Имя_Пользователя\\AppData\\Roaming",
                    },
                    {
                      tag: "span",
                      value: '"',
                    },
                  ],
                },
              ],
            },
            {
              tag: "li",
              children: [
                {
                  tag: "p",
                  value: "Запустите лаунчер.",
                },
              ],
            },
            {
              tag: "li",
              children: [
                {
                  tag: "p",
                  children: [
                    {
                      tag: "span",
                      value: 'Проверьте правильность расположения папки игры "',
                    },
                    {
                      tag: "strong",
                      value: ".minecraft",
                    },
                    {
                      tag: "span",
                      value: '" - если лаунчер не нашёл "',
                    },
                    {
                      tag: "strong",
                      value: ".minecraft",
                    },
                    {
                      tag: "span",
                      value: '", то нужно указать правильный путь к игре "',
                    },
                    {
                      tag: "strong",
                      value: "C:\\Users\\Имя_Пользователя\\AppData\\Roaming",
                    },
                    {
                      tag: "span",
                      value: '"',
                    },
                  ],
                },
              ],
            },
            {
              tag: "li",
              children: [
                {
                  tag: "p",
                  children: [
                    { tag: "span", value: "Выберете версию игры " },
                    { tag: "strong", value: "*версия_игры*-forge-*версия*" },
                    { tag: "span", value: " (например: " },
                    { tag: "strong", value: "1.19.2-forge-43.3.7" },
                    { tag: "span", value: ') и нажмите "Играть"' },
                  ],
                },
                {
                  tag: "blockquote",
                  value:
                    "Не забывайте выделить 6-9 ГБ оперативной памяти на игру в настройках лаунчера!",
                },
              ],
            },
          ],
        },
        {
          tag: "h2",
          value: "⏭️ Видео-Гайд по установке от автора:",
        },
        {
          tag: "iframe",
          elementProps: {
            title: "YouTube video player",
            src: "https://www.youtube.com/embed/CtunqeoblPQ",
            frameBorder: 0,
            allow:
              "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
            allowFullScreen: true,
          },
        },
      ],
    },
    {
      backgroundUrl: "/temp/poster-6.webp",
      title:
        "Играть с друзьями намного интереснее, особенно когда их так много!",
      subtitle:
        "Именно поэтому мы создали сервера для FreshCraft, что бы вы могли играть со своими друзьями без лагов и большой компанией, а так же знакомится с новыми людьми и заводить новых друзей! Заходите на сервера и развивайтесь вместе со всеми игроками.",
      button: {
        value: "👥 Cетевая игра",
      },
      mainElements: [
        {
          tag: "h2",
          value: "🔥 СЕЗОН 6 ОТКРЫТ, МЕСТА ЕСТЬ!",
        },
        {
          tag: BaseButton,
          value: "Season 6 | О сервере",
          elementProps: {
            onClick: () => {
              navigate("/servers/season-6");
            },
          },
        },
        {
          tag: "p",
          value:
            "(Приобретая данную подписку вы получаете доступ к приватному серверу FreshCraft)",
        },

        {
          tag: "ul",
          children: [
            {
              tag: "blockquote",
              children: [
                {
                  tag: "span",
                  value: "Внимание! Длительность осеннего сезона #6: 3 месяца",
                },
                {
                  tag: "br",
                },
                {
                  tag: "span",
                  value: "➡️Начало: 20:00 МСК 10.11.24",
                },
              ],
            },
            {
              tag: "li",
              children: [
                {
                  tag: "strong",
                  value: "СТОИМОСТЬ ПРОХОДКИ - Месяц: 490р.",
                },
              ],
            },
            {
              tag: "li",
              children: [
                {
                  tag: "strong",
                  children: [
                    {
                      tag: "span",
                      value: "СТОИМОСТЬ ПРОХОДКИ - Сезон: ",
                    },
                    {
                      tag: "s",
                      value: "1770р",
                    },
                    {
                      tag: "span",
                      value: " 1500р. (Осеняя Скидка!)",
                    },
                  ],
                },
              ],
            },
            {
              tag: "blockquote",
              value:
                "❗ Внимание! Сервер лицензионный! Не имея лицензионного аккаунта minecraft - зайти на него не получится!",
            },
            {
              tag: "blockquote",
              children: [
                {
                  tag: "span",
                  value: "❗В дискорде:",
                },
                {
                  tag: "br",
                },
                {
                  tag: "span",
                  value: "Выберете себе ",
                },
                {
                  tag: "b",
                  value: "роль",
                },
                {
                  tag: "span",
                  value: ' и впишите ["роль"] после Ника',
                },
              ],
            },
          ],
        },
        {
          tag: "h2",
          value:
            "🫴🏻Оплатить проходку, чтобы попасть на сервер, Вы можете разными способами!",
        },
        {
          tag: "ul",
          children: [
            {
              tag: "li",
              children: [
                {
                  tag: "h3",
                  children: [
                    { tag: "span", value: "📙 Способ 1. Подписка на бусти" },
                    { tag: "br" },
                    {
                      tag: "span",
                      value: "Оформление подписки Участник сервера FreshCraft",
                    },
                  ],
                },
                {
                  tag: "p",
                  children: [
                    {
                      tag: "span",
                      value: "ОФОРМИТЬ МОЖНО ТУТ - ",
                    },
                    {
                      tag: "a",
                      value: "https://boosty.to/freshcraftoficialserver",
                      elementProps: {
                        href: "https://boosty.to/freshcraftoficialserver",
                      },
                    },
                  ],
                },
                {
                  tag: "p",
                  children: [
                    {
                      tag: "span",
                      value:
                        "После оформления подписки пишите туда же - на boosty",
                    },
                    { tag: "br" },
                    {
                      tag: "span",
                      value: "Нужно будет скинуть:",
                    },
                  ],
                },
                {
                  tag: "ul",
                  children: [
                    {
                      tag: "li",
                      value: "Ник",
                    },
                    {
                      tag: "li",
                      value: "Дискорд",
                    },
                  ],
                },
                {
                  tag: "blockquote",
                  children: [
                    {
                      tag: "span",
                      value:
                        "(Для Украинцев и не только) Если у вас не получается оплатить/привязать карту на Boosty, попробуйте включить VPN в своём браузере. Таким образом оплата будет считаться в долларах и всё должно заработать!",
                    },
                    {
                      tag: "br",
                    },
                    {
                      tag: "span",
                      value:
                        "✅ Рабочие VPN: Browsec, Windscribe (могут быть и другие)",
                    },
                    {
                      tag: "br",
                    },
                    {
                      tag: "span",
                      value: "🗺️ Регион: США, Европа",
                    },
                  ],
                },
              ],
            },
            {
              tag: "li",
              children: [
                { tag: "h3", value: "🫰🏻 Способ 2. Оплата напрямую" },
                {
                  tag: "p",
                  value: "РЕКВИЗИТЫ:",
                },
                {
                  tag: "ul",
                  children: [
                    {
                      tag: "li",
                      value: "TINKOFF ➡️ 5536 9141 4369 1073",
                    },
                    {
                      tag: "li",
                      value: "SBER ➡️ 2202 2036 3663 5882",
                    },
                    {
                      tag: "li",
                      children: [
                        {
                          tag: "p",
                          value: "USDT - PAYYER:",
                        },
                        {
                          tag: "blockquote",
                          value:
                            "Внимание, данным способом оплаты, можно купить только на весь сезон!",
                        },
                        {
                          tag: "ul",
                          children: [
                            {
                              tag: "li",
                              value:
                                "TRC-20: TZHqKbfrjgLAF9ve5FUyzKUNBCUBCV2aWW",
                            },
                            {
                              tag: "li",
                              value:
                                "ERC-20: 0x5245d72c33738Da96784Cb9f62aC2a2b449A58ef",
                            },
                          ],
                        },
                        {
                          tag: "blockquote",
                          children: [
                            {
                              tag: "b",
                              value:
                                "Вы так-же можете предложить свой вариант перевода через Крипто-Кошельки!",
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  tag: "p",
                  children: [
                    {
                      tag: "span",
                      value: "После перевода скидывайте сюда -",
                    },
                    {
                      tag: "br",
                    },
                    {
                      tag: "span",
                      value: "Telegram: ",
                    },
                    {
                      tag: "a",
                      value: "https://t.me/Artemiy_GV",
                      elementProps: {
                        href: "https://t.me/Artemiy_GV",
                      },
                    },
                    {
                      tag: "span",
                      value: " следующую информацию:",
                    },
                  ],
                },
                {
                  tag: "ul",
                  children: [
                    {
                      tag: "li",
                      value: "Ник",
                    },
                    {
                      tag: "li",
                      value: "Почта",
                    },
                    {
                      tag: "li",
                      value: "Дискорд",
                    },
                    {
                      tag: "li",
                      value: "Скриншот оплаты",
                    },
                  ],
                },
                {
                  tag: "li",
                  children: [
                    {
                      tag: "h3",
                      value:
                        "🧐Способ 3. Оплата на прямую - прямая заявка с предложением по оплате",
                    },
                    {
                      tag: "p",
                      children: [
                        {
                          tag: "span",
                          value: "Telegram: ",
                        },
                        {
                          tag: "a",
                          value: "https://t.me/Artemiy_GV",
                          elementProps: {
                            href: "https://t.me/Artemiy_GV",
                          },
                        },
                      ],
                    },
                    {
                      tag: "p",
                      value:
                        "Вы можете написать мне напрямую и предложить удобный для вас способом оплаты",
                    },
                    {
                      tag: "p",
                      value: "После оплаты:",
                    },
                    {
                      tag: "ul",
                      children: [
                        {
                          tag: "li",
                          value: "Ник",
                        },
                        {
                          tag: "li",
                          value: "Дискорд",
                        },
                        {
                          tag: "li",
                          value: "Скриншот оплаты",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          tag: "h3",
          children: [
            {
              tag: "span",
              value:
                "Перед тем как приобрести проходку ознакомьтесь с сервером - ",
            },
            {
              tag: "a",
              value: "#╔👀│сервер-знакомство",
              elementProps: {
                href: "https://discord.com/channels/555723601752621086/1094232328206823524",
              },
            },
            {
              tag: "span",
              value: " и правилами - ",
            },
            {
              tag: "a",
              value: "#║📖│сервер-правила",
              elementProps: {
                href: "https://discord.com/channels/555723601752621086/1080168206511124520",
              },
            },
          ],
        },
      ],
    },
  ];

  return (
    <div className={styles.container}>
      {sections.map((section, index) => (
        <section key={index}>
          <div className={styles.head}>
            <div
              className={styles.background}
              style={{
                backgroundImage: `url(${section.backgroundUrl})`,
              }}
            />
            <div className={styles.textContainer}>
              <h1>{section.title}</h1>
              <p>{section.subtitle}</p>
            </div>
          </div>
          <details className={styles.details}>
            <BaseButton
              size="epic"
              fullSpace
              justifyContent="start"
              actLikeSummary
            >
              {section.button.value}
            </BaseButton>
            {section.mainElements.map((el, index) => (
              <RecursiveComponent
                key={index}
                is={el.tag as string}
                children={el.children}
                value={el.value}
                {...(el.elementProps || {})}
              />
            ))}
          </details>
        </section>
      ))}
    </div>
  );
};

export default Play;
