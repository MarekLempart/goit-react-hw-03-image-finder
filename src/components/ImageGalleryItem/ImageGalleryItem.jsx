// ImageGalleryItem.jsx

import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

// Funkcyjny komponent odpowiedzialny za pojedynczy element galerii.
export const ImageGalleryItem = ({ images, togleModal }) => {
  return (
    <>
      {/* Iteracja przez tablicę obrazów i wyświetlanie ich na stronie. */}
      {images.map(item => (
        // Po kliknięciu na element galerii wywołujemy funkcję togleModal, która otwiera okno modalne.
        <li
          key={item.id}
          onClick={evt => {
            togleModal(item.largeImageURL, item.tags);
          }}
          className={css.ImageGalleryItem}
        >
          <img
            loading="lazy"
            className={css.ImageGalleryItemImage}
            src={item.webformatURL}
            alt={item.tags}
          />
        </li>
      ))}
    </>
  );
};

ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
};
