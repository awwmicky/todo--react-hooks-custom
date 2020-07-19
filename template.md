```jsx
<div className="task-card" data-id="10" key="12">
    <div className="task-check">
        <input 
            type="checkbox" 
            name="check" 
            id="check-box-10"
            className="check-box"
            checked
        />
        <label 
            htmlFor="check-box-10" 
            className="check-mark"
        ></label>
    </div>
    <p className="task-title task-completed" contentEditable>
        <span>this is a task to do now</span>
    </p>
    <div className="task-opts">
        <button className="edit-btn">✎</button>
        <button className="delete-btn">×</button>
    </div>
</div>
```

```css
.task-card {}
.task-check {}
.check-box {} /* input */
.check-mark {} /* label */
.task-title {}
.task-opts > button {}
/*  */
.task-completed { 
    text-decoration: line-through; 
    text-decoration-color: rgba(0,0,0,0.45);
}
```

```json
[
    {
        "id": 10,
        "task": "do something",
        "completed": false
    }
]
```