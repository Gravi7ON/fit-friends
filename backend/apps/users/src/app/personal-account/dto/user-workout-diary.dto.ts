import {
  IsInt,
  IsString,
  Validate,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'customDateFieldCheck', async: false })
export class CustomDateFieldCheck implements ValidatorConstraintInterface {
  validate(text: string) {
    return /(monday|tuesday|wednesday|thursday|friday|saturday|sunday)/g.test(
      text
    );
  }

  defaultMessage() {
    return 'You should pass the date and one of this value: monday|tuesday|wednesday|thursday|friday|saturday|sunday and comma separated(e.g. 03.03.2023, tuesday)';
  }
}

export class UserWorkoutDiaryDto {
  @IsInt()
  public workoutId: number;

  @IsString()
  public calory: string;

  @Validate(CustomDateFieldCheck)
  @IsString()
  public date: string;

  @IsString()
  public trainingTime: string;
}
