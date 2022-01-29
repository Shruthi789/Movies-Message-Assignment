import {useFormik} from 'formik';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';

function FormComponent({initialValues,submitHandler,action}){
    
    const formValidationSchema=yup.object({
        name:yup.string().required('Enter a name!!'),
        poster:yup.string().min(4).required('Enter a poster link!'),
        summary:yup.string().min(20,'Limit is 20 characters').required('Enter a summary!'),
        rating:yup.number().min(0,'Enter a higher rating').max(10,'Enter a lower rating').required('Enter a rating!'),
        cast:yup.string().min(30,'Enter a minimum of 30 characters').required('Enter the cast!'),
        language:yup.string().min(4,'Enter a minimum of 4 characters').required('Enter the language!'),
        trailer:yup.string().min(4,'Enter a minimum of 4 characters').required('Enter a trailer link!')
      });
      const {values,errors,touched,handleSubmit,handleBlur,handleChange}=useFormik({
        initialValues: initialValues,
        validationSchema:formValidationSchema,
        onSubmit:submitHandler
      })
    return (<div>
        <h2 className="heading-style">{action} USER</h2>
        <div className='adjust-form'>
        <form onSubmit={handleSubmit} className="form-style">
        <div className="form-style">
        <label className="label-style">Name: </label>
        <TextField
      id="name"
      name="name"
      label="Name"
      value={values.name}
      onChange={handleChange}
      onBlur={handleBlur}
      error={errors.name && touched.name}
      helperText={touched.name?errors.name:""}
      sx={{width:{xs:'90vw',md:331}}}
    />
    </div>
    <div className="form-style">
        <label className="label-style">Poster: </label>
        <TextField
      id="poster"
      name="poster"
      label="Poster"
      value={values.poster}
      onChange={handleChange}
      onBlur={handleBlur}
      error={errors.poster && touched.poster}
      helperText={touched.poster?errors.poster:""}
      sx={{width:{xs:'90vw',md:331}}}
    />
    </div>
    <div className="form-style">
      <label className="label-style">Summary: </label>
        <TextField
        id="summary"
      name="summary"
      label="Summary"
      value={values.summary}
      onChange={handleChange}
      onBlur={handleBlur}
      error={errors.summary && touched.summary}
      helperText={touched.summary?errors.summary:""}
      sx={{width:{xs:'90vw',md:331}}}
    />
    </div>
    <div className="form-style">
    <label className="label-style">Rating: </label>
        <TextField
        id="rating"
       name="rating"
      label="Rating"
      value={values.rating}
      onChange={handleChange}
      onBlur={handleBlur}
      error={errors.rating && touched.rating}
      helperText={touched.rating?errors.rating:""}
      sx={{width:{xs:'90vw',md:331}}}
    />
    </div>
    <div className="form-style">
     <label className="label-style">Cast: </label>
        <TextField
        id="cast"
      name="cast"
      label="Cast"
      value={values.cast}
      onChange={handleChange}
      onBlur={handleBlur}
      error={errors.cast && touched.cast}
      helperText={touched.cast?errors.cast:""}
      sx={{width:{xs:'90vw',md:331}}}
    />
    </div>
    <div className="form-style">
     <label className="label-style"> Language: </label>
        <TextField
        id="language"
      name="language"
      label="language"
      value={values.language}
      onChange={handleChange}
      onBlur={handleBlur}
      error={errors.language && touched.language}
      helperText={touched.language?errors.language:""}
      sx={{width:{xs:'90vw',md:331}}}
    />
    </div>
    <div className="form-style">
     <label className="label-style"> Trailer: </label>
        <TextField
        id="trailer"
      name="trailer"
      label="Trailer"
      value={values.trailer}
      onChange={handleChange}
      onBlur={handleBlur}
      error={errors.trailer && touched.trailer}
      helperText={touched.trailer?errors.trailer:""}
      sx={{width:{xs:'90vw',md:331}}}
    />
    </div>
       <Button variant="contained" type="Submit">+{action} User</Button>

</form>
</div> 
</div>);
}

function FilterForm({submitHandler}){
  const formValidationSchema=yup.object({
    rating:yup.number().min(0,'Enter a higher rating').max(10,'Enter a lower rating'),
    language:yup.string().min(4,'Enter a minimum of 4 characters')
  });
  const {values,errors,touched,handleSubmit,handleBlur,handleChange}=useFormik({
    initialValues:{
      rating:'',
      language:''
    },
    validationSchema:formValidationSchema,
    onSubmit:submitHandler
  })

  return(
  <div>
  <form onSubmit={handleSubmit} className="form-style">
  <div className="form-style">
  <label className="label-style">Language: </label>
  <TextField
id="language"
name="language"
label="Language"
value={values.language}
onChange={handleChange}
onBlur={handleBlur}
error={errors.language && touched.language}
helperText={touched.language?errors.language:""}
sx={{width:{xs:'90vw',md:331}}}
/>
</div>
<div className="form-style">
  <label className="label-style">Rating: </label>
  <TextField
id="rating"
name="rating"
label="Rating"
value={values.rating}
onChange={handleChange}
onBlur={handleBlur}
error={errors.rating && touched.rating}
helperText={touched.rating?errors.rating:""}
sx={{width:{xs:'90vw',md:331}}}
/>
</div>

 <Button variant="contained" startIcon={<SearchIcon/>} type="Submit">Search</Button>

</form>
</div> )

}

export {FormComponent,FilterForm};