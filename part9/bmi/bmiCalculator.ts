interface BMIValues {
  value1: number;
  value2: number;
}

const parseArguments = (args: Array<string>): BMIValues => {
  if (args.length < 4) throw new Error('Too few arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
      return {
          value1: Number(args[2]),
          value2: Number(args[3])
      }
  } else {
      throw new Error('Provided arguments were not numbers');
  }
}

export const calculateBmi = (height_cm: number, weight_kg: number): string => {
  let height_m: number = height_cm / 100;
  let bmi: number = weight_kg / (height_m ** 2);

  if (bmi < 18.5) {
    return `Underweight: ${bmi}`;
  } else if (bmi < 25) {
    return `Normal (healthy weight): ${bmi}`;
  } else if (bmi < 30) {
    return `Overweight: ${bmi}`;
  } else {
    return `Obese: ${bmi}`;
  }

}

try {
  const { value1, value2 } = parseArguments(process.argv);
  console.log(calculateBmi(value1, value2));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong.';
  if (error instanceof Error) {
      errorMessage += ` Error: ${error.message}`;
  }
  console.log(errorMessage);
}