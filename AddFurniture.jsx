
import { useFormik } from 'formik';
import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
const furnitureSchema = Yup.object().shape({
  
});

const AddFurniture = () => {

  const navigate = useNavigate();
  const [selimg, setSelimg] = useState('');


  // initialize formik
  const furnitureForm = useFormik({
    initialValues: {
      title: '',
      type: '',
      material: '',
      price: 0,
      image: '',
      createdAt: new Date()
    },
    

    onSubmit: async (values, { resetForm }) => {
      values.image = selimg;
      console.log(values);

      const res = await fetch('http://localhost:5000/furniture/add', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log(res.status);

      if (res.status === 200) {
        resetForm();
        enqueueSnackbar('AddFurniture Successful', {
          variant: 'success',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right'
          }
        });
        // navigate('/login');
      } else {
        enqueueSnackbar('Something went wrong', {
          variant: 'error',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right'
          }
        })
      }

    },

    validationSchema: furnitureSchema

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
    if (res.status === 200) {
      toast.success('File uploaded successfully');
    }
  }

  return (
    <div className='vh-100 bg-body-secondary'>
      <div className='col-md-4 mx-auto py-5'>
        <div className="card">
          <div className="card-body">
            <h2 className='text-center my-5'>AddFurniture</h2>
            <form onSubmit={furnitureForm.handleSubmit} >
              <label>Title</label>
              <span className='error-label'>{furnitureForm.touched.title && furnitureForm.errors.title}</span>
              <input type="text" className="form-control mb-3" id='title' onChange={furnitureForm.handleChange} value={furnitureForm.values.title} />
              <label>Type</label>
              <input type="text" className="form-control mb-3" id="type" onChange={furnitureForm.handleChange} value={furnitureForm.values.type} />
              <label>Material</label>
              <span className='error-label'>{furnitureForm.touched.material && furnitureForm.errors.material}</span>
              <input type="text" className="form-control mb-3" id='material' onChange={furnitureForm.handleChange} value={furnitureForm.values.material} />

              <label>Upload File</label>
              <input type="file" onChange={uploadFile} />

              <button type='submit' className='btn btn-primary mt-3'>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddFurniture;