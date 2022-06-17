import { FC } from 'react'
import { todo } from '../../interfase'
import './ui.css'
import Card from './card'

interface item {
  props: todo[]
  value: boolean
}

const Items: FC<item> = ({ props, value }) => {
  return (
    <>
      {props.map((item) => (
        <Card
          rendreCheck={value}
          key={item.id}
          id={item.id}
          value={item.value}
          todo={item.todo}
          title={item.title}
        />
      ))}
    </>
  )
}

export default Items
