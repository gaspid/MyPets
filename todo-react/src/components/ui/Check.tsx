import React, { FC } from 'react'
import { AiOutlineCheckCircle } from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { isFinite } from '../../redux/todo'
import './ui.css'

interface Check {
  value: boolean
  id: number
}

const Check: FC<Check> = ({ value, id }) => {
  const dispatch = useDispatch()
  return (
    <div className="check" onClick={() => dispatch(isFinite({ value, id }))}>
      {value && <AiOutlineCheckCircle size={18} />}
    </div>
  )
}

export default Check
