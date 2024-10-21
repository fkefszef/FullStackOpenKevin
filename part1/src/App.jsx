import { useState } from 'react'

const StatisticLine = (props) => {
  return (
    <p>{props.text} {props.value}</p>
  )
}

const Statistics = (props) => {
  if(props.allClicks == 0){
    return (
      <p>No feedback given</p>
    )
  }
  return (
    // <div>
    //   <h1>Statistics</h1>
    //   <p>good {props.good}</p>
    //   <p>neutral {props.neutral}</p>
    //   <p>bad {props.bad}</p>
    //   <p>all {props.allClicks}</p>
    //   <p>average {(props.good*1 + props.bad*-1)/props.allClicks}</p>
    //   <p>positive {(props.good*100)/props.allClicks || 0}%</p>
    // </div>
    <div>
      <StatisticLine text="good" value={props.good}></StatisticLine>
      <StatisticLine text="neutral" value={props.neutral}></StatisticLine>
      <StatisticLine text="bad" value={props.bad}></StatisticLine>
      <StatisticLine text="all" value={props.allClicks}></StatisticLine>
      <StatisticLine text="average" value={(props.good*1 + props.bad*-1)/props.allClicks}></StatisticLine>
      <StatisticLine text="positive" value={(props.good*100)/props.allClicks + "%" || 0}></StatisticLine>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const [allClicks, setAll] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
    setAll(allClicks + 1)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
    setAll(allClicks + 1)
  }

  const handleBad = () => {
    setBad(bad + 1)
    setAll(allClicks + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={handleGood}>good</button>
      <button onClick={handleNeutral}>neutral</button>
      <button onClick={handleBad}>bad</button>

      <Statistics good={good} neutral={neutral} bad={bad} allClicks={allClicks}></Statistics>
      
      
    </div>
  )
}

export default App