interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface Values {
  hours: number[];
  target: number;
}

type Operation = 'trainingDays' | 'rating';

const calculateExercises = (hours: number[], target: number): Result => {
  const calcAvg = (hours: number[]) => {
    let avg = 0;
    for (let i = 0; i < hours.length; i++) {
      avg += hours[i];
    }
    return avg / hours.length;
  };

  const calculator = (hours: number[], target: number, op: Operation) => {
    switch(op) {
      case 'trainingDays':
        let days = 0;
        for (let i = 0; i < hours.length; i++) {
          if (hours[i] > 0) days += 1;
        }
        return days;
      case 'rating':
        const average = calcAvg(hours);
        if (average > target) return 3;
        else if (average < target && average > target - 1) return 2;
        else return 1;
      }
    };
    
  const setSuccess = (hours: number[], target: number): boolean => {
    const average = calcAvg(hours);
    if (average > target) return true;
    else return false;
  };

  const setRatingDesc = (rating: number): string => {
    switch(rating) {
      case 1:
        return 'poor';
      case 2:
        return 'great';
      case 3:
        return 'excellent';
      default:
        return 'no rating';
    }
  };

  return {
    periodLength: hours.length,
    trainingDays: calculator(hours, target, 'trainingDays'),
    success: setSuccess(hours, target),
    rating: calculator(hours, target, 'rating'),
    ratingDescription: setRatingDesc(calculator(hours, target, 'rating')),
    target: target,
    average: calcAvg(hours)
  };
};

const parseExcercises = (args: string[]): Values => {
  if (args.length < 4) throw new Error('Not enough arguments!');

  if (!isNaN(Number(args[2]))) {
    const hourList = [];
    for (let i = 3; i < args.length; i++) {
      if (isNaN(Number(args[i]))) throw new Error('All arguments need to be numbers!');
      hourList.push(Number(args[i]));
    }
    return {
      target: Number(args[2]),
      hours: hourList,
    };
  }
  else throw new Error ('Arguments need to be numbers!');
};

try {
  const { hours, target } = parseExcercises(process.argv);
  console.log(calculateExercises(hours, target));
} catch (error: unknown) {
  let errorMessage = '';
  if (error instanceof Error) {
    errorMessage = error.message;
  }
  console.log(errorMessage);
}