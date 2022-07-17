import React from 'react'
import { TitleWrapper } from './Title.styled'

function Title({title , para}) {
  return (
    <TitleWrapper>
      <h1>{title}</h1>
      <p>{para}</p>
    </TitleWrapper>
  )
}

export default Title
