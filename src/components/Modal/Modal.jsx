// Modal.jsx

import { Component } from 'react';
import { createPortal } from 'react-dom'; // Import funkcji createPortal z biblioteki react-dom
import css from './Modal.module.css';

// Znajdź element z id 'modal-root' w drzewie DOM
const modalRoot = document.querySelector('#modal-root');

// Deklaracja klasy komponentu Modal, rozszerzająca klasę Component
export class Modal extends Component {
  // Metoda cyklu życia komponentu, wywoływana po zamontowaniu komponentu
  componentDidMount() {
    window.addEventListener('keydown', this.keyDown); // Dodaj obsługę zdarzenia keydown na oknie przeglądarki
  }

  // Metoda obsługująca zdarzenie naciśnięcia klawisza na klawiaturze
  keyDown = evt => {
    // Sprawdź, czy naciśnięty został klawisz Escape
    if (evt.code === 'Escape') {
      this.props.closeModal(); // Wywołaj funkcję closeModal przekazaną jako props
    }
  };

  // Metoda cyklu życia komponentu, wywoływana przed odmontowaniem komponentu
  componentWillUnmount() {
    window.removeEventListener('keydown', this.keyDown); // Usuń obsługę zdarzenia keydown z okna przeglądarki
  }

  // Metoda obsługująca zamknięcie modala po kliknięciu na tło (backdrop)
  handleClose = evt => {
    // Sprawdź, czy kliknięcie nastąpiło na backdropie
    if (evt.currentTarget === evt.target) {
      this.props.closeModal(); // Wywołaj funkcję closeModal przekazaną jako props
    }
  };

  // Metoda renderująca komponent Modal
  render() {
    // Wykorzystaj funkcję createPortal do renderowania modala w innym miejscu w drzewie DOM
    return createPortal(
      <div onClick={this.handleClose} className={css.Overlay}>
        <div className={css.Modal}>{this.props.children}</div>{' '}
        {/* Renderuj zawartość modala */}
      </div>,
      modalRoot // Renderuj w elemencie modalRoot
    );
  }
}
