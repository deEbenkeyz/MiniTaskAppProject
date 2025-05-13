import {useEffect} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import {Link} from "react-router-dom";
import AppLogo from "../assets/app_logo.webp";

export default function Navbar(userInfo) {

  const {setUser, setToken} = useStateContext();
  const onLogout = (event) => {
    event.preventDefault();

    axiosClient.post(userInfo.logoutPath).then(() => {
      setUser({})
      setToken(null)
    })

  }


  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/"><img className={`brand-logo`} src={AppLogo}/>{import.meta.env.VITE_APP_NAME}</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                  aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard">Dashboard</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/tasks">Tasks</Link>
              </li>
            </ul>
            <div className="d-flex text-light">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link disabled">{userInfo.name}</a>
                </li>
                <li className="nav-item">
                  <a href={`#`} onClick={onLogout} className="nav-link">Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
