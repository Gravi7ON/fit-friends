import RegisterForm from 'src/components/sign-on-forms/register-form/register-form';
import SignOnBackground from 'src/components/common-ui/sign-on-background/sign-on-background';

export default function SignUp(): JSX.Element {
  return (
    <SignOnBackground>
      <RegisterForm />
    </SignOnBackground>
  );
}
