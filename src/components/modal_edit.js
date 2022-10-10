import React, { useContext,  useRef } from 'react';
import AddItemModal from './modal_add_item';
import { MyContext } from '../context';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import '../css/modal.css';
import heyImage from '../image/hey_hey.webp';

const ListInputModal = () => {

    const { state, editModalAdd, CheckBoxEdit, close_Modal } = useContext(MyContext);
    const formik = useFormik({
        initialValues: {
            foundQty: '',
            sysQty: '',
        },
        validationSchema: Yup.object({
            foundQty: Yup
                .number('The field must be a number.'),
            sysQty: Yup
                .number('The field must be a number.')
        }),
        onSubmit: (values, { resetForm }) => {
            // console.log(values);
            if (values.sysQty === '' && values.foundQty === '') {
                close_Modal();
                return;
            }


            editModalAdd(values.foundQty, values.sysQty, state.account);//qty, resetQty, account



            //id, qty, account
            // register(values.name, values.password, values.sid, values.zone);
            resetForm();
        }
    })

    const foundInput = useRef();

    // setTimeout(() => {
    //     if (state.addItemBtn === false) {
    //         if (state.checkBoxEdit === false) {
    //             foundInput.current.focus();
    //         }
    //     }
    // }, 1000)


    return (

        <div className="modal-dialog">
            {
                state.addItemBtn ? <AddItemModal />
                    :
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Changing Inventory Quantities</h5>
                        </div>

                        <form onSubmit={formik.handleSubmit}>
                            <div className="modal-body" >

                                <img
                                    className="mb-4 modal-img"
                                    onError={e => e.target.src = heyImage}
                                    src={`https://www.phco.my/images/thumbs/products/${state.selectedProduct.ean}/0.jpg`} alt="img" width="100" height="100" />

                                <div className=" fw-normal">{state.selectedProduct.ean}</div>
                                <div className="mb-3 fw-normal">{state.selectedProduct.productName}</div>
                                <div className="d-flex justify-content-evenly">
                                    <div>System: {state.selectedProduct.sysQty}</div>
                                    <div>Found: {state.selectedProduct.onHandQty}</div>
                                </div>
                                <div className="d-flex flex-column flex-wrap input-area" >


                                    {
                                        state.checkBoxEdit ?
                                            <>
                                                <input
                                                    name='sysQty'
                                                    {...formik.getFieldProps('sysQty')}
                                                    className="form-control me-2 order-input"
                                                    type='number'
                                                    placeholder="Reset System Quantity" />

                                                {
                                                    formik.errors.sysQty && formik.touched.sysQty ? <span className='error-message'>{formik.errors.sysQty}</span> : null
                                                }
                                            </>
                                            :
                                            <>
                                                <input
                                                    ref={foundInput}
                                                    name='foundQty'
                                                    {...formik.getFieldProps('foundQty')}
                                                    className="form-control found-input me-2 order-input"
                                                    type='number'
                                                    placeholder="Add Quantity" />

                                                {
                                                    formik.errors.foundQty && formik.touched.foundQty ? <span className='error-message'>{formik.errors.foundQty}</span> : null
                                                }
                                            </>
                                    }



                                    {
                                        state.role === 'admin' ?
                                            <div className="checkbox mb-3 checkbox-space">
                                                <label>
                                                    {/* <input type="checkbox" checked={state.checkBox} onChange={checkBox} onClick={() => eanInput.current.focus()} /> Count */}
                                                    <input
                                                        type="checkbox" checked={state.checkBoxEdit} onChange={CheckBoxEdit} /> Reset System Quantity

                                                </label>
                                            </div>
                                            : null
                                    }







                                </div>


                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary modal-btn-close" data-bs-dismiss="modal">Close</button>

                                {
                                    state.checkBoxEdit ?
                                        <button type='submit' className="btn btn-danger">Reset</button>
                                        :
                                        <button type='submit' className="btn btn-primary">Add</button>
                                }




                            </div>
                        </form>
                    </div >
            }

        </div >

    )
}

export default ListInputModal;