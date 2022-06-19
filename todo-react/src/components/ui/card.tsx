import React, { FC } from 'react'
import Check from './Check'
import { useDispatch } from 'react-redux'
import { deleteTodo } from '../../redux/todo'
import cn from 'classnames'

interface card {
  id: number
  value: boolean
  todo: string
  title: string
  rendreCheck: boolean
}

const Card: FC<card> = ({ id, value, todo, title, rendreCheck }) => {
  const dispatch = useDispatch()

  return (
    <>
      {rendreCheck == value && (
        <div className="todoItem" key={id}>
          <div className="ToDo">
            <div className="todoTitle">
              <Check id={id} value={value} />
              <div
                className={cn('Title', {
                  complited: value,
                })}
              >
                {title}
              </div>
            </div>
            <div className="Todo_body">{todo}</div>
          </div>

          <div>
            <button className="BTN" onClick={() => dispatch(deleteTodo(id))}>
              delete
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default Card
