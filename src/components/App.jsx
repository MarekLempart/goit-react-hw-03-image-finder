import { Button } from 'components/Button/Button'; // Przycisk
import { Loader } from 'components/Loader/Loader'; // Wskaźnik ładowania
import { Component } from 'react';
import { Toaster } from 'react-hot-toast'; // Komponent do obsługi spływających powiadomień
import { getSearchImages } from './Api/getSearch'; // Funkcja do pobierania danych wyszukiwania
import { ImageGallery } from './ImageGallery/ImageGallery'; // Galeria obrazków
import { Modal } from './Modal/Modal'; // Moda
import { Searchbar } from './Searchbar/Searchbar'; // Pasek wyszukiwania
export class App extends Component {
  state = {
    search: '', // Aktualne zapytanie wyszukiwania
    images: [], // Lista obrazków
    page: 1, // Aktualna strona wyników
    total: 1, // Całkowita liczba obrazków pasujących do zapytania
    loading: false, // Flaga wskazująca czy trwa ładowanie danych
    error: null, // Błąd, jeśli wystąpił
    showModal: false, // Flaga określająca czy modal jest widoczny
    empty: false, // Flaga informująca czy lista obrazków jest pusta
  };

  componentDidUpdate(_, PrevState) {
    // Sprawdzenie czy zmieniły się parametry wyszukiwania lub strona
    if (
      PrevState.search !== this.state.search ||
      PrevState.page !== this.state.page
    ) {
      // Wywołanie funkcji do pobrania danych
      this.getFunc(this.state.search, this.state.page);
    }
  }

  // Funkcja do pobrania danych
  getFunc = (text, page) => {
    this.setState({ loading: true }); // Włączenie wskaźnika ładowania

    // Wywołanie funkcji getSearch, która wysyła zapytanie do serwera
    getSearchImages(text, page)
      .then(resp => resp.json()) // Konwersja odpowiedzi na format JSON
      .then(data => {
        // Sprawdzenie czy lista wyników wyszukiwania jest pusta
        if (data.hits.length === 0) {
          this.setState({ empty: true }); // Ustawienie flagi informującej o pustej liście
        }
        // Aktualizacja stanu aplikacji o nowe dane
        this.setState(prevSt => ({
          page: prevSt.page,
          images: [...prevSt.images, ...data.hits], // Dodanie nowych obrazków do listy
          total: data.total,
        }));
      })
      .catch(error => {
        this.setState({ error: error.message }); // Obsługa błędu
      })
      .finally(() => {
        this.setState({ loading: false }); // Wyłączenie wskaźnika ładowania
      });
  };

  // Obsługa kliknięcia przycisku "Load more"
  clickLoad = () => {
    this.setState(prevSt => ({
      page: prevSt.page + 1, // Zwiększenie numeru strony o 1
    }));
  };

  // Obsługa otwierania modala
  openModal = (largeImageURL, alt) => {
    // Aktualizacja stanu aplikacji w zależności od poprzedniego stanu
    this.setState(({ showModal }) => {
      return { showModal: !showModal, largeImageURL, alt };
    });
  };

  // Obsługa przesłania formularza wyszukiwania
  handleSubmit = search => {
    // Wyczyszczenie listy obrazków i ustawienie wartości początkowych
    this.setState({
      search,
      images: [],
      page: 1,
      total: 1,
      loading: false,
      error: null,
      empty: false,
    });
  };

  // Obsługa zamknięcia modala
  closeModal = () => {
    // Aktualizacja stanu aplikacji w zależności od poprzedniego stanu
    this.setState(({ showModal }) => {
      return { showModal: !showModal };
    });
  };

  render() {
    const { error, loading, images, total, page } = this.state;
    return (
      <div>
        {/* Komponent do obsługi spływających powiadomień */}
        <Toaster
          toastOptions={{
            duration: 1500,
          }}
        />

        {/* Pasek wyszukiwania */}
        <Searchbar handleSubmit={this.handleSubmit} />

        {/* Wyświetlenie komunikatu o błędzie */}
        {error && (
          <h2 style={{ textAlign: 'center' }}>
            Coś poszło nie tak: ({error})!
          </h2>
        )}

        {/* Galeria obrazków */}
        <ImageGallery togleModal={this.openModal} images={images} />

        {/* Wskaźnik ładowania */}
        {loading && <Loader />}

        {/* Komunikat o pustej liście wyników */}
        {this.state.empty && (
          <h2 style={{ textAlign: 'center' }}>
            Przepraszamy. Brak obrazków ... 😭
          </h2>
        )}

        {/* Przycisk "Load more" */}
        {total / 12 > page && <Button clickLoad={this.clickLoad} />}

        {/* Modal */}
        {this.state.showModal && (
          <Modal closeModal={this.closeModal}>
            <img src={this.state.largeImageURL} alt={this.state.alt} />
          </Modal>
        )}
      </div>
    );
  }
}
