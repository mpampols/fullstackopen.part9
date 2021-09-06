interface ExerciseStats {
  periodLength: number,       // the number of days
  trainingDays: number,       // the number of training days
  success: boolean,           // boolean value describing if the target was reached
  rating: number,             // a rating between the numbers 1-3 that tells how well the hours are met. You can decide on the metric on your own.
  ratingDescription: string,  // a text value explaining the rating
  target: number,             // the original target value
  average: number             // the calculated average time
}

interface ExerciseValues {
  targetValue: number,
  arrayValues: Array<number>
}

const parseCalculatorArguments = (args: Array<string>): ExerciseValues => {
  if (args.length < 10) throw new Error('Not enough arguments');
  const daysArray = [
    Number(args[3]),
    Number(args[4]),
    Number(args[5]),
    Number(args[6]),
    Number(args[7]),
    Number(args[8]),
    Number(args[9])
  ];
  return {
    targetValue: Number(args[2]),
    arrayValues: daysArray
  };
};

export const calculateExercises = (targetAverage: number, arrayValues: Array<number>): ExerciseStats =>{
  const periodLength: number = arrayValues.length;
  const trainingDays: number = arrayValues.filter(day => day !== 0).length;
  const average: number = (arrayValues[0] + arrayValues[1] + arrayValues[2] + arrayValues[3] + arrayValues[4] + arrayValues[5] + arrayValues[6]) / 7;
  const success: boolean = (average >= targetAverage) ? true : false;
  let rating = 0;
  let ratingDescription = "";

  if ((average * 100 / targetAverage) >= 100) {
    rating = 3;
    ratingDescription = 'too bad';
  } else if ((average * 100 / targetAverage) >= 50) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  } else {
    rating = 1;
    ratingDescription = 'great';
  }

  const result = {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target: targetAverage,
    average,
  };

  return result;
};

try {
  const { targetValue, arrayValues } = parseCalculatorArguments(process.argv);
  console.log(calculateExercises(targetValue, arrayValues));
} catch (e) {
  console.log('Error, something bad happened');
}