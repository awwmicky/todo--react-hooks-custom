import React, { useCallback,useContext } from 'react'
import './TodoForm.css'
import { Context } from '../../assets/Context.js'



export default function TodoForm () {

  const {
    todoList,setTodoList,
    value,setValue,
    select,setSelect
  } = useContext(Context);

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
    }, [ 
      setTodoList,todoList,
      value,setValue
    ]
  );
  // const readAll = useCallback(() => {
  //   console.log('readAll');
  // }, []);
  // const readTasks = useCallback(() => {
  //   console.log('readTasks');
  // }, []);
  // const readAllDone = useCallback(() => {
  //   console.log('readAllDone');
  // }, []);
  // const readAllUndone = useCallback(() => {
  //   console.log('readAllUndone');
  // }, []);
  const updateAllDone = useCallback(
    () => {
      // console.log('updateAllDone')
      const data = todoList.map(obj => ({ ...obj,completed:true }));
      setTodoList(data)
    }, [ todoList,setTodoList ]
  );
  const updateAllUndone = useCallback(
    () => {
      // console.log('updateAllUndone')
      const data = todoList.map(obj => ({ ...obj,completed:false }));
      setTodoList(data)
    }, [ todoList,setTodoList ]
  );
  const deleteTasksDone = useCallback(
    () => {
      // console.log('deleteTasksDone');
      const data = todoList.filter(obj => obj.completed === false);
      setTodoList(data)
    }, [ todoList,setTodoList ]
  );
  const deleteAll = useCallback(
    () => {
      // console.log('deleteAll')
      setTodoList( [] )
      setSelect('create-task')
    }, [ setTodoList,setSelect ]
  );

  /*  */

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault()
      
      switch (select) {
        case 'create-task': createTask(); break;
        // case 'read-all': readAll(); break;
        // case 'read-tasks': readTasks(); break;
        // case 'read-all-done': readAllDone(); break;
        // case 'read-all-undone': readAllUndone(); break;
        case 'update-all-done': updateAllDone(); break;
        case 'update-all-undone': updateAllUndone(); break;
        case 'delete-tasks-done': deleteTasksDone(); break;
        case 'delete-all': deleteAll(); break;
        default: console.log('Unknown Error'); break;
      }
    
    }, [ 
      select, 
      createTask,
      // readAll,
      // readTasks,
      // readAllDone,
      // readAllUndone,
      updateAllDone,
      updateAllUndone,
      deleteTasksDone,
      deleteAll
    ]
  );

  const handleValue = useCallback(
    ({target}) => setValue(target.value), [ setValue ]
  );

  const handleSelect = useCallback(
    ({target}) => setSelect(target.value), [ setSelect ]
  );


  return (
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
          {/* <option value="read-all">View All Tasks</option> */}
          {/* <option value="read-tasks">Search For Tasks</option> */}
          {/* <option value="read-all-done">View All Completed</option> */}
          {/* <option value="read-all-undone">View All Incomplete</option> */}
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
  );
}