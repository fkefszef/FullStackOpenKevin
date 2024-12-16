import React from 'react' 
import Header from './Header'
import Content from './Content'

const Course = ({courses}) => {
    return (
      <>
      <Header name={courses.name}/>
      <Content parts={courses.parts} />
      </>
    )
  }

export default Course