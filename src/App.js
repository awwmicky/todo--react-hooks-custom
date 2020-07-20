import React, { useState,useEffect,useMemo } from 'react'
import './assets/CSS/App.css'
import localforage from 'localforage'
import TodoForm from './components/TodoForm/'
import TodoList from './components/TodoList/'
import { Context } from './assets/Context.js'


export default () => {

  const [ todoList,setTodoList ] = useState([]);
  // const [ tempList,setTempList ] = useState([]);
  const [ value,setValue ] = useState("");
  const [ select,setSelect ] = useState("create-task");

  useEffect(() => {
    (async () => {
      try {
        const todoDB = await localforage.getItem('todo_db') || [];
        if (todoDB) setTodoList(todoDB)
      } catch (err) { console.error(err) }
    })()
  }, [ ])

  useEffect(() => {
    (async () => {
      try { await localforage.setItem('todo_db',todoList) } 
      catch (err) { console.error(err) }
    })()
  }, [ todoList ])

  const providerValue = useMemo(() => 
    ({ todoList,setTodoList, value,setValue, select,setSelect }), 
    [  todoList,setTodoList, value,setValue, select,setSelect  ]
  );



  return (
    <>
      <main className="container">
        <div className="header">
          <h1>To-Do</h1>
          <p>React - Hooks</p>
        </div>
        <Context.Provider value={ providerValue }>
          <TodoForm />
          <TodoList />
        </Context.Provider>
      </main>
    </>
  );
};