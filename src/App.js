import logo from './logo.svg';
import './App.css';
import { Fragment, useEffect, useState } from 'react';

function App() {

  const [users, setUsers] = useState([])
  const [payload, setPayload] = useState({
    title: '',
    body: ''
  })
  const getUser = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts').then((res)=> res.json())

    setUsers(response)
  }

  const handleChange = (name, value) => {
    setPayload({...payload, [name]:value})
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
    await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify(payload)
    })
    } catch(err) {
      console.warn(err)
    }
  }

  useEffect(()=> {
    getUser()
  },[])

  return (
    <div>
      <div>
        <form onSubmit={onSubmit}>
          <label id="title">Title</label>
            <input id='title' onChange={(e) => handleChange('title', e.target.value)}></input>
          <label id="title">Body</label>
            <input id='title' onChange={(e) => handleChange('body', e.target.value)}></input>
          <button type='submit'> submit</button>
        </form>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Description</th>
            </tr>
            </thead>
            { users.length > 0 ?
              users.map((data, idx) => {
                return (
                  <tbody key={idx}>

                  <tr >
                    <td scope="row">{idx+1}</td>
                    <td>{data.title}</td>
                    <td>{data.body}</td>
                  </tr>
                 </tbody>

                )
              }) : <div></div>
            }
        </table>
        </div>
    </div>
  );
}

export default App;
