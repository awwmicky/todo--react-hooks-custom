import React, { useContext } from 'react'
import './TodoList.css'
import Task from './Task.js'
import { Context } from '../../assets/Context.js'



export default function TodoList () {

  const { todoList } = useContext(Context);

  return (
    <section className="todo-list">
      {
        todoList.map((el,id) => (
          <Task el={el} id={id} key={el.id} />
        ))
      }
    </section>
  );
}