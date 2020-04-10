import React, { useEffect, useState } from "react";

import { UserList } from "../components/UserList";
import ErrorModal from "../../shared/UIElements/ErrorModal.js";
import LoadingSpinner from "../../shared/UIElements/LoadingSpinner.js";
import { useHttp } from "../../shared/hooks/http-hook";

export const Users = () => {
  const [loadedUsers, setLoadedUsers] = useState();

  const { isLoading, sendRequest, error, clearError } = useHttp();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:3001/api/users/"
        );

        setLoadedUsers(responseData.users);
      } catch (error) {}
    };
    fetchUsers();
    console.log("dad", loadedUsers);
  }, [sendRequest]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedUsers && <UserList items={loadedUsers} />}
    </React.Fragment>
  );
};
