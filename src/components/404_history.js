import React from "react";
import blurImage from '../image/blur.webp';
import '../css/upload.css';

const FourO4History = () => {

    const refreshPage = () => {
        window.location.reload();
    }

    return (

        <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">


            <main className="px-3">
                <img className="mb-4 login-spinner" src={blurImage} alt="login-img" />


                <h1>
                    {`Waiting for Data Connection... `}
                    <div className="spinner-grow " style={{ borderWidth: '0.2rem', width: '1.5rem', height: '1.5rem' }} role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </h1>
                <p className="lead">
                    Loading requested inventory count history data, you might have to wait a while.
                </p>

                <p className="lead">
                    <button
                        onClick={refreshPage}
                        className="btn btn-lg btn-outline-secondary fw-bold ">Refresh</button>
                </p>
            </main>

       
        </div>
    )
}

export default FourO4History;

