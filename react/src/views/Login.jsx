import {Link} from "react-router-dom";
import {useRef, useState} from "react";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import axiosClient from "../axios-client.js";
import AppLogo from "../assets/app_logo.webp";

export default function Login() {

  const emailRef = useRef();
  const passwordRef = useRef();
  const {setUser, setToken} = useStateContext();
  const [errors, setErrors] = useState({});



  const onSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }

    axiosClient.post('/login', payload)
      .then(({data}) => {
        console.log('Sign in response:', data);
        setUser(data.user);
        setToken(data.token);
      }).catch(err => {
      const response = err.response;
      if (response && response.status === 422) {
        if (response.data.errors) {
          console.log(response.data.errors);
          setErrors(response.data.errors);
        } else {
          setErrors({email: response.data.message});
        }
      }
    });

  }

  return (
    <>
      <title>{`${import.meta.env.VITE_APP_NAME} - Login `}</title>
      <div className="container">
        <div className="row">
          <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="col-md-4">
              <div className="card">
                <div className="card-body p-5">
                  <div className={`text-center mb-4`}>
                    <img src={AppLogo} className={`app-logo mb-3`} alt={'App Logo'}/>
                    <h4 className={`text-uppercase`}>{`${import.meta.env.VITE_APP_NAME}`}</h4>
                  </div>
                  <h5 className="card-title mb-3 text-center">Login</h5>
                  <form onSubmit={onSubmit}>
                    <div className="mb-4">
                      <input type="email" ref={emailRef}
                             className={`form-control form-control-lg ${errors.email ? 'is-invalid' : ''}`}
                             placeholder="Email address" autoComplete="email"/>
                      {errors.email && <div className="invalid-feedback">{errors.email[0]}</div>}
                    </div>
                    <div className="mb-4">
                      <input type="password" ref={passwordRef}
                             className={`form-control form-control-lg ${errors.password ? 'is-invalid' : ''}`}
                             placeholder="Password" autoComplete={passwordRef}/>
                      {errors.password && <div className="invalid-feedback">{errors.password[0]}</div>}
                    </div>
                    <div className="d-grid gap-2 mb-3">
                      <button type="submit" className="btn btn-primary btn-lg">Login</button>
                    </div>

                    <p className="fs-6 text-center">
                      Not Registered? <Link to="/signup" className="text-decoration-none">Create an account</Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
