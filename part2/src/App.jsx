const Course = ({course}) => {
  return (
    <>
    <Header name={course.name}/>
    <Content parts={course.parts} />
    </>
  )
}

const Header = ({name}) => {
  return (
      <h1>{name}</h1>
  )
}

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

const Part = ({part}) => {
  return (
    <p>{part.name} {part.exercises}</p>
  )
}


// zrób zwrot totala w Content()
// const Total = (props) => {
//   return (
//     <b>total of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</b>
//   )
// }


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App