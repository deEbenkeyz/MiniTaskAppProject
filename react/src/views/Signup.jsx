import {Link} from "react-router-dom";
import {useRef, useState} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import AppLogo from "../assets/app_logo.webp";

export default function Signup() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const { setUser, setToken} = useStateContext();
  const [errors, setErrors] = useState({});


  const onSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    }

    axiosClient.post('/signup', payload)
      .then(({data}) => {
        console.log('Signup response:', data);
        setUser(data.user);
        setToken(data.token);
      }).catch(err => {
        console.log(err);

        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      });
  }


  return (
    <>
      <title>{`${import.meta.env.VITE_APP_NAME} - Sign Up `}</title>
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
                  <h5 className="card-title mb-3 text-center">Sign Up for Free</h5>
                  <form onSubmit={onSubmit} >
                    <div className="mb-4">
                      <input ref={nameRef} type="text" className={`form-control form-control-lg ${errors.name ? 'is-invalid' : ''}`}
                             placeholder="Full Name"/>
                      {errors.name && <div className="invalid-feedback">{errors.name[0]}</div>}
                    </div>
                    <div className="mb-4">
                      <input ref={emailRef} type="email" className={`form-control form-control-lg ${errors.email ? 'is-invalid' : ''}`}
                             placeholder="Email address"/>
                      {errors.email && <div className="invalid-feedback">{errors.email[0]}</div>}
                    </div>
                    <div className="mb-4">
                      <input ref={passwordRef} type="password" className={`form-control form-control-lg ${errors.password ? 'is-invalid' : ''}`}
                             placeholder="Password"/>
                      {errors.password && <div className="invalid-feedback">{errors.password[0]}</div>}
                    </div>
                    <div className="mb-4">
                      <input ref={passwordConfirmationRef} type="password" className="form-control form-control-lg"
                             placeholder="Password Confirmation"/>
                    </div>
                    <div className="d-grid gap-2 mb-3">
                      <button type="submit" className="btn btn-primary btn-lg">Sign Up</button>
                    </div>

                    <p className="fs-6 text-center">
                      Have an account already? <Link to="/login" className="text-decoration-none">Login</Link>
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
