import { useNavigate } from 'react-router-dom';
import '../../personal-account-coach/coach-account-friends/coach-account-friends.css';
import CustomerAccountFriendsList from './customer-account-list/customer-account-list';

export default function CustomerAccountFriends(): JSX.Element {
  const navigate = useNavigate();

  return (
    <section className="friends-list">
      <div className="container">
        <div className="friends-list__wrapper">
          <button
            className="btn-flat friends-list__back"
            type="button"
            onClick={() => navigate(-1)}
          >
            <svg
              width="14"
              height="10"
              aria-hidden="true"
            >
              <use xlinkHref="#arrow-left"></use>
            </svg>
            <span>Назад</span>
          </button>
          <div className="friends-list__title-wrapper">
            <h1 className="friends-list__title">Мои друзья</h1>
          </div>
          <CustomerAccountFriendsList />
        </div>
      </div>
    </section>
  );
}
