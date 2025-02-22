import React, { createContext, useState } from 'react';

const UserRoleContext = createContext();

const Context = ({ children }) => {
  const [isLogin, setisLogin] = useState(false);
  const [open, setOpenBox] = useState(false);
  const [loginUser, setLoginUser] = useState(false);

  const login = () => {
    setisLogin(true);
  };

  const logout = () => {
    setisLogin(false);
    setLoginUser({
      name : '',
      email : '',
      type: ''
    })
   
  };

  const addUsertype = (type) => {
    setUsertype(type)
  }

  const contextValue = {
    isLogin,
    login,
    logout,
    addUsertype,
    open,
    setOpenBox,
    loginUser,
     setLoginUser
  };

  return (
    <UserRoleContext.Provider value={contextValue}>
      {children}
    </UserRoleContext.Provider>
  );
};

export default Context;
export { UserRoleContext };
