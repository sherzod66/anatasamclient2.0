import { FC } from "react";
import styles from "./aboutUs.module.scss";

const AboutUs: FC = () => {
  return (
    <div className={styles.about}>
      <div className={styles.about__container}>
        <div className={styles.about__row}>
          <div className={styles.about__item}>
            <div className={styles.about__title}>O нас</div>
            <p>
              Anatasam Invitation это одна из самых лидирующих компаний в
              Узбекистане по производству и печати пригласительных и
              поздравительных открыток, наша компания обслуживает и радует наших
              клиентов более 15 лет и продолжает совершенствовать ассортимент
              своей продукции и привлекать более широкую аудиторию за счет
              повышения качества, продолжая развивать свою отрасль. Наша
              компания отличается одной особенностью, тем что у нас нет границ
              мы принимаем и отправляем нашу продукцию даже в самые дальние
              уголки мира. Мы печатали пригласительные для наших клиентов из
              Америки, Италии, Франции, Великобритании, России и много других
              стран и на самых разных языках мира. Мы гордимся за то, что мы
              всегда готовим лучшее, это является основной целью Anatasam
              Invitation, и так будет продолжаться и в будущем.
            </p>
          </div>
          <div className={styles.about__item}>
            <div className={styles.about__img}>
              <img
                src="https://avatars.mds.yandex.net/get-altay/1880508/2a0000016e362f966ecdc93e2c1976561db7/XXXL"
                alt="ofice"
                draggable={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
