import PropTypes from "prop-types";

import { DetailsSwiperStyled } from "./DetailsSwiper.styled";

export const DetailsSwiper = ({ title, images }) => {
  return (
    <DetailsSwiperStyled>
      <swiper-container
        space-between="20"
        grab-cursor="true"
        thumbs-swiper=".thumbs">
        {images.map((img) => {
          return (
            <swiper-slide key={img} lazy="true">
              <img
                src={img}
                alt={title}
                width={580}
                height={580}
                loading="lazy"
              />
            </swiper-slide>
          );
        })}
      </swiper-container>

      {images.length > 1 && (
        <swiper-container
          slides-per-view="5"
          mousewheel="true"
          keyboard="true"
          class="thumbs">
          {images.map((img) => {
            return (
              <swiper-slide
                key={img}
                lazy="true"
                class="preview">
                <img
                  src={img}
                  alt={title}
                  width={96}
                  height={96}
                  loading="lazy"
                />
              </swiper-slide>
            );
          })}
        </swiper-container>
      )}
    </DetailsSwiperStyled>
  );
};

DetailsSwiper.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
};
