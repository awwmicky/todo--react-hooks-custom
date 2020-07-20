import React, { useCallback,useContext } from 'react'
import { Context } from '../../assets/Context.js'



export default function Task ({ el,id }) {

  const { todoList,setTodoList } = useContext(Context);



  const handleCheckBox = useCallback(
    (i) => ({target}) => {
      let data = [ ...todoList ];
      data[i].completed = target.checked;
      setTodoList(data)
    }, [ todoList,setTodoList ]
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
    }, [ todoList,setTodoList ]
  );

  const handleDelete = useCallback(
    (i) => (e) => {
      let data = [ ...todoList ];
      delete todoList[i];
      data = todoList.filter(Boolean);
      setTodoList(data)
    }, [ todoList,setTodoList ]
  );


  // key={key}
  return (
    <div className="task-card" data-id={id}>
      <div className="task-check">
        <input 
          type="checkbox" 
          name="check" 
          id={ 'check-box-'+id }
          className="check-box"
          checked={ el.completed }
          onChange={ handleCheckBox(id) }
        />
        <label 
          htmlFor={ 'check-box-'+id } 
          className="check-mark"
        ></label>
      </div>
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
  );
}