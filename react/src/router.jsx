import {createBrowserRouter, Navigate} from "react-router-dom";
import Login from "./views/Login.jsx";
import Signup from "./views/Signup.jsx";

import Users from "./views/users/Users.jsx";
import CreateUser from "./views/users/CreateUser.jsx";

import Tasks from "./views/tasks/Tasks.jsx";
import CreateTask from "./views/tasks/CreateTask.jsx";
import NotFound from "./views/NotFound.jsx";

import DefaultLayout from "./components/DefaultLayout.jsx";
import GuestLayout from "./components/GuestLayout.jsx";

import Dashboard from "./views/Dashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout/>,
    children: [
      {
        path: '/',
        element: (<ProtectedRoute><Navigate to="/dashboard"/></ProtectedRoute>)
      },
      {
        path: "/dashboard",
        element: (<ProtectedRoute><Dashboard/></ProtectedRoute>),
      },
      {
        path: "/users",
        element: (<ProtectedRoute><Users/></ProtectedRoute>),
      },
      {
        path: "/users/new",
        element: (<ProtectedRoute><CreateUser key="userCreate"/></ProtectedRoute>),
      },
      {
        path: "/users/:id",
        element: (<ProtectedRoute><CreateUser key="userUpdate"/></ProtectedRoute>),
      },
      {
        path: "/tasks",
        element: (<ProtectedRoute><Tasks/></ProtectedRoute>),
      },
      {
        path: "/tasks/new",
        element: (<ProtectedRoute><CreateTask key="taskCreate"/></ProtectedRoute>),
      },
      {
        path: "/tasks/:id",
        element: (<ProtectedRoute><CreateTask key="taskUpdate"/></ProtectedRoute>),
      },
    ]
  },
  {
    path: "/",
    element: <GuestLayout/>,
    children: [
      {
        path: "/login",
        element: <Login/>,
      }, {
        path: "/signup",
        element: <Signup/>,
      }
    ]
  },

  {
    path: "*",
    element: <NotFound/>,
  },
]);

export default router
