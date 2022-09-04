import React, { useState } from "react";

export const User = ({
  id,
  name,
  username,
  email,
  phone,
  onEdit,
  onDelete,
}) => {
  const [isEdit, setIsEdit] = useState(false);

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleDelete = () => {
    onDelete(id);
  };

  const handleOnEditSubmit = (e) => {
    e.preventDefault();
    onEdit(
      id,
      e.target.name.value,
      e.target.username.value,
      e.target.email.value,
      e.target.phone.value
    );
    setIsEdit(!isEdit);
  };

  return (
    <div>
      {isEdit ? (
        <form className="user" onSubmit={handleOnEditSubmit}>
          <input placeholder="Name" name="name" defaultValue={name} />
          <input
            placeholder="Username"
            name="username"
            defaultValue={username}
          />
          <input placeholder="Email" name="email" defaultValue={email} />
          <input placeholder="Phone" name="phone" defaultValue={phone} />
          <button onSubmit={handleOnEditSubmit}>Save</button>
        </form>
      ) : (
        <div>
          <div className="user">
            <span>{name}</span>
            <span>{username}</span>
            <span>{email}</span>
            <span>{phone}</span>
            <div>
              <button onClick={handleEdit}>Edit</button>
              <button onClick={handleDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
