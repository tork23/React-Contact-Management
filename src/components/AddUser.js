import React from "react";

// Passing onAdd function to component via props
export const AddUser = ({ onAdd }) => {
  const handleOnSubmit = (e) => {
    e.preventDefault();
    onAdd(
      e.target.name.value,
      e.target.username.value,
      e.target.email.value,
      e.target.phone.value
    );
    // After submit, clear the fields of form
    e.target.name.value = "";
    e.target.username.value = "";
    e.target.email.value = "";
    e.target.phone.value = "";
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <h3>Add Contact</h3>
      <input placeholder="Name" name="name" />
      <input placeholder="Username" name="username" />
      <input placeholder="Email" name="email" />
      <input placeholder="Phone" name="phone" />
      <button onSubmit={handleOnSubmit}>Add</button>
      <hr />
    </form>
  );
};
