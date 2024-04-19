// Button.jsx

import css from './Button.module.css';
export const Button = ({ clickLoader }) => {
  return (
    <button onClick={clickLoader} className={css.Button} type="button">
      Load more
    </button>
  );
};
