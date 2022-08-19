interface ExerciseValues {
  target: number;
  dailyExerciseHours: Array<number>;
}

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseExerciseArguments = (args: Array<string>): ExerciseValues => {
  if (args.length < 4) throw new Error('Too few arguments');
  // Throw an error if some of the values are not numbers
  let numeric_args: Array<number> = Array.from(args.slice(2), Number);
  
  if (numeric_args.some(isNaN)) {
    throw new Error('Provided arguments were not numbers');
  } else {
    return {
      target: numeric_args[0],
      dailyExerciseHours: numeric_args.slice(1)
    }
  }
}

const calculateExercises = (target: number, daily_hours: Array<number>): Result => {
  let num_training_days: number = daily_hours.filter((day) => day > 0 ).length;
  let avg: number = daily_hours.reduce((a, b) => { return a + b }, 0) / daily_hours.length;
  let rating_info: Map<Number, string> = new Map<Number, string>();
  rating_info.set(1, "Too bad, you didn't meet your target hours this session.");
  rating_info.set(2, "Congrats, you met your target hours this session!");
  rating_info.set(3, "Wow! You greatly exceeded your target hours this session!");

  let rating_value: number = (avg < target) ? 1 : ((avg < 2 * target) ? 2 : 3);

  return {
    periodLength: daily_hours.length,
    trainingDays: num_training_days,
    success: avg >= target,
    rating: rating_value,
    ratingDescription: rating_info.get(rating_value),
    target: target,
    average: avg
  }
}

try {
  const { target, dailyExerciseHours } = parseExerciseArguments(process.argv);
  console.log(calculateExercises(target, dailyExerciseHours));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong.';
  if (error instanceof Error) {
      errorMessage += ` Error: ${error.message}`;
  }
  console.log(errorMessage);
}
