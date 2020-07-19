import React, { useState,useCallback } from 'react'
import './assets/App.css'


export default () => {

  const [ todoList,setTodoList ] = useState([]);
  const [ value,setValue ] = useState("");
  const [ select,setSelect ] = useState("create-task");



  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault()
      if (!value.trim()) return;
      setTodoList([
        ...todoList,
        {
          id: Date.now(),
          task: value,
          completed: false
        }
      ])
      setValue("")
    }, [ todoList,value ]
  );

  const handleValue = useCallback(
    ({target}) => setValue(target.value), [ ]
  );

  const handleSelect = useCallback(
    ({target}) => setSelect(target.value), [ ]
  );

  const handleCheckBox = useCallback(
    (i) => ({target}) => {
      let data = [...todoList];
      data[i].completed = target.checked;
      setTodoList(data)
    }, [ todoList ]
  );

  const handleDelete = useCallback(
    (i) => (e) => {
      let data = [...todoList];
      delete todoList[i];
      data = todoList.filter(Boolean);
      setTodoList(data)
    }, [ todoList ]
  );

  const handleContentOnFocus = (e) => {
    // console.log('blur', e.target.closest('.task-title'))
    e.target.closest('.task-title').setAttribute('contentEditable',true)
  };
  const handleContentOnBlur = (e) => {
    // console.log('blur', e.target.closest('.task-title'))
    e.target.closest('.task-title').removeAttribute('contentEditable')
  };

  const handleEdit = useCallback(
    (i) => (e) => {

      console.log(i)
      // setTodoList(data)
    // }, [ todoList ]
    }, [ ]
  );

  /*  */

/* 
[x] create-task
[] read-all
[] read-tasks
[] update-task
[x] update-all-done
[x] update-all-undone
[] delete-tasks
[x] delete-all
*/

  // const markAllDone = () => {
  //   const data = todoList.map(obj => ({ ...obj,completed:true }));
  //   setTodoList(data)
  // };

  // const markAllUndone = () => {
  //   const data = todoList.map(obj => ({ ...obj,completed:false }));
  //   setTodoList(data)
  // };

  // const deleteAll = () => {
  //   setTodoList( [] )
  // };

  // const test = (e) => console.log('object—');


  return (
    <>
      <main className="container">
        <div className="header">
          <h1>To-Do</h1>
          <p>React - Hooks</p>
        </div>
        
        <form 
          name="todo_form" 
          className="todo-form"
          onSubmit={ handleSubmit }
        >
          <div className="group">
            <input 
              type="text"
              name="task_inp"
              id="task-inp"
              className="task-inp"
              placeholder="Enter a Task"
              autoComplete="off"
              autoFocus
              value={ value }
              onChange={ handleValue }
            />
          </div>
         
          <div className="group group-2">
            <select 
              name="select_val" 
              id="select-val"
              className="select-val"
              value={ select }
              onChange={ handleSelect }
            >
              <option value="create-task">Add New Task</option>
              <option value="read-all">View All Tasks</option>
              <option value="read-tasks">Search For Tasks</option>
              <option value="update-task">Update A Task</option>
              <option value="update-all-done">Mark All Done</option>
              <option value="update-all-undone">Mark All Undone</option>
              <option value="delete-tasks">Delete Done Tasks</option>
              <option value="delete-all">Clear Todo List</option>
            </select>
            <input 
              type="submit" 
              name="submit_btn" 
              id="submit-btn"
              className="submit-btn select-btn"
              value="✢"
            />
          </div>
        </form>
        
        <section className="todo-list">
          {
            todoList.map((el,id) => (
              <div className="task-card" data-id={id} key={el.id}>
                <div className="task-check">
                  <input 
                    type="checkbox" 
                    name="check" 
                    id={ 'check-box'+id }
                    className="check-box"
                    checked={ el.completed }
                    onChange={ handleCheckBox(id) }
                  />
                  <label 
                    htmlFor={ 'check-box'+id } 
                    className="check-mark"
                  ></label>
                </div>
                {/* contentEditable */}
                <p 
                  className={ 
                    `task-title ${el.completed ? "task-completed" : ''}` 
                  } 
                  onClick={ handleContentOnFocus }
                  onBlur={ handleContentOnBlur }
                ><span>{ el.task }</span>
                </p>
                <div className="task-opts">
                  <button className="edit-btn" onClick={ handleEdit(id) }>✎</button>
                  <button className="delete-btn" onClick={ handleDelete(id) }>×</button>
                </div>
              </div>
            ))
          }
        </section>
      </main>
    </>
  );
};