import React, { useState,useCallback } from 'react'
import './assets/App.css'


export default () => {

  const [ todoList,setTodoList ] = useState([]);
  // const [ tempList,setTempList ] = useState([]);
  const [ value,setValue ] = useState("");
  const [ select,setSelect ] = useState("create-task");

/* 
[×] create-task
[] read-all
[] read-tasks

[] read-all-done
[] read-all-undone

[×] update-all-done
[×] update-all-undone
[×] delete-tasks-done
[×] delete-all
*/

  const createTask = useCallback(
    () => {
      // console.log('createTask')
      if (!value.trim()) return;

      setTodoList([
        ...todoList,
        {
          id: Date.now(),
          task: value.trim(),
          completed: false
        }
      ])
      setValue("")
    }, [ todoList,value ]
  );
  const readAll = useCallback(() => {
    console.log('readAll');
  }, []);
  const readTasks = useCallback(() => {
    console.log('readTasks');
  }, []);
  const updateAllDone = useCallback(
    () => {
      // console.log('updateAllDone')
      const data = todoList.map(obj => ({ ...obj,completed:true }));
      setTodoList(data)
    }, [ todoList ]
  );
  const updateAllUndone = useCallback(
    () => {
      // console.log('updateAllUndone')
      const data = todoList.map(obj => ({ ...obj,completed:false }));
      setTodoList(data)
    }, [ todoList ]
  );
  const deleteTasksDone = useCallback(
    () => {
      // console.log('deleteTasksDone');
      const data = todoList.filter(obj => obj.completed === false);
      setTodoList(data)
    }, [ todoList ]
  );
  const deleteAll = useCallback(
    () => {
      console.log('deleteAll')
      setTodoList( [] )
    }, []
  );

  /*  */

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault()
      
      switch (select) {
        case 'create-task': createTask(); break;
        case 'read-all': readAll(); break;
        case 'read-tasks': readTasks(); break;
        case 'update-all-done': updateAllDone(); break;
        case 'update-all-undone': updateAllUndone(); break;
        case 'delete-tasks-done': deleteTasksDone(); break;
        case 'delete-all': deleteAll(); break;
        default: console.log('Unknown Error'); break;
      }
    
    }, [ 
      select, 
      createTask,
      readAll,
      readTasks,
      updateAllDone,
      updateAllUndone,
      deleteTasksDone,
      deleteAll
    ]
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
      const card = e.target.parentElement.parentElement;
      const text = card.querySelector('.task-title').textContent;
      let data = [ ...todoList ];
      data[i].task = text;
      setTodoList(data)
    }, [ todoList ]
  );



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
              <option value="update-all-done">Mark All Done</option>
              <option value="update-all-undone">Mark All Undone</option>
              <option value="delete-tasks-done">Delete Done Tasks</option>
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