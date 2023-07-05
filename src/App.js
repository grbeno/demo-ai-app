import React, {useState, useEffect} from 'react';
import axiosInstance from './axios';


export default function App() {
  
  // states
  const [todos, setTodos] = useState([]);

  // axios call
  const getTodos = () => {
    axiosInstance.get('/api/').then(res => {
      setTodos(res.data);
    })
    .catch(err => {
      console.log(err);
    });
  }

  // call getTodos on component mount
  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className='container'>
      <hr />
      {todos.map(item => (
        <div key={item.id} style={{paddingLeft: '1%'}}>
          <h4>{item.title}</h4>
          <p>{item.body}</p>
          <hr />
        </div>
      ))}
    </div>        
  );
}

