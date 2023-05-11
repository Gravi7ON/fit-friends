import LoginForm from 'src/components/forms/login-form/login-form';
import SignOnBackground from 'src/components/common-ui/sign-on-background/sign-on-background';

export default function SignIn(): JSX.Element {
  return (
    <SignOnBackground>
      <LoginForm />
    </SignOnBackground>
  );
}
