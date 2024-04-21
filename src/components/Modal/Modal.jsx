// Modal.jsx

// import * as basicLightbox from 'basiclightbox';
// import { useEffect, useRef } from 'react';
// import css from './Modal.module.css';

// const Modal = ({ showModal, closeModal, largeImageURL, alt }) => {
//   const modalRef = useRef(null);

//   useEffect(() => {
//     const handleOutsideClick = evt => {
//       if (modalRef.current && !modalRef.current.contains(evt.target)) {
//         closeModal();
//       }
//     };

//     const handleEscPress = evt => {
//       if (evt.keyCode === 27) {
//         closeModal();
//       }
//     };

//     if (showModal) {
//       document.addEventListener('mousedown', handleOutsideClick);
//       document.addEventListener('keydown', handleEscPress);

//       const instance = basicLightbox.create(`
//         <img src="${largeImageURL}" alt="${alt}" />
//       `);
//       instance.show();

//       return () => {
//         document.removeEventListener('mousedown', handleOutsideClick);
//         document.removeEventListener('keydown', handleEscPress);
//         instance.close();
//       };
//     }
//   }, [showModal, largeImageURL, alt, closeModal]);

//   if (!showModal) return null;

//   return (
//     <div className={css.Overlay}>
//       <div className={css.Modal} ref={modalRef}>
//         <img src={largeImageURL} alt={alt} />
//       </div>
//     </div>
//   );
// };

// export default Modal;

import { useEffect } from 'react';
import css from './Modal.module.css';

const Modal = ({ showModal, closeModal, largeImageURL, alt }) => {
  useEffect(() => {
    const handleEscPress = evt => {
      if (evt.keyCode === 27) {
        closeModal();
      }
    };

    const handleKeyDown = evt => {
      handleEscPress(evt);
    };

    if (showModal) {
      document.body.style.overflow = 'hidden'; // Zablokowanie przewijania strony podczas wyświetlania modala
      document.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = 'auto'; // Przywrócenie normalnego przewijania strony po zamknięciu modala
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [showModal, closeModal]);

  if (!showModal) return null;

  return (
    <div className={css.Overlay} onClick={closeModal}>
      <div className={css.Modal}>
        <img src={largeImageURL} alt={alt} />
      </div>
    </div>
  );
};

export default Modal;
