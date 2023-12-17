interface BmiValues {
  height: number;
  weight: number;
}

export const calculateBmi = (height: number, weight: number) => {
  const bmi = weight/Math.pow(height/100, 2);

  if (bmi < 18.5) return 'Underweight (low weight)';
  if (bmi > 18.5 && bmi < 25 ) return 'Normal (healthy weight)';
  if (bmi > 25 ) return 'Overweight (high weight)';
  else {
    throw new Error('An error occurred');
  }
};

export const parseMeasurements = (args: string[]): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments!');
  if (args.length > 4) throw new Error('Too many arguments!');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  } else {
    throw new Error('Provided values are not numbers!');
  }
};

try {
  const { height, weight } = parseMeasurements(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = '';
  if (error instanceof Error) {
    errorMessage = error.message;
  }
  console.log(errorMessage + ' (should be 2)');
}