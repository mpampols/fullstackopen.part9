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
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

const calculateBmi = (height: number, weight: number) => {
  const result = weight / Math.pow(height, 2)
  if (result < 0.00185) {
    console.log("Underweight")
  } else if (result >= 0.00185 && result <= 0.00249) {
    console.log("Normal (healthy weight)")
  } else if (result >= 0.0025 && result <= 0.00299) {
    console.log("Overweight")
  } else {
    console.log("Obesity")
  }
}

try {
  const { value1, value2 } = parseBmiArguments(process.argv);
  calculateBmi(value1, value2);
} catch (e) {
  console.log('Error, something bad happened, message: ', e.message);
}