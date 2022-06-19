import { SetStateAction, useState } from 'react'
import { RootState } from '../redux/store'
import { useSelector, useDispatch } from 'react-redux'
import { addTodo } from '../redux/todo'
import Items from './ui/Item'
import './stule.css'
import './ui/ui.css'

export const Counter = () => {
  const [input, setInput] = useState<string>('')
  const data = useSelector((state: RootState) => state.todo)
  const dispatch = useDispatch()
  const [todos, setTodos] = useState<string>('')
  const [CopmliteChek, setComlite] = useState<boolean>(false)
  const todo = {
    id: Date.now(),
    value: false,
    title: input,
    todo: todos,
  }
  //===========================================================================================
  const handleClear = (event: {
    target: { value: SetStateAction<string> }
  }): void => {
    setInput(event.target.value)
  }
  const handleArea = (event: {
    target: { value: SetStateAction<string> }
  }): void => {
    setTodos(event.target.value)
  }
  const addTask = () => {
    dispatch(addTodo(todo))
    setInput('')
    setTodos('')
  }
  const whoComlite = () => {
    setComlite(!CopmliteChek)
  }
  //===========================================================================================
  return (
    <div className="body">
      <div className="conteiner">
        <input
          className="input"
          type="text"
          value={input}
          onChange={handleClear}
          placeholder="Task"
        />
        <textarea
          className="input input_Body"
          value={todos}
          onChange={handleArea}
          placeholder="Description"
        />
        <button className="BTN" onClick={() => addTask()}>
          add
        </button>
      </div>
      <div className="conteiner todo_conteiner">
        <div className="chek_complited">
          {CopmliteChek == false && (
            <div className="loading" onClick={() => whoComlite()}>
              Performed...
            </div>
          )}
          {CopmliteChek == true && (
            <div className="loading" onClick={() => whoComlite()}>
              Complited...
            </div>
          )}
        </div>
        <Items props={data} value={CopmliteChek} />
      </div>
    </div>
  )
}
