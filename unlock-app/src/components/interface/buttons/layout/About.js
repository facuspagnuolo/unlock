import React from 'react'
import Svg from '../../svg'
import { LayoutButton } from '../Button'

const About = props => (
  <LayoutButton href="/about" title="About" {...props}>
    <Svg.About title="About" />
  </LayoutButton>
)

export default About
