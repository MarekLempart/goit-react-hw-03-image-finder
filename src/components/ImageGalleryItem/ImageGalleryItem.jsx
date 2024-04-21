// ImageGalleryItem.jsx

import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

// Funkcyjny komponent odpowiedzialny za pojedynczy element galerii.
export const ImageGalleryItem = ({ image, togleModal }) => {
  const { id, largeImageURL, tags, webformatURL } = image; // Destrukturyzacja obiektu obrazka

  return (
    <li
      key={id} // Używamy unikalnego identyfikatora dla każdego elementu
      onClick={() => togleModal(largeImageURL, tags)}
      className={css.ImageGalleryItem}
    >
      <img
        loading="lazy"
        className={css.ImageGalleryItemImage}
        src={webformatURL}
        alt={tags}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.object.isRequired, // Obiekt obrazka jest wymagany
  togleModal: PropTypes.func.isRequired,
};

// {/* Iteracja przez tablicę obrazów i wyświetlanie ich na stronie. */}
// {images.map(item => (
//   // Po kliknięciu na element galerii wywołujemy funkcję togleModal, która otwiera okno modalne.
//   <li
//     key={item.id}
//     onClick={evt => {
//       togleModal(item.largeImageURL, item.tags);
//     }}
//     className={css.ImageGalleryItem}
//   >
//     <img
//       loading="lazy"
//       className={css.ImageGalleryItemImage}
//       src={item.webformatURL}
//       alt={item.tags}
//     />
//   </li>
// ))}

// ImageGalleryItem.propTypes = {
//   images: PropTypes.arrayOf(PropTypes.object).isRequired,
// };
