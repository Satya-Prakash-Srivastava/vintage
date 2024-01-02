import { useFormik } from 'formik';
import { enqueueSnackbar } from 'notistack';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import useAppContext from '../AppContext';


const Login = () => {

  const navigate = useNavigate();

  const { setLoggedIn } = useAppContext();

  // initialize formik
  const loginForm = useFormik({
    initialValues: {
      email: '',
      password: ''
    },

    onSubmit: async (values, { resetForm }) => {
      console.log(values);

      const res = await fetch('http://localhost:5000/user/authenticate', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (res.status === 200) {

        const data = await res.json();

        sessionStorage.setItem('user', JSON.stringify(data));
        setLoggedIn(true);

        enqueueSnackbar('Login Success', {
          variant: 'success',
          anchorOrigin: {
            horizontal: 'right',
            vertical: 'top'
          }
        })
      } else if (res.status === 401) {
        enqueueSnackbar('Email or Password is incorrect', {
          variant: 'error',
          anchorOrigin: {
            horizontal: 'right',
            vertical: 'top'
          }
        })
      } else {
        enqueueSnackbar('Something went wrong', {
          variant: 'error',
          anchorOrigin: {
            horizontal: 'right',
            vertical: 'top'
          }
        })
      }

    }

  })

  return (
    <div className='vh-100 bg-body-secondary'>
      <div className='col-md-4 mx-auto py-5'>
        <div className="card">
          <div className="card-body">
            <h2 className='text-center my-5'>Login FORM</h2>
            <form onSubmit={loginForm.handleSubmit} >

              <label>Email</label>
              <input type="text" className="form-control mb-3" id="email" onChange={loginForm.handleChange} value={loginForm.values.email} />
              <label>Password</label>

              <input type="password" className="form-control mb-3" id='password' onChange={loginForm.handleChange} value={loginForm.values.password} />

              <button type='submit' className='btn btn-primary mt-3'>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;