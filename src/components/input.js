import React, { useContext, useEffect, useRef } from "react";
import headacheImg from '../image/headache.webp';
import curseImg from '../image/curse.webp';
import drunkImg from '../image/drunk.webp';
import lonelyImg from '../image/lonely.webp';
import hopeImage from '../image/hope.webp';
import { MyContext } from '../context/index';
import Navbar from "./navbar";
import FourO4 from './404';
import '../css/input.css';



const Input = () => {

    const { state, autoPick, setPickCheckbox, setInputCheckbox, submitQuantity, setInputEan, setInputErrImg, getZoneStockData, setInputItem, setInputMsg, setInputImg, soundControl } = useContext(MyContext);

    useEffect(() => {
        getZoneStockData();
    }, [getZoneStockData])


    let eanCode = useRef();
    let qtyInput = useRef();

    const focusEan = () => {
        setTimeout(() => {
            eanCode.current.focus();
        }, 500)
    }
    const focusQty = () => {
        setTimeout(() => {
            qtyInput.current.focus();
        }, 500)
    }


    const onSubmit = (e) => {
        e.preventDefault();
        if (state.inputItem === '') {

            let randomNum = Math.floor(Math.random() * 4);
            let randomImg = () => {
                if (randomNum === 0) {
                    return headacheImg
                }
                if (randomNum === 1) {
                    return curseImg
                }
                if (randomNum === 2) {
                    return drunkImg
                }
                if (randomNum === 3) {
                    return lonelyImg
                }

            }

            setInputMsg('Ean code not found...');
            setInputImg(randomImg());
            soundControl('warning');
            eanCode.current.value = '';
            if (!state.inputCheckbox) {
                qtyInput.current.value = '';

            }
            setInputItem('');
            setTimeout(() => {
                setInputMsg('INVENTORY CHECK');
                setInputImg(hopeImage);
            }, 4000)

        } else {
            if (state.inputCheckbox) {

                submitQuantity(1);
            } else {
                submitQuantity(qtyInput.current.value);
                qtyInput.current.value = '';
            }
        }

        if (state.pickCheckbox === false) {
            eanCode.current.value = '';
            focusEan();
        }
        if (state.pickCheckbox) {
            focusQty();
        }

    }

    const findItem = (ean) => {
        let item = state.stockData.find(obj => obj.ean === ean);
        if (item !== undefined) {
            if (item.productName.length > 25) {
                item.productName = `${item.productName.slice(0, 25)}...`;
            }
            setInputItem(item);
        } else {
            setInputItem('');
        }
    }

    const onChange = (e) => {
        let inputEanValue = e.target.value;
        setInputEan(inputEanValue);
        // console.log(state.stockData)
        findItem(inputEanValue);
        if (inputEanValue === '') {
            setInputEan('INVENTORY CHECK');
        }
    }

    const nextBtn = () => {
        getZoneStockData();
        autoPick();
        focusQty();
    }


    return (
        <>
            <Navbar />

            {
                state.getErrTimes >= 10 ? <FourO4 /> :
                    <main className="form-signin">
                        <form onSubmit={onSubmit}>


                            {
                                state.inputSpinner ?
                                    <div className="mb-3 spinner-border text-primary login-spinner" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                    :
                                    <img className="mb-3 login-spinner" src={state.inputImg} alt="login-img" onError={setInputErrImg} />

                            }


                            <div
                                className={
                                    `${state.inputMsg === 'INVENTORY CHECK' || state.inputMsg === 'Ean code not found...' || state.inputItem === ''
                                        ? 'h3' : null}
                             mb-3 fw-normal`}>
                                {state.inputMsg}
                            </div>

                            {
                                state.inputItem === '' ? null :
                                    <>
                                        <div className="mb-3 fw-normal">
                                            {state.inputItem.productName}
                                        </div>

                                        <div className="d-flex justify-content-around">
                                            <h3 className="p-2 bd-highlight">System: {state.inputItem.sysQty}</h3>
                                            <h3 className="p-2 bd-highlight">Found: {state.inputItem.onHandQty}</h3>
                                        </div>
                                    </>
                            }






                            {
                                state.pickCheckbox ? null :
                                    <div className={`form-floating ${state.inputCheckbox ? 'mb-3' : null} `}>
                                        <input
                                            autoFocus
                                            onChange={onChange}
                                            ref={eanCode}
                                            required="required"
                                            type="text"
                                            className={`form-control ${state.inputCheckbox ? null : 'ean-input'} `}
                                            id="floatingEan"
                                            placeholder="Staff ID" />
                                        <label htmlFor="floatingEan">
                                            Ean code
                                            {/* {formik.errors.sid && formik.touched.sid ? <span className='error-message'>{formik.errors.sid}</span> : 'Staff ID'} */}
                                        </label>
                                    </div>
                            }



                            {
                                state.inputCheckbox ? null :
                                    <div className="form-floating">
                                        <input

                                            ref={qtyInput}
                                            required="required"
                                            type="number"
                                            className={`form-control ${state.pickCheckbox ? 'mb-3' : 'quantity-input'}`}
                                            // className="form-control quantity-input"
                                            max="9999999999"
                                            id="floatingQuantity"
                                            placeholder="Quantity" />
                                        <label htmlFor="floatingQuantity">
                                            Quantity
                                            {/* {formik.errors.password && formik.touched.password ? <span className='error-message'>{formik.errors.password}</span> : 'Password'} */}
                                        </label>

                                    </div>

                            }




                            {
                                state.inputCheckbox ?
                                    <button type="submit" className='mb-1 w-100 btn btn-lg btn-warning'>
                                        Count
                                    </button>
                                    :
                                    <button type="submit" className={`mb-1 w-100 btn btn-lg btn-primary ${state.getErrTimes > 0 ? 'hide-btn' : null}`}>
                                        Submit Quantity
                                    </button>
                            }

                            {
                                state.getErrTimes > 0 ?


                                    <button className="btn btn-primary mb-1 w-100 btn-lg" type="button" disabled>
                                        <span className='button-loading'>Submit Quantity </span>
                                        <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                                    </button>
                                    : null

                            }



                            {
                                state.pickCheckbox && state.situation.anomaly !== 0 ?
                                    <button
                                        onClick={nextBtn}
                                        type="button" className='mb-1  w-100 btn btn-lg btn-outline-success'>
                                        Next
                                    </button> : null
                            }





                            <div className="d-flex justify-content-evenly">

                                {
                                    state.stockData.length === 0 || state.situation.anomaly === 0 ? null :
                                        <div className={`checkbox mb-3 checkbox-space ${state.getErrTimes > 0 ? 'pick-checkbox-hidden' : null} `}>
                                            <label>
                                                <input
                                                    onClick={() => {
                                                        if (!state.pickCheckbox) {
                                                            focusQty()
                                                        }
                                                    }}
                                                    type="checkbox"
                                                    checked={state.pickCheckbox}
                                                    onChange={setPickCheckbox} /> Pick
                                            </label>

                                        </div>
                                }



                                <div className={`checkbox mb-3 checkbox-space ${state.getErrTimes > 0 ? 'hide-btn' : null}`}>

                                    <label>
                                        <input
                                            onClick={focusEan}
                                            type="checkbox"
                                            checked={state.inputCheckbox}
                                            onChange={setInputCheckbox} /> Count
                                    </label>

                                </div>
                            </div>







                            <p className="mt-5 mb-3 text-muted">&copy; STOCK CHECK · 库存检查 – 2022</p>
                        </form>
                    </main>

            }


        </>
    )
}

export default Input;