const calculateBmi = (height: number, weight: number) => {
  const bmi = weight/Math.pow(height/100, 2)

  if (bmi < 18.5) return 'Underweight (low weight)'
  if (bmi > 18.5 && bmi < 25 ) return 'Normal (healthy weight)'
  if (bmi > 25 ) return 'Overweight (high weight)'
}

console.log(calculateBmi(180, 74))
console.log(calculateBmi(180, 59))
console.log(calculateBmi(180, 102))