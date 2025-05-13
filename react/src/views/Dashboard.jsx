import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";

export default function Dashboard() {

  const [user, setUser] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const getTasks = () => {
    setLoading(true)
    axiosClient.get(`/tasks`)
      .then(({data}) => {
        setLoading(false);
        setTasks(data.data);
        console.log(data);
      }).catch(() => {
      setLoading(false)
    })
  };

  useEffect(() => {
    getTasks();
    axiosClient.get('/user')
      .then(({data}) => {
        setUser(data);
      })
  }, []);

  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter(task => task.task_status.toLowerCase() === 'pending').length;
  const completedTasks = tasks.filter(task => task.task_status.toLowerCase() === 'completed').length;
  const toDoTasks = tasks.filter(task => task.task_status.toLowerCase() === 'to do').length;
  const cancelledTasks = tasks.filter(task => task.task_status.toLowerCase() === 'cancelled').length;

  return (
    <>
      <title>{`${import.meta.env.VITE_APP_NAME} - Dashboard `}</title>
      <div className="d-flex justify-content-between align-items-center py-3 mb-4">
        <div>
          <h4 className={`h3`}>Dashboard</h4>
          <p className={`text-muted`}>Welcome Back, {user?.name}</p>
        </div>
      </div>
      <div className="row ">
        <div className="col-md-4 mb-3">
          <Link to="/tasks" className={`text-decoration-none`}>
            <div className="card p-4">
              <div className="card-body text-center">
                <div className="mb-2">
                  <i className="bi bi-list-task display-5 text-secondary"></i>
                </div>
                <div>
                  <h5 className="display-4 fw-bold">{totalTasks}</h5>
                  <p className="small mb-2 text-muted text-uppercase text-wrap">All<br/>Tasks</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-md-2 mb-3">
          <Link to="/tasks" className={`text-decoration-none`}>
            <div className="card p-4">
              <div className="card-body text-center">
                <div className="mb-2">
                  <i className="bi bi-ui-checks display-5 text-secondary"></i>
                </div>
                <div>
                  <h5 className="display-4 fw-bold">{completedTasks}</h5>
                  <p className="small mb-2 text-muted text-uppercase ">Completed<br/>Tasks</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-md-2 mb-3">
          <Link to="/tasks" className={`text-decoration-none`}>
            <div className="card p-4">
              <div className="card-body text-center">
                <div className="mb-2">
                  <i className="bi bi-ui-checks-grid display-5 text-secondary"></i>
                </div>
                <div>
                  <h5 className="display-4 fw-bold">{pendingTasks}</h5>
                  <p className="small mb-2 text-muted text-uppercase ">Pending<br/>Tasks</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-md-2 mb-3">
          <Link to="/tasks" className={`text-decoration-none`}>
            <div className="card p-4">
              <div className="card-body text-center">
                <div className="mb-2">
                  <i className="bi bi-grid display-5 text-secondary"></i>
                </div>
                <div>
                  <h5 className="display-4 fw-bold">{toDoTasks}</h5>
                  <p className="small mb-2 text-muted text-uppercase ">Todo<br/>Tasks</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-md-2 mb-3">
          <Link to="/tasks" className={`text-decoration-none`}>
            <div className="card p-4">
              <div className="card-body text-center">
                <div className="mb-2">
                  <i className="bi bi-journal-x display-5 text-secondary"></i>
                </div>
                <div>
                  <h5 className="display-4 fw-bold">{cancelledTasks}</h5>
                  <p className="small mb-2 text-muted text-uppercase ">Cancelled<br/>Tasks</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  )
}
