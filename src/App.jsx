import { useState, useEffect } from 'react'
import './index.css';

function App() {
	const [task, setTask] = useState("");
	const [list, setList] = useState([]);

  async function fetchTasks() {
    try {
      const response = await fetch('https://playground.4geeks.com/todo/users/joachimbosch')
      const apiList = await response.json();
      /* console.log(apiList.todos); */
      setList(apiList.todos);
    }
    catch (error) {
      console.error('Error fetching tasklist:', error)
    }
  };

  useEffect(() => {
    fetchTasks()
  }, []);

	const addTask = async (e) => {
    if(e.key === 'Enter' && task.trim() !== "") {
      const addTaskToAPI = await fetch ("https://playground.4geeks.com/todo/todos/joachimbosch", {
        method: 'POST',
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({label: task, is_done: false})
      });
      
      fetchTasks();
      setTask("");
      console.log(list)
      }
  };

  const deleteTask = async (index) => {
    let deleteTaskAPI = await fetch(`https://playground.4geeks.com/todo/todos/${list[index].id}`, {
      method: "DELETE"
    });
    fetchTasks()
  };

  const deleteAll = async () => {
    const deleteAll = list.map(item => fetch(`https://playground.4geeks.com/todo/todos/${item.id}`, {
      method: "DELETE"
    })
  );

  await Promise.all(deleteAll);
  setList([]);
  }
 

  return (
    <div className="wrapper">
      <div className="list">
      <div className="list-header">
        <h1>Daily tasks:</h1>
      </div>
      <div className="input-area">
        <input className="inputItem" type="text" placeholder="What needs to be done?" value={task} onChange={(e) => setTask(e.target.value)} onKeyUp={addTask}>
          </input>
      </div>
      <div className="item">
        <div>
          <ul>
          {list && list.length < 1
          ? 
          <li key="0">
          No current tasks, are you lazy or bored?
          </li>
          : list.map((item, index) => (
              <li key={index} className="task-item">
                {index + 1}. {item.label}
                <button className="delete-button" onClick={() => deleteTask(index)}>X</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="counter">
        {list.length === 1 ? '1 item left' : `${list.length} items left`}
        </div>
      </div>
        <button className="deleteAll" onClick={() => deleteAll()}>Delete all tasks</button>



      </div>
      <div className="page1"> </div>
      <div className="page2"> </div>
    </div>
  )};


export default App