import { Link } from 'react-router-dom';
import CoachInfo from './coach-info/coach-info';
import CoachWidget from './coach-widgets/coach-widget';
import { PersonalCoachRoute } from 'src/constant';
import CoachCertificates from './coach-certificates/coach-certificates';

const coachWidgetsProps = [
  {
    linkTo: PersonalCoachRoute.Trainings,
    iconPath: '#icon-flash',
    title: 'Мои тренировки',
  },
  {
    linkTo: PersonalCoachRoute.CreateTraining,
    iconPath: '#icon-add',
    title: 'Создать тренировку',
  },
  {
    linkTo: PersonalCoachRoute.Friends,
    iconPath: '#icon-friends',
    title: 'Мои друзья',
  },
  {
    linkTo: PersonalCoachRoute.Orders,
    iconPath: '#icon-bag',
    title: 'Мои заказы',
  },
];

export default function CoachAccountMain(): JSX.Element {
  return (
    <section className="inner-page">
      <div className="container">
        <div className="inner-page__wrapper">
          <h1 className="visually-hidden">Личный кабинет</h1>
          <CoachInfo />
          <div className="inner-page__content">
            <div className="personal-account-coach">
              <div className="personal-account-coach__navigation">
                {coachWidgetsProps.map(({ linkTo, title, iconPath }) => (
                  <CoachWidget
                    key={title}
                    linkTo={linkTo}
                    title={title}
                    iconPath={iconPath}
                  />
                ))}
                <div className="personal-account-coach__calendar"></div>
              </div>
              <CoachCertificates />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
