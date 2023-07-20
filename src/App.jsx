import React, { useState, useEffect } from "react";
import "./App.css";
const App = () => {
  const [form, setForm] = useState({});
  const [users, setUsers] = useState([]);

  const handleForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const responce = await fetch("http://localhost:3000/demo", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await responce.json();
    setUsers(data);
  };

  const getUsers = async () => {
    const responce = await fetch("http://localhost:3000/demo", {
      method: "GET",
    });
    const data = await responce.json();
    setUsers(data);
  };
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <span>UserName</span>
        <input type="text" name="username" onChange={handleForm} />
        <span>Password</span>
        <input type="text" name="password" onChange={handleForm} />
        <button type="submit">Submit</button>
      </form>
      <div>
        <ul>
        {Array.isArray(users) &&
            users.map((user) => (
              <li key={user._id}>
                {user.username},{user.password}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
