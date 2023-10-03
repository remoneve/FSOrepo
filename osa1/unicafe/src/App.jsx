import { useState } from 'react'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = (props) => {
  const calcAvg = () => {
    return (
      (props.stats[1]+(props.stats[3]*-1))/props.stats[0]
    )
  }

  const calcPositive = () => {
    return (
      (props.stats[1]/props.stats[0])*100
    )
  }
  
  if (props.stats[0] < 1) {
      return(
        <div>No feedback given</div>
      )
  }

  return (
  <table> 
    <tbody>
      <tr><StatisticsLine text="good" value={props.stats[1]}/></tr>
      <tr><StatisticsLine text="neutral" value={props.stats[2]}/></tr>
      <tr><StatisticsLine text="bad" value={props.stats[3]}/></tr>
      <tr><StatisticsLine text="all" value={props.stats[0]}/></tr>
      <tr><StatisticsLine text="average" value={calcAvg()}/></tr>
      <tr><StatisticsLine text="positive" value={calcPositive()}/></tr>
    </tbody> 
  </table>
  )
}

const StatisticsLine = (props) => {
  if (props.text === "positive") {
    return (
    <td>{props.text} {props.value} %</td>
    )
  }
  
  return (
    <td>{props.text} {props.value}</td>
  )
}

const App = () => {
  const [total, setTotal] = useState(0)
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
    setTotal(updatedGood + neutral + bad)
  }

  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    setTotal(updatedNeutral + good + bad)
  }

  const handleBadClick = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
    setTotal(updatedBad + neutral + good)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text='good'/>
      <Button handleClick={handleNeutralClick} text='neutral'/>
      <Button handleClick={handleBadClick} text='bad'/>
      <h1>statistics</h1>
      <Statistics stats={[total, good, neutral, bad]}/>
    </div>
  )
}

export default App