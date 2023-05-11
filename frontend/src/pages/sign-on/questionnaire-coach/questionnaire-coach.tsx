import QuestionnaireCoachForm from 'src/components/forms/questionnaire-coach-form/questionnaire-coach-form';
import SignOnBackground from 'src/components/common-ui/sign-on-background/sign-on-background';

export default function QuestionnaireCoach(): JSX.Element {
  return (
    <SignOnBackground>
      <QuestionnaireCoachForm />
    </SignOnBackground>
  );
}
