"use client";
import { FC } from "react";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./carousel.module.scss";
import "swiper/scss";
import "swiper/scss/pagination";
import { imageLinkHelper } from "./imageLink.halper";

type TGallery = {
  image: string[] | undefined;
  dataName: string;
};

const CardCarousel: FC<TGallery> = ({ dataName, image }) => {
  return (
    <Swiper
      spaceBetween={0}
      slidesPerView={1}
      speed={800}
      loop={true}
      autoplay={{
        delay: 4000,
        stopOnLastSlide: true,
        disableOnInteraction: false,
      }}
      modules={[Autoplay, Pagination]}
      className={styles.sw}
      pagination={{
        clickable: true,
      }}
    >
      {image &&
        image.map((item) => (
          <SwiperSlide className={styles.swiper_slide} key={item}>
            <img
              draggable={false}
              src={imageLinkHelper(item)}
              alt={dataName}
              itemProp={item}
            />
          </SwiperSlide>
        ))}
    </Swiper>
  );
};

export default CardCarousel;
