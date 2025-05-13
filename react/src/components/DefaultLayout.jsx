import {Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import Navbar from "../Layouts/Navbar.jsx";
import {useEffect} from "react";
import axiosClient from "../axios-client.js";
import {Bounce, toast, ToastContainer} from "react-toastify";

export default function DefaultLayout() {
  const {user, token, notification, setUser} = useStateContext();


  useEffect(() => {
    if (notification) {
      notify()
    }
    axiosClient.get('/user')
      .then(({data}) => {
        setUser(data);
      })
  }, [notification]);

  if (!token) {
    return <Navigate to="/login"/>
  }
  const notify = () => toast.success(notification);

  return (
    <>
      <div id="defaultLayout">
        <div className="container-fluid p-0">
          <div className="row g-0">
            {/*<div className="col-md-2">*/}
            {/*  <aside className="p-3 bg-light flex-shrink-0">*/}
            {/*    <Sidebar/>*/}
            {/*  </aside>*/}
            {/*</div>*/}
            <div className="content">
              <div className="col-md-12">
                <header className="header">
                  <Navbar name={user?.name} logoutPath={`/logout`}/>
                </header>
              </div>
              <main className="container">
                <div className="row py-4">
                  <div className="col-md-12">
                    <Outlet/>
                  </div>
                </div>
                <ToastContainer/>
              </main>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
