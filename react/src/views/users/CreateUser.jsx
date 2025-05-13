import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import axiosClient from "../../axios-client.js";
import {useStateContext} from "../../contexts/ContextProvider.jsx";

export default function CreateUser() {

  const {id} = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});
  const {setNotification} = useStateContext()

  const [user, setUser] = useState({
    id: null,
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  if (id) {
    useEffect(() => {
      setLoading(true);
      axiosClient.get(`/users/${id}`)
        .then(({data}) => {
          setLoading(false);
          setUser(data);
        }).catch(() => {
        setLoading(false);
      })
    }, [])
  }

  const onNewSubmit = (e) => {
    e.preventDefault();
    if (user.id) {
      axiosClient.put(`/users/${id}`, user)
        .then(() => {
          //To do show Notification
          setNotification("User was successfully updated");
          navigate("/users");
        }).catch(err => {
        console.log(err);

        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      })
    } else {
      axiosClient.post(`/users`, user)
        .then(() => {
          //To do show Notification
          setNotification("User was successfully created");
          navigate("/users");
        }).catch(err => {
        console.log(err);

        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      })
    }
  }


  return (
    <>
      <title>{`${import.meta.env.VITE_APP_NAME} - Create User `}</title>
      <div className="d-flex justify-content-between align-items-center py-3">
        {user.id && <h4 className={`h3 mb-0`}>Update user: {user.name}</h4>}
        {!user.id && <h4 className={`h3 mb-0`}>Create new user</h4>}
      </div>

      <div className="row">
        <div className="col-6">

          <div className="card">
            <div className="card-body p-5">
              {loading && (
                <div className={`text-center text-muted`}>Loading...</div>
              )}

              {!loading &&
                (
                  <form onSubmit={onNewSubmit}>
                    <div className="mb-4">
                      <input onChange={(ev) => setUser({...user, name: ev.target.value})} value={user.name}
                             type="text"
                             className={`form-control form-control-lg ${errors.name ? 'is-invalid' : ''}`}
                             placeholder="Full Name"/>
                      {errors.name && <div className="invalid-feedback">{errors.name[0]}</div>}
                    </div>
                    <div className="mb-4">
                      <input onChange={(ev) => setUser({...user, email: ev.target.value})} value={user.email}
                             type="email"
                             className={`form-control form-control-lg ${errors.email ? 'is-invalid' : ''}`}
                             placeholder="Email address"/>
                      {errors.email && <div className="invalid-feedback">{errors.email[0]}</div>}
                    </div>
                    <div className="mb-4">
                      <input onChange={(ev) => setUser({...user, password: ev.target.value})}
                             type="password"
                             className={`form-control form-control-lg ${errors.password ? 'is-invalid' : ''}`}
                             placeholder="Password"/>
                      {errors.password && <div className="invalid-feedback">{errors.password[0]}</div>}
                    </div>
                    <div className="mb-4">
                      <input onChange={(ev) => setUser({...user, password_confirmation: ev.target.value})}
                             type="password" className="form-control form-control-lg"
                             placeholder="Password Confirmation"/>
                    </div>
                    <div className="d-grid gap-2 mb-3">
                      <button type="submit" className="btn btn-primary btn-lg">Create new user</button>
                    </div>
                  </form>
                )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
