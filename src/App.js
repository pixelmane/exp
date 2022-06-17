import React from 'react'
import { Squares } from './components/squares'
let tilted = window.innerHeight < window.innerWidth

window.ondragstart = function() { return false; }

class App extends React.Component {
 
  render() {
    return (
      <div>
        {tilted ? <Squares /> : <h1>sorry tilt your pad and refresh</h1>}
      </div>
    )
  }
}

export default App;
