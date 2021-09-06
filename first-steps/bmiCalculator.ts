interface BMIValues {
  value1: number;
  value2: number;
}

const parseBmiArguments = (args: Array<string>): BMIValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const calculateBmi = (height: number, weight: number) : string => {
  const result = weight / Math.pow(height, 2);
  if (result < 0.00185) {
    return "Underweight";
  } else if (result >= 0.00185 && result <= 0.00249) {
    return "Normal (healthy weight)";
  } else if (result >= 0.0025 && result <= 0.00299) {
    return "Overweight";
  } else {
    return "Obesity";
  }
};

try {
  const { value1, value2 } = parseBmiArguments(process.argv);
  calculateBmi(value1, value2);
} catch (e) {
  console.log('Error, something bad happened.');
}