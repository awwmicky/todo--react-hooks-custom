import React, { useState,useEffect,useMemo } from 'react'
import './assets/CSS/App.css'
import localforage from 'localforage'
import TodoForm from './components/TodoForm/'
import TodoList from './components/TodoList/'
import { Context } from './assets/Context.js'



const STORAGE_NAME = 'todo_db';

const useStorage = (db) => {
  const [ state,setState ] = useState( [] );
  
  useEffect(() => {
    (async () => {
      try {
        const todoDB = await localforage.getItem(db) || [];
        if (todoDB) setState(todoDB)
      } catch (err) { console.error(err) }
    })()
  }, [ db ])

  useEffect(() => {
    (async () => {
      try { await localforage.setItem(db,state) } 
      catch (err) { console.error(err) }
    })()
  }, [ db,state ])
  
  return [ state,setState ];
};

export default () => {

  const [ todoList,setTodoList ] = useStorage(STORAGE_NAME);
  // const [ todoList,setTodoList ] = useState([]);
  // const [ tempList,setTempList ] = useState([]);
  const [ value,setValue ] = useState("");
  const [ select,setSelect ] = useState("create-task");

  const providerValue = useMemo(() => 
    ({ todoList,setTodoList, value,setValue, select,setSelect }), 
    [  todoList,setTodoList, value,setValue, select,setSelect  ]
  );



  return (
    <>
      <main className="container">
        <div className="header">
          <h1>To-Do</h1>
          <p>React - Hooks - Custom</p>
        </div>
        <Context.Provider value={ providerValue }>
          <TodoForm />
          <TodoList />
        </Context.Provider>
      </main>
    </>
  );
};