import React, { useEffect, useContext } from "react";
import { MyContext } from '../context/index'
import '../css/upload.css';

const UploadEnd = () => {
    const { state, controlTimer } = useContext(MyContext);

    const endInventory = (e) => {
        switch (e.detail) {
            case 1:
            //   console.log("click");
              controlTimer('on');
              break;
            case 2:
            //   console.log("double click");
              break;
            case 3:
            //   console.log("triple click");
              break;
            default:
              return;
          }
        
    }

    const stopEndInventory = () => {
        controlTimer('off')
    }

    useEffect(() => () => {
        controlTimer('off')
        return;
    }, [controlTimer])


    return (

        <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">


            <main className="px-3">
                <img className="mb-4 login-spinner" src={state.uploadImg} alt="tea-img" />

                <h1>{state.uploadContenAbove}</h1>
                <p className="lead">{state.uploadContent}</p>
    
            </main>

            <footer className="mt-auto text-dark-50">
            <p className="lead">
                    {
                        state.endTime !== 60 ? 
                        <button
                        onClick={stopEndInventory}
                        className="btn btn-lg btn-outline-warning fw-bold ">Cancel</button>
                        :
                        <button
                        onClick={endInventory}
                        className="btn btn-lg btn-outline-danger fw-bold ">END</button>

                    }
               

               
                </p>
            </footer>
        </div>
    )
}

export default UploadEnd;

