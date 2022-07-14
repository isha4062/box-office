import React from 'react'
import { Link } from 'react-router-dom'

function Nav() {
    const LINK = [
        {
            to: '/' , text: 'Home'
        },
        {
            to: '/starred' , text: 'Starred'
        }
    ]
  return (
    <ul>
      {LINK.map(el => <li key={el.to}><Link to={el.to}>{el.text}</Link></li>)}
    </ul>
  )
}

export default Nav
