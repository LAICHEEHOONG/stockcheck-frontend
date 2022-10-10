import React, { useContext } from 'react';
import { MyContext } from '../context';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import '../css/modal.css';


const AddItemModal = () => {

    const {  close_Modal, addItem } = useContext(MyContext);
    const formik = useFormik({
        initialValues: {
            productEan: '',
            productName: '',
            productFound: '',
        },
        validationSchema: Yup.object({
            productEan: Yup
                .string()
                .required('The ean code is required')
                .max(20, 'The ean code is too long')
                .min(2, 'The ean code is too short'),
            productName: Yup
                .string()
                .required('The product name is required')
                .max(300, 'The product name is too long')
                .min(2, 'The product name is too short'),
            productFound: Yup
                .number('The field must be a number')
                .required('The found quantity is required')
                .max(9999, 'The found quantity is too big')
                .min(0, 'You cannot enter a negative number'),
        }),
        onSubmit: (values, { resetForm }) => {
            // console.log(values);
            //ean, product, found
            addItem(values.productEan, values.productName, values.productFound);
            resetForm();
            setTimeout(() => {
                close_Modal();
            }, 1000)
        },

    })









    return (

        <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Add Missing Item</h5>
            </div>

            <form onSubmit={formik.handleSubmit}>
                <div className="modal-body" >


                    <div className="d-flex flex-column flex-wrap input-area" >

                        <input
                            name='productEan'
                            {...formik.getFieldProps('productEan')}
                            className="form-control me-2 order-input new-ean"
                            type='text'
                            placeholder="Ean Code" />

                        {
                            formik.errors.productEan && formik.touched.productEan ? <span className='error-message'>{formik.errors.productEan}</span> : null
                        }

                        <input
                            name='productName'
                            {...formik.getFieldProps('productName')}
                            className="form-control me-2 order-input"
                            type='text'
                            placeholder="Product Name" />

                        {
                            formik.errors.productName && formik.touched.productName ? <span className='error-message'>{formik.errors.productName}</span> : null
                        }


                        <input
                            name='productFound'
                            {...formik.getFieldProps('productFound')}
                            className="form-control me-2 order-input"
                            type='text'
                            placeholder="Found Quantity" />

                        {
                            formik.errors.productFound && formik.touched.productFound ? <span className='error-message'>{formik.errors.productFound}</span> : null
                        }












                    </div>


                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary modal-btn-close" data-bs-dismiss="modal">Close</button>

                    <button type='submit' className="btn btn-primary">Add</button>
                    {/* {
                        state.checkBoxEdit ?
                            <button type='submit' className="btn btn-danger">Reset</button>
                            :
                            <button type='submit' className="btn btn-primary">Add</button>
                    } */}




                </div>
            </form>
        </div >

    )
}

export default AddItemModal;