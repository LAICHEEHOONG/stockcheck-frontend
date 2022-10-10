import React from "react";
import blurImage from '../image/blur.webp';
import '../css/upload.css';

const FourO4 = () => {



    const refreshPage = () => {
        window.location.reload();
    }



    return (

        <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">


            <main className="px-3">
                <img className="mb-4 login-spinner" src={blurImage} alt="login-img" />
                <h1>Oopsie! Something's missing...</h1>
                <p className="lead">
                    The page you were looking for doesn's exist, isn't availabe or was inventory data has not been import.
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

export default FourO4;

