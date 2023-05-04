import { Route, Routes } from 'react-router-dom';
import { AppRoute } from 'src/constant';
import Intro from 'src/pages/intro/intro';
import SignIn from 'src/pages/sign-in/sign-in';
import SignUp from 'src/pages/sign-up/sign-up';

export default function App(): JSX.Element {
  return (
    <Routes>
      <Route
        path={AppRoute.Intro}
        element={<Intro />}
      ></Route>
      <Route
        path={AppRoute.SignIn}
        element={<SignIn />}
      ></Route>
      <Route
        path={AppRoute.SignUp}
        element={<SignUp />}
      ></Route>
    </Routes>
  );
}
