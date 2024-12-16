import React from 'react'
import Part from './Part'

const Content = ({parts}) => {
    const numArray = parts.map(part => Number(part.exercises)) //Zbiera liczbe wszystkich exercises
    const total = numArray.reduce((sum, numerki) => sum + numerki, 0) //Dodajemy do sumy kolejno numerki
    return (
      <div>
        {parts.map(part => (
          <Part key={part.id} part={part}/>
        ))}
        <b>total of {total} exercises</b>
        </div>
    )
  }

export default Content;