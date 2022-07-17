import React from 'react'
import { useLocation } from 'react-router-dom'
import { LinkStyled, NavList } from './Nav.styled'

function Nav() {
    const LINK = [
        {
            to: '/' , text: 'Home'
        },
        {
            to: '/starred' , text: 'Starred'
        }
    ]
    const location = useLocation();
  return (
    <NavList>
      {LINK.map(el => <li key={el.to}><LinkStyled to={el.to} className={el.to === location.pathname ? 'active' : ''}>
        {el.text}</LinkStyled></li>)}
    </NavList>
  )
}

export default Nav
