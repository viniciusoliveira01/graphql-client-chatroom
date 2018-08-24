import React from 'react'

export default ({message}) => (
  <li>
    <p>
      {message.user.username}
    </p>
    <p>
      {message.created_at}
    </p>
    <p>
      {message.text}
    </p>
  </li>
)
