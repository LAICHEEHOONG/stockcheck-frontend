import React, { useState, useContext, useEffect } from 'react';
import { MyContext } from '../context';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import '../css/modal.css';
import ListInputModal from './modal_edit';

const Modal = () => {

    const context = useContext(MyContext);
    const { register, state } = context;

    const [showPassword, setShowPassword] = useState(false)
    const formik = useFormik({
        initialValues: {
            name: '',
            sid: '',
            password: '',
            zone: '',

        },
        validationSchema: Yup.object({
            name: Yup
                .string()
                .required('sorry the name is required')
                .max(20, 'sorry the name is too long')
                .min(2, 'sorry the name is too short'),
            sid: Yup
                .number('sorry the staff id must be number')
                .required('sorry the staff id is required')
                .max(9999, 'sorry the staff id number not exist'),
            password: Yup
                .string()
                .required('sorry the password is required')
                .max(20, 'sorry the password is too long')
                .min(4, 'sorry the password is too short'),
            zone: Yup
                .string()
                .required('sorry the zone is required'),


        }),
        onSubmit: (values, { resetForm }) => {
            // console.log(values);
            register(values.name, values.password, values.sid, values.zone);
            resetForm();
        }
    })

    useEffect(() => () => {
        setShowPassword(false);
        return;
    }, [setShowPassword])



    const createAccountModal = () => {

        const togglePassword = () => {
            setShowPassword(!showPassword);
        }

        return (
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">{state.registerMessage}</h5>
                    </div>

                    <form onSubmit={formik.handleSubmit}>
                        <div className="modal-body" style={{ textAlign: 'left' }} >

                            <div className="d-flex flex-column flex-wrap input-area" >
                                <input
                                    name='name'
                                    {...formik.getFieldProps('name')}
                                    className="form-control me-2 order-input"
                                    type="text"
                                    placeholder="Name" />

                                {
                                    formik.errors.name && formik.touched.name ? <span className='error-message'>{formik.errors.name}</span> : null
                                }

                                <input
                                    name='sid'
                                    {...formik.getFieldProps('sid')}
                                    type='number'
                                    className="form-control me-2 order-input"
                                    placeholder="Staff ID" />

                                {
                                    formik.errors.sid && formik.touched.sid ? <span className='error-message'>{formik.errors.sid}</span> : null
                                }

                                <select
                                    name='zone'
                                    {...formik.getFieldProps('zone')}
                                    selected
                                    className="form-select form-select-lg mb-2" aria-label="Default select example" style={{ marginTop: '10px' }}>
                                    <option value="">Choose ZONE</option>
                                    <option value="00">ZONE 00</option>
                                    <option value="01">ZONE 01</option>
                                    <option value="02">ZONE 02</option>
                                    <option value="03">ZONE 03</option>
                                    <option value="04">ZONE 04</option>
                                    <option value="05">ZONE 05</option>
                                    <option value="06">ZONE 06</option>
                                    <option value="07">ZONE 07</option>
                                    <option value="08">ZONE 08</option>
                                    <option value="09">ZONE 09</option>
                                </select>

                                {
                                    formik.errors.zone && formik.touched.zone ? <span className='error-message'>{formik.errors.zone}</span> : null
                                }



                                <input
                                    name='password'
                                    {...formik.getFieldProps('password')}

                                    className="form-control me-2"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Password"
                                    id='passwordInput' />


                                {
                                    formik.errors.password && formik.touched.password ? <span className='error-message'>{formik.errors.password}</span> : null
                                }

                                <div className='show-password'>
                                    <input type="checkbox"
                                        checked={showPassword}
                                        onChange={togglePassword}
                                    // onClick={togglePassword} 
                                    />
                                    <span style={{ marginLeft: '0.5rem' }} >Show Password</span>
                                </div>



                            </div>


                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary modal-btn-close" data-bs-dismiss="modal">Close</button>
                            {
                                state.signUpSpinner ?
                                    <button className="btn btn-primary" type="button" disabled>
                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                        <span className='button-loading'>Loading...</span>
                                    </button>
                                    :
                                    <button type='submit' className="btn btn-primary">Sign Up</button>
                            }


                        </div>
                    </form>
                </div >
            </div >
        )
    }






    return (
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">


            {
                state.modalListEdit ? <ListInputModal /> : createAccountModal()
            }


        </div>
    )
}

export default Modal;