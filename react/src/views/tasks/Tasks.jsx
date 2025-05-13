import {useEffect, useState} from "react";
import {get} from "lodash";
import axiosClient from "../../axios-client.js";
import {Link} from "react-router-dom";
import {useStateContext} from "../../contexts/ContextProvider.jsx";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const {setNotification} = useStateContext();

  useEffect(() => {
    getTasks()
  }, []);

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

  function onDelete(taskToDelete) {
    if (!window.confirm("Are you sure?")) {
      return;
    } else {
      axiosClient.delete(`/tasks/${taskToDelete.id}`)
        .then(() => {
          //TODO Show Notification
          setNotification("Task was successfully deleted");
          getTasks();
        })
    }

  }

  return (
    <>
      <title>{`${import.meta.env.VITE_APP_NAME} - Tasks `}</title>
      <div className="card-header d-flex justify-content-between align-items-center py-3">
        <h4 className={`h3 mb-0`}>All Tasks</h4>
        <Link to={`/tasks/new`} className={`btn btn-primary`}>Add New Task</Link>
      </div>
      <div className="card">
        <div className="card-body">
          <table className="table table-striped">
            <thead className="bg-primary">
            <tr className=" text-light">
              <th scope="col">#</th>
              <th scope="col" className={`col-5`}>Task</th>
              <th scope="col">Due Date</th>
              <th scope="col">Status</th>
              <th scope="col">Created At</th>
              <th scope="col">Actions</th>
            </tr>
            </thead>
            {/*Start: loading section*/}
            {loading &&
              <tbody>
              <tr>
                <td colSpan={6} className={`text-center text-muted`}>Loading...</td>
              </tr>
              </tbody>
            }

            {/*End: loading section*/}


            {!loading &&
              <tbody>
              {tasks <= 0 &&
                <tr>
                  <td colSpan={6} className={`text-center text-muted`}>No tasks available</td>
                </tr>
              }
              {tasks.map((task) => (
                <tr key={task.id} className={`align-middle`}>
                  <td>{task.id}</td>
                  <td>
                    <h6 className={`h6`}> {task.task_title}</h6>
                    <p className={`lines small text-muted`}>{task.task_description}</p>
                  </td>
                  <td>{task.task_due_date}</td>
                  <td>{task.task_status}</td>
                  <td>{task.created_at}</td>
                  <td>
                    <div className="btn-group" role="group" aria-label="Basic example">
                      <Link to={`/tasks/${task.id}`} className={`btn btn-info`}><i className="bi bi-pencil"></i></Link>
                      <button onClick={(event) => onDelete(task)} className={`btn btn-danger`}>
                        <i className="bi bi-trash3-fill"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              </tbody>
            }
          </table>

        </div>
      </div>

    </>
  )
}
