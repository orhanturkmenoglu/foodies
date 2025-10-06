import React from 'react'

import "../Login/Login.css"
import { Link } from 'react-router-dom'

export const Login = () => {
  return (
   <div className="login-container">
    <div className="row">
      <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div className="card border-0 shadow rounded-3 my-5">
          <div className="card-body p-4 p-sm-5">
            <h5 className="card-title text-center mb-5 fw-light fs-5">Sign In</h5>
            <form>
              <div className="form-floating mb-3">
                <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"/>
                <label for="floatingInput">Email address</label>
              </div>
              <div className="form-floating mb-3">
                <input type="password" className="form-control" id="floatingPassword" placeholder="Password"/>
                <label for="floatingPassword">Password</label>
              </div>

              <div className="d-grid">
                <button className="btn btn-outline-primary btn-login text-uppercase fw-bold" type="submit">Sign
                  in</button>
              </div>
                <div className="d-grid">
                <button className="btn btn-outline-danger btn-login mt-2 text-uppercase fw-bold" type="submit">Reset
                  </button>
              </div>
              <div className='mt-4'>
                Don't have an account ? <Link to={"/register"}>Sign up</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}
