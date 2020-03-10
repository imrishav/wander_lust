import React from "react";
import { UserList } from "../components/UserList";

export const Users = () => {
  const USERS = [
    {
      id: "u1",
      name: "Rishav Sinha",
      image:
        "https://images.unsplash.com/photo-1582759788793-81043d629dd5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=751&q=80",
      places: 3
    },
    {
      id: "u2",
      name: "Rahul Sinha",
      image:
        "https://images.unsplash.com/photo-1558980664-4d79c6e77b93?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
      places: 3
    }
  ];
  return (
    <div>
      <UserList items={USERS} />
    </div>
  );
};
