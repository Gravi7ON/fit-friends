import { useNavigate } from 'react-router-dom';
import './coach-account-friends.css';
import CoachAccountFriendsList from './coach-account-friends-list/coach-account-friends-list';

export default function CoachAccountFriends(): JSX.Element {
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
            <div
              className="custom-toggle custom-toggle--switch custom-toggle--switch-right"
              data-validate-type="checkbox"
            >
              <label>
                <input
                  type="checkbox"
                  value="user-agreement-1"
                  name="user-agreement"
                  disabled
                />
                <span className="custom-toggle__icon">
                  <svg
                    width="9"
                    height="6"
                    aria-hidden="true"
                  >
                    <use xlinkHref="#arrow-check"></use>
                  </svg>
                </span>
                <span className="custom-toggle__label">Только онлайн</span>
              </label>
            </div>
          </div>
          <CoachAccountFriendsList />
        </div>
      </div>
    </section>
  );
}
