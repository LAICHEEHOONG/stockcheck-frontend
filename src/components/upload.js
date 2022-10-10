import React, { useEffect, useContext } from "react";
import { MyContext } from '../context/index'
import { useNavigate } from 'react-router-dom';
import Navbar from "./navbar";
import UploadEnd from './upload_end';
import happyImage from '../image/happy.webp';
import '../css/upload.css';

const Upload = () => {

    const { checkAdminLogin, logout, setFile, setFileName, state, submitFile, setUploadTitle } = useContext(MyContext);
    let navigate = useNavigate();

    useEffect(() => {
        checkAdminLogin(() => {
            logout();
            navigate('/');
        });

    }, [checkAdminLogin, logout, navigate])


    const onSubmit = (e) => {
        e.preventDefault();
        // console.log(state.file)
        if (state.file === '') {
            setUploadTitle('Please select file to upload...😗')
            return;
        } else if (state.file.size > 5000000) {
            setUploadTitle('File size too big!😣')
            return;
        }

        // if (state.file.type === 'text/csv' || state.file.type === 'application/vnd.ms-excel') {
        if (state.file.name.slice((state.file.name.length - 4), state.file.name.length) === '.csv') {
            const formData = new FormData();
            formData.append('file', state.file);
            formData.append('zone', state.zone);
            submitFile(formData);
        } else {
            setUploadTitle('File type must be csv...🥺');
            return;
        }

    }




    return (
        <>
            <Navbar />

            {
                state.uploadStatus ?

                    <>
                        <div className="container mt-4">
                            <img className="mb-4 login-spinner" src={happyImage} alt="press-img" />


                            {
                                state.uploadPercentage === 0 ?
                                    <h4 className="display-4 text-center mb-4">
                                        {state.uploadTitle}
                                    </h4>
                                    :
                                    <div className="progress" style={{ height: '40px', margin: '5%' }}>
                                        <div className="progress-bar" role="progressbar" style={{ width: `${state.uploadPercentage}%` }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{`${state.uploadPercentage}%`}</div>
                                    </div>
                            }


                        </div>
                        <form className="form-upload" onSubmit={onSubmit}>

                            {
                                state.uploadPercentage === 0 ?
                                    <>
                                        <div className="input-group mb-3">
                                            <input
                                                onChange={(event) => {
                                                    setFile(event.target.files[0]);
                                                    setFileName(event.target.files[0].name);
                                                }}
                                                type="file" className="form-control" id="inputGroupFile02" />
                                        </div>
                                        <button
                                            type="submit"
                                            className='mb-1 w-100 btn btn-lg btn-primary'>
                                            Upload
                                        </button>


                                    </>
                                    :
                                    <button className="btn btn-primary" type="button" disabled>
                                        <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                                        <span className='button-loading'>Loading...</span>

                                    </button>
                            }




                        </form>
                    </>

                    : <UploadEnd />
            }

        </>





    )
}

export default Upload;