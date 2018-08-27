import React from 'react'

export default ({message, username}) => (
  <li>
    <p>
      {username}
    </p>
    <p>
      {message.created_at}
    </p>
    <p>
      {message.text}
    </p>
  </li>
)
