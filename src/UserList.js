import React from "react";

export function UserList(props) {
  return (
    <ul className="user-list">
      {props.users.map(x => (
        <li key={x.id} className={x.isConnected ? "" : "disconnected"}>
          <img src={x.avatarUrl} alt="" /> {x.name}
        </li>
      ))}
    </ul>
  );
}
