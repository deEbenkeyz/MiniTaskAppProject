import {Link} from "react-router-dom";

export default function Sidebar() {

  return (
    <>
      <div className="container-fluid min-vh-100">
        <div className="row g-0">
          <div className="col-md-12">
            <nav className="navbar bg-light">
              <div className="container-fluid">
                <span className="navbar-brand mb-0 h1">Navbar</span>
              </div>
            </nav>
            <ul className="nav flex-column">
              <li className="nav-item">
                <Link to="/dashboard" className="nav-link active">Dashboard</Link>
              </li>
              <li className="nav-item">
                <Link to="/tasks" className="nav-link">Tasks</Link>
              </li>
              <li className="nav-item">
                <Link to="/users" className="nav-link">Users</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
