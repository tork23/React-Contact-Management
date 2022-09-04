import React, { useEffect, useState } from "react";
import { User } from "./components/User";
import { AddUser } from "./components/AddUser";
import "./styles.css";

export default function App() {
  const [users, setUsers] = useState([]);

  // Fetch data from API on every render
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.log(error));
  };
  // Function to add contact
  const onAdd = async (name, username, email, phone) => {
    await fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      body: JSON.stringify({
        name: name,
        username: username,
        email: email,
        phone: phone,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (response.status !== 201) {
          return;
        } else {
          return response.json();
        }
      })
      .then((data) => {
        setUsers((users) => [...users, data]);
      })
      .catch((error) => console.log(error));
  };

  // Function to Edit contact details
  const onEdit = async (id, name, username, email, phone) => {
    await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        name: name,
        username: username,
        email: email,
        phone: phone,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (response.status !== 200) {
          return;
        } else {
          return response.json();
        }
      })
      .then((data) => {
        // Map over Users to check which user we want to Edit
        // by matching id's
        const updatedUsers = users.map((user) => {
          if (user.id === id) {
            user.name = name;
            user.username = username;
            user.email = email;
            user.phone = phone;
          }
          return user;
        });

        setUsers((users) => updatedUsers);
      })
      .catch((error) => console.log(error));
  };

  // Function to Delete contact
  const onDelete = async (id) => {
    await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status !== 200) {
          return;
        } else {
          // Filter all users where id doesn't match with clicked contact's id
          setUsers(
            users.filter((user) => {
              return user.id !== id;
            })
          );
        }
      })
      .catch((error) => console.log(error));
  };

  // Render components
  return (
    <div className="App">
      <h1>My Contacts</h1>

      <AddUser onAdd={onAdd} />

      {users.map((user) => (
        <User
          id={user.id}
          key={user.id}
          name={user.name}
          username={user.username}
          email={user.email}
          phone={user.phone}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
