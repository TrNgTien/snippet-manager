import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import environment from "../util/environment";
const UserContext = createContext();

function UserContextProvider(props) {
  const [user, setUser] = useState(undefined);
  async function getUser() {
    const userRes = await axios.get(`${environment}/auth/loggedIn`);
    setUser(userRes.data);
  }
  useEffect(() => {
    getUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, getUser }}>
      {props.children}
    </UserContext.Provider>
  );
}
export default UserContext;
export { UserContextProvider };
