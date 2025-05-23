import {createContext, useContext, useState} from "react";

const StateContext = createContext({
  user: null,
  token: null,
  notification:null,
  setUser: () => {},
  setToken: () => {},
  setNotification: () => {}
})

export const ContextProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [notification, _setNotification] = useState('');
  const storedToken = localStorage.getItem("ACCESS_TOKEN");
  const [token, _setToken] = useState(storedToken !== "null" ? storedToken : null);

  const setNotification = (message) => {
    _setNotification(message);
    setTimeout(()=>{
      _setNotification('');
    },9000);
  }

  const setToken = (token) => {
    _setToken(token);
    if (token) {
      localStorage.setItem("ACCESS_TOKEN", token);
    } else {
      localStorage.removeItem("ACCESS_TOKEN");
    }
  }

  return (
    <StateContext.Provider value={{user, token, setUser, setToken, notification, setNotification}}>
      {children}
    </StateContext.Provider>
  )
}


export const useStateContext = () => useContext(StateContext)
