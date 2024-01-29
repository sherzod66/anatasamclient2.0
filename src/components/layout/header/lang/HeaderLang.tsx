"use client";
import { FC } from "react";
import styles from "./changeLang.module.scss";
import { VscChevronDown } from "react-icons/vsc";
import cn from "clsx";
const HeaderLang: FC = () => {
  // let localS = localStorage.getItem("i18nextLng");
  // const { i18n } = useTranslation();
  // useEffect(() => {
  //   const localLang = localStorage.getItem("i18nextLng");
  //   if (localLang) {
  //     document.documentElement.lang = `${localLang}`;
  //     setLanguage((prev) => ({ ...prev, lang: localLang }));
  //   }
  // }, []);

  // const [language, setLanguage] = useState({
  //   open: false,
  //   lang: localS ? localS : "ru",
  // });
  // const changeLanguage = (language: string) => {
  //   i18n.changeLanguage(language);
  //   setLanguage((prev) => ({ ...prev, open: false, lang: language }));
  //   document.documentElement.lang = `${language}`;
  // };
  const setLang = () => {
    //setLanguage((prev) => ({ ...prev, open: !language.open }));
  };
  return (
    <div className={styles.header__lang}>
      <div className={cn(styles.choose__lang, styles.ru)}>
        <p>
          RU
          <VscChevronDown className={styles.icon} />
        </p>
        <ul className={styles.choose__lang_list}>
          <p>Ru</p>
          <p>Uz</p>
        </ul>
      </div>
    </div>
  );
};

export default HeaderLang;
