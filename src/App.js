import React from 'react'
import { Squares } from './components/squares'
let tilted = window.innerHeight < window.innerWidth
class App extends React.Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <div>
        {tilted ? <Squares /> : <h1>sorry tilt your pad and refresh</h1>}
      </div>
    )
  }
}

export default App;
