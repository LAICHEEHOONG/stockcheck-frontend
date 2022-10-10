import React, { useContext, useEffect } from 'react';
import { MyContext } from '../context';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import '../css/auth.css';

const Auth = () => {

    const context = useContext(MyContext);
    const { login, state, toggleNavigateToAdmin, checkLogin } = context;

    let navigate = useNavigate();


    const formik = useFormik({
        initialValues: {
            sid: '',
            password: ''
        },
        validationSchema: Yup.object({
            sid: Yup
                .number('Sorry the staff id must be number')
                .required('Sorry the staff id is required')
                .max(9999, 'Sorry the staff id number not exist'),
            password: Yup
                .string()
                .required('Sorry the password is required')
        }),
        onSubmit: async (values, { resetForm }) => {
            // console.log(values);
            await login(values.sid, values.password)
            resetForm();


        }
    })

    useEffect(() => {
        checkLogin();
    }, [checkLogin])

    setTimeout(() => {
        if (state.login === true && state.navigateToAdmin === false) {
            navigate('/input', { replace: true });
        }
        if (state.login === true && state.navigateToAdmin === true) {
            toggleNavigateToAdmin();
            navigate('/admin', { replace: true });
        }
    }, 1000);






    return (
        <main className="form-signin">
            <form onSubmit={formik.handleSubmit}>
     
                {
                    state.loginSpinner ?
                        <div className="spinner-border text-primary login-spinner" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        :
                        <img className="mb-4 login-spinner" src={state.loginImg} alt="login-img" />

                }



                <h1 className="h3 mb-3 fw-normal">{state.loginMessage}</h1>


                <div className="form-floating">


                    <input
                        name='sid'
                        {...formik.getFieldProps('sid')}
                        required="required"
                        type="number"
                        className="form-control ean-input"
                        id="floatingInput"
                        placeholder="Staff ID" />
                    <label htmlFor="floatingInput">
                        {formik.errors.sid && formik.touched.sid ? <span className='error-message'>{formik.errors.sid}</span> : 'Staff ID'}
                    </label>
                </div>
                <div className="form-floating">
                    <input
                        
                        autoComplete='current-password'
                        name='password'
                        {...formik.getFieldProps('password')}
                        required="required"
                        type="password"
                        className="form-control quantity-input"
                        id="floatingPassword"
                        placeholder="Password" />
                    <label htmlFor="floatingPassword">
                        {formik.errors.password && formik.touched.password ? <span className='error-message'>{formik.errors.password}</span> : 'Password'}
                    </label>

                </div>




                <button type="submit" className='mb-1  w-100 btn btn-lg btn-primary'>
                    Login
                </button>

                {
                    state.createUserBtn ?
                        <button name='create-account-btn' data-bs-toggle="modal" data-bs-target="#exampleModal" type="button" className='w-100 btn btn-lg btn-success'>
                            Create New Account
                        </button>
                        :
                        null
                }


                <p className="mt-5 mb-3 text-muted">&copy; STOCK CHECK · 库存检查 – 2022</p>
            </form>
        </main>
    )
}

export default Auth;