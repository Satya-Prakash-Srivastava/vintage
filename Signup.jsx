import { useFormik } from 'formik';
import { enqueueSnackbar } from 'notistack';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  name : Yup.string().required('Name is required').min(3, 'Too Short'),
  password: Yup.string().required('Password is required').min(6, 'Too Short')
  .matches(
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)/,
    'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character'
  )
});

const Signup = () => {

  const navigate = useNavigate();
  const [selimg, setSelimg] = useState('');

  // initialize formik
  const signupForm = useFormik({
    initialValues:{
      name : '',
      email: '',
      password: ''
    },

    onSubmit: async (values, {resetForm}) => { 
      values.avatar = selimg;
      console.log(values);
      
      const res = await fetch('http://localhost:5000/user/add', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type' : 'application/json'
        }
      });

      console.log(res.status);

      if(res.status === 200){
        resetForm();
        enqueueSnackbar('Registration Successful',{
          variant: 'success',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right'
          }
        });
        navigate('/login');
      }else{
        enqueueSnackbar('Something went wrong',{
          variant: 'error',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right'
          }
        })
      }
      
    },

    validationSchema: SignupSchema
  
  });

  const uploadFile = async (e) => {
    const file = e.target.files[0];
    const formdata = new FormData();
    setSelimg(file.name);

    formdata.append('myfile', file);

    const res = await fetch('http://localhost:5000/util/uploadfile', {
      method: 'POST',
      body: formdata
    });

    console.log(res.status);
    if(res.status === 200){
      toast.success('File uploaded successfully');
    }
  }

  return (
    <div className='vh-100 bg-body-secondary'>
      <div className='col-md-4 mx-auto py-5'>
          <div className="card">
            <div className="card-body">
              <h2 className='text-center my-5'>SIGNUP FORM</h2>
              <form onSubmit={signupForm.handleSubmit} >
                <label>Full Name</label>
                <span className='error-label'>{ signupForm.touched.name && signupForm.errors.name}</span>
                <input type="text" className="form-control mb-3" id='name' onChange={signupForm.handleChange} value={signupForm.values.name} />
                <label>Email</label>
                <input type="text" className="form-control mb-3" id="email" onChange={signupForm.handleChange} value={signupForm.values.email} />
                <label>Password</label>
                <span className='error-label'>{ signupForm.touched.password && signupForm.errors.password}</span>
                <input type="password" className="form-control mb-3" id='password' onChange={signupForm.handleChange} value={signupForm.values.password} />


                <button type='submit' className='btn btn-primary mt-3'>Submit</button>
              </form>
            </div>
          </div>
      </div>
    </div>
  )
}

export default Signup;