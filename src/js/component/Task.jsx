import React from 'react'

function Task({ text , onClick }) {
  return (
    <div className="taskbox">
        <div className="task">{text}</div>
        <button onClick={onClick}>X</button>
    </div>
  )
}

export default Task