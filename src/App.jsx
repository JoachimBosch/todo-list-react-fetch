import { useState } from 'react'
import './index.css'

function App(props) {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyUp = (e) => {
    if (e.keyCode === 13 && inputValue.trim() !== '') {
      const newItem = { id: Date.now(), value: inputValue}
      setItems([...items, newItem]);
      setInputValue("");
    }
  };

  const handleDelete = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="wrapper">
      <div className="list">
      <div className="list-header">
        <h1>TODOS</h1>
      </div>
      <div className="input-area">
        <input className="inputItem" type="text" placeholder="What needs to be done?" value={inputValue} onChange={handleInput} onKeyUp={handleKeyUp}>
          </input>
      </div>
      <div className="item">
        <div>
          <ul>
          {items && items.length < 1
          ? 
          <li key="0">
          No current tasks, add a task and get to work.
          </li>
          : items.map((item) => (
              <li key={item.id} className="task-item">
                {item.value}
                <button className="delete-button" onClick={() => handleDelete(item.id)}>X</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="counter">
        {items.length === 1 ? '1 item left' : `${items.length} items left`}
        </div>
      </div>




      </div>
      <div className="page1"> </div>
      <div className="page2"> </div>
    </div>
  )
}

export default App
