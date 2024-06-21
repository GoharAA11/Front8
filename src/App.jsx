import { useEffect, useState } from 'react'
import './App.css'
import { AddUser } from './components/AddUser'
import { UserList } from './components/UserList'
import axios from 'axios'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [users, setUsers] = useState([])
  useEffect(() => {
    axios
      .get("http://localhost:3004/users")
      .then(res => {
        setUsers(res.data)
      })
  }, [])
  const addItem = obj => setUsers([...users, obj])

  const deleteUser = id => {
    axios
      .delete(`http://localhost:3004/users/${id}`)
      .then(res => {
        setUsers(users.filter(user => user.id !== id))
        toast.success("User deleted successfully")
      })

  }


  const salaryUp = id => {
    const user = users.find(user => user.id === id)
    if (user) {
      const updatedUser = { ...user, salary: Number(user.salary) + 50000 }

      axios
        .put(`http://localhost:3004/users/${id}`, updatedUser)
        .then(res => {
          setUsers(users.map(user => user.id === id ? res.data : user))
          toast.success("Salary increased to 50,000")
        })
    }
  }




  return (
    <div className='row'>
      <AddUser
        onAdd={addItem}
      />
      <UserList
        users={users} onDelete={deleteUser} onSalaryUp={salaryUp}
      />
      <ToastContainer

      />
    </div>
  )
}

export default App
