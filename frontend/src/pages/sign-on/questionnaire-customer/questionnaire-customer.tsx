import SignOnBackground from 'src/components/common-ui/sign-on-background/sign-on-background';
import QuestionnaireCustomerForm from 'src/components/forms/questionnaire-customer-form/questionnaire-customer-form';

export default function QuestionnaireCustomer(): JSX.Element {
  return (
    <SignOnBackground>
      <QuestionnaireCustomerForm />
    </SignOnBackground>
  );
}
