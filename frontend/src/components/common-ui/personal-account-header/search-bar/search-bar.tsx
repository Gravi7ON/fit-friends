export default function SearchBar(): JSX.Element {
  return (
    <div className="search">
      <form>
        <label>
          <span className="search__label">Поиск</span>
          <input
            type="search"
            name="search"
          />
          <svg
            className="search__icon"
            width="20"
            height="20"
            aria-hidden="true"
          >
            <use xlinkHref="#icon-search"></use>
          </svg>
        </label>
        <ul className="search__list"></ul>
      </form>
    </div>
  );
}
