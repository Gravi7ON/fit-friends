import { Expose, Transform } from 'class-transformer';

export class UserWeekFoodDiaryRdo {
  @Expose()
  @Transform(({ obj }) => obj._id.toString())
  public id: string;

  @Expose()
  public calories: string[];

  @Expose()
  @Transform(({ obj }) => {
    const ARRAY_SIZE = 7;
    const slicedArray = [];
    const sumInDays = [];
    const numberCalories = [...obj.calories].map((calory) => Number(calory));

    for (let i = 0; i < numberCalories.length; i += ARRAY_SIZE) {
      slicedArray.push(numberCalories.slice(i, i + ARRAY_SIZE));
    }

    for (let i = 0; i < ARRAY_SIZE; i++) {
      sumInDays.push(
        slicedArray[0][i] +
          slicedArray[1][i] +
          slicedArray[2][i] +
          slicedArray[3][i]
      );
    }

    return {
      inDays: sumInDays.map((calory) => String(calory)),
      inWeek: sumInDays
        .reduce(
          (prev: number, sumInDay: string) => (prev += Number(sumInDay)),
          0
        )
        .toString(),
    };
  })
  public totalCalory: Record<string, string[] | string>;

  @Expose()
  public userId: string;

  @Expose()
  public year: number;

  @Expose()
  public weekOfYear: number;
}
