import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import axiosClient from "../../axios-client.js";
import {useStateContext} from "../../contexts/ContextProvider.jsx";

export default function CreateTask() {

  const {id} = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {setNotification} = useStateContext();

  const [errors, setErrors] = useState({});

  const [task, setTask] = useState({
    id: null, task_title: "", task_description: "", task_due_date: "", task_status: "",
  });

  if (id) {
    useEffect(() => {
      setLoading(true);
      axiosClient.get(`/tasks/${id}`)
        .then(({data}) => {
          setLoading(false);
          setTask(data);
        }).catch(() => {
        setLoading(false);
      })
    }, [])
  }

  const onCreateTask = (e) => {
    e.preventDefault();
    if (task.id) {
      axiosClient.put(`/tasks/${id}`, task)
        .then(() => {
          //To do show Notification
          setNotification("Task was successfully updated");
          navigate("/tasks");
        }).catch(err => {
        console.log(err);

        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      });
    } else {
      axiosClient.post(`/tasks`, task)
        .then(() => {
          //To do show Notification
          setNotification("Task was successfully created");
          navigate("/tasks");
        }).catch(err => {
        console.log(err);

        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      });
    }
  }


  return (
    <>
      <title>{`${import.meta.env.VITE_APP_NAME} - Create Tasks `}</title>
    <div className="d-flex justify-content-between align-items-center py-3">
      {task.id && <h4 className={`h3 mb-0`}>Update Task: {task.task_title}</h4>}
      {!task.id && <h4 className={`h3 mb-0`}>Create new task</h4>}
    </div>

    <div className="row">
      <div className="col-6">

        <div className="card">
          <div className="card-body p-4">
            {loading && (<div className={`text-center text-muted`}>Loading...</div>)}

            {!loading && (<form onSubmit={onCreateTask}>
              <div className="mb-4">

                <label className="form-label fw-bold small">Task Title</label>
                <input onChange={(ev) => setTask({...task, task_title: ev.target.value})} value={task.task_title}
                       type="text"
                       className={`form-control form-control-lg ${errors.task_title ? 'is-invalid' : ''}`}
                       placeholder="Task Title" required/>
                {errors.task_title && <div className="invalid-feedback">{errors.task_title[0]}</div>}
              </div>
              <div className="mb-4">
                <label className="form-label fw-bold small">Description</label>
                <textarea onChange={(ev) => setTask({...task, task_description: ev.target.value})} rows={6}
                          className={`form-control form-control-lg ${errors.task_description ? 'is-invalid' : ''}`}
                          placeholder="Enter Task Description" value={task.task_description}></textarea>
                {errors.task_description && <div className="invalid-feedback">{errors.task_description[0]}</div>}
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-4">
                    <label className="form-label fw-bold small">Due Date</label>
                    <input onChange={(ev) => setTask({...task, task_due_date: ev.target.value})}
                           value={task.task_due_date} type={"date"}
                           className={`form-control form-control-lg ${errors.task_due_date ? 'is-invalid' : ''}`}
                           placeholder="Due Date"/>
                    {errors.task_due_date && <div className="invalid-feedback">{errors.task_due_date[0]}</div>}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-4">
                    <label className="form-label fw-bold small">Status</label>
                    <select onChange={(ev) => setTask({...task, task_status: ev.target.value})}
                            className={`form-select form-select-lg ${errors.task_status ? 'is-invalid' : ''}`}
                            value={task.task_status} required={true}>
                      {task.task_status}
                      <option>Select Task Status</option>
                      <option>To do</option>
                      <option>Pending</option>
                      <option>Completed</option>
                      <option>Cancelled</option>
                    </select>
                    {errors.task_status && <div className="invalid-feedback">{errors.task_status[0]}</div>}
                  </div>
                </div>
              </div>

              <div className="d-grid gap-2 mb-3">
                <button type="submit"
                        className="btn btn-primary btn-lg">{task.id && "Update Task"}{!task.id && "Create Task"}</button>
              </div>
            </form>)}
          </div>
        </div>
      </div>
    </div>
  </>)
}
