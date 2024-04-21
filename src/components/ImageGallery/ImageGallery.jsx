// ImageGallery.jsx

import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';

// Funkcyjny komponent odpowiedzialny za wyświetlanie galerii zdjęć.
// export const ImageGallery = ({ images, togleModal }) => {
//   return (
//     <>
//       <ul className={css.ImageGallery}>
//         {images.map(item => (
//           <ImageGalleryItem
//             key={item.id} // Klucz dla każdego ImageGalleryItem
//             image={item} // Przekazujemy cały obiekt obrazka
//             togleModal={togleModal}
//           />
//         ))}
//       </ul>
//     </>
//   );
// };

export const ImageGallery = ({ images, togleModal }) => {
  return (
    <>
      <ul className={css.ImageGallery}>
        {images.map(image => (
          <ImageGalleryItem
            key={image.id} // Unikalny klucz dla każdego elementu listy
            image={image} // Przekazujemy obiekt image jako props do ImageGalleryItem
            togleModal={togleModal}
          />
        ))}
      </ul>
    </>
  );
};

// Typowanie propsów dla komponentu ImageGallery
ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired, // Tablica obiektów jest wymagana jako props
  togleModal: PropTypes.func.isRequired, // Funkcja jest wymagana jako props
};

// <ul className={css.ImageGallery}>
//   {/* Utwórz listę ul z klasą galerii */}
//   <ImageGalleryItem togleModal={togleModal} images={images} />
//   {/* Renderuj komponent ImageGalleryItem z przekazanymi propsami */}
// </ul>
