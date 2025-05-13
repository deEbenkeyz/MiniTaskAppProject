import {useEffect, useState} from "react";
import axiosClient from "../../axios-client.js";
import {Link} from "react-router-dom";
import {useStateContext} from "../../contexts/ContextProvider.jsx";

export default function Users() {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const {setNotification} = useStateContext();

  useEffect(() => {
    getUsers();
  }, [])

  const getUsers = () => {
    setLoading(true);
    axiosClient.get("/users")
      .then(({data}) => {
        setLoading(false);
        setUsers(data.data);
        console.log(data);
      }).catch(() => {
        setLoading(false)
      }
    )
  }

  const onDelete = (userToDelete) => {
    if (!window.confirm("Are you sure?")) {
      return;
    } else {
      axiosClient.delete(`/users/${userToDelete.id}`)
        .then(() => {
          //TODO Show Notification
          setNotification("User was successfully deleted");
          getUsers();
        })
    }

  }

  return (
    <>
      <title>{`${import.meta.env.VITE_APP_NAME} - Users `}</title>

      <div className="d-flex justify-content-between align-items-center py-3">
        <h4 className={`h3 mb-0`}>All Users</h4>
        <Link to={`/users/new`} className={`btn btn-primary`}>Add New User</Link>
      </div>
      <div className="card">
        <div className="card-body">
          <table className="table table-striped">
            <thead className="bg-primary">
            <tr className=" text-light">
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Created At</th>
              <th scope="col">Actions</th>
            </tr>
            </thead>

            {/*Start: loading section*/}
            {loading &&
              <tbody>
              <tr>
                <td colSpan={5} className={`text-center text-muted`}>Loading...</td>
              </tr>
              </tbody>
            }
            {/*End: loading section*/}

            {!loading &&
              <tbody>
              {users.map((user) => (
                <tr key={user.id} className={`align-middle`}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.created_at}</td>
                  <td>
                    <div className="btn-group" role="group" aria-label="Basic example">
                    <Link to={`/users/${user.id}`} className={`btn btn-info`}><i className="bi bi-pencil"></i></Link>
                    <button onClick={(event) => onDelete(user)} className={`btn btn-danger`}>
                      <i className="bi bi-trash3-fill"></i>
                    </button>
                    </div>
                  </td>
                </tr>))}
              </tbody>
            }
          </table>
        </div>
      </div>
    </>
  )
}
