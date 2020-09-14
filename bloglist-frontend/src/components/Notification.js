import React from 'react'

const Notification = ({ message,color }) => {
  if (message === null) {
    return null
  }

  const configure = {
    color: color,
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  return (
    <div className="error" style={configure}>
      {message}
    </div>
  )
}

export default Notification