// Searchbar.jsx

import { Component } from 'react';
import { toast } from 'react-hot-toast'; // dla pokazywania powiadomień
import { BiSearch } from 'react-icons/bi'; // ikona wyszukiwania
import css from './Searchbar.module.css';

export class Searchbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '', // Inicjalizacja stanu search
    };
  }
  // stale = {
  //   search: '',
  // };

  onChangeInput = evt => {
    const { name, value } = evt.currentTarget;
    this.setState({ [name]: value });
  };

  resetForm = () => {
    this.setState({ search: '' });
  };

  render() {
    const { search } = this.state; // Odczyt wartości search z aktualnego stanu
    return (
      <header className={css.Searchbar}>
        <form
          onSubmit={evt => {
            evt.preventDefault();
            if (!search) {
              // Sprawdzenie, czy search nie jest pusty
              // if (!this.state.search) {
              return toast.error('Enter text for seatch.');
            }
            this.props.handleSubmit(search);
            // this.props.handleSubmit(this.state.search);
            this.resetForm();
          }}
          className={css.SearchForm}
        >
          <button type="submit" className={css.SearchFormButton}>
            <BiSearch size="20" />
            {/* <span class="button-label">Search</span> */}
          </button>

          <input
            value={search}
            // value={this.state.search}
            onChange={this.onChangeInput}
            className={css.SearchFormInput}
            name="search"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
