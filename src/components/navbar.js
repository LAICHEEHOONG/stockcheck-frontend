import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MyContext } from '../context/index';
import { Link } from 'react-router-dom';
import unitedState from '../image/united-states.png';
import euro from '../image/european-union.png'
import '../css/navbar.css';

const Navbar = () => {

    const contest = useContext(MyContext);

    const { logout, state, checkLogin, addItemOn, setVolumeIcon, volumeControl, toHistoryMain } = contest;

    let navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        checkLogin(() => {
            navigate('/')
        });
        if (location.pathname === '/input') {
            setVolumeIcon('show');
        } else {
            setVolumeIcon('hidden');
        }

    }, [checkLogin, navigate, setVolumeIcon, location]);

    const searchField = useRef();

    const clearSearchField = () => {
        searchField.current.value = '';
        tableSearch();
        console.log(location.pathname);
    }

    const tableSearch = () => {
        const input = document.getElementById('myInput');
        const filter = input.value.toUpperCase().replace(/\s+/g, '');
        const table = document.getElementById('myTable');
        const tr = table.getElementsByTagName('tr');

        for (let i = 0; i < tr.length; i++) {
            let td_ean = tr[i].getElementsByTagName("td")[0];
            let td_product = tr[i].getElementsByTagName("td")[5];//2
            if (td_ean || td_product) {
                let txtValue_ean = td_ean.textContent.replace(/\s+/g, '') || td_ean.innerText.replace(/\s+/g, '');
                let txtValue_product = td_product.textContent.replace(/\s+/g, '') || td_product.innerText.replace(/\s+/g, '');

                if (txtValue_ean.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else if (txtValue_product.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }

        }

        let situation = document.getElementById('situation');
        situation.value = 'situation';
        // console.log(situation.value);

    }

    const [spinnerColor, setSpinnerColor] = useState('text-dark')

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light ">
                <div className="container-fluid">

                    {
                        state.listSearchBar ?
                            <div className="d-flex">
                                <input
                                    ref={searchField}
                                    id='myInput'
                                    autoFocus onKeyUp={tableSearch} className="form-control me-2" type="text" placeholder="Search" aria-label="Search" />
                                <button
                                    onMouseOver={() => setSpinnerColor('text-light')}
                                    onMouseOut={() => setSpinnerColor('text-dark')}
                                    onClick={clearSearchField}
                                    className="btn btn-outline-dark me-4" type="button">
                                    {
                                        state.navbarSpinner ?
                                            <div

                                                className={`spinner-border ${spinnerColor}`} role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                            :
                                            'Clear'
                                    }


                                </button>

                            </div>
                            :
                            <Link className="nav-item disabled navbar-brand" to='/input'>
                                {` ZONE ${state.zone} · ${state.account}`}
                            </Link>
                    }

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">


                            <Link className="nav-item nav-title nav-title nav-link" to='/input'>
                                INPUT
                            </Link>
                            <Link className="nav-item nav-title nav-link" to='/list'>
                                LIST
                            </Link>





                            {
                                state.role === 'admin' ?
                                    <>
                                        <Link className="nav-item nav-title nav-link" to='/upload'>
                                            UPLOAD
                                        </Link>

                                        <Link className="nav-item nav-title nav-link" to='/admin'>
                                            ADMIN
                                        </Link>
                                    </>
                                    : null
                            }
                            <Link className="nav-item nav-title nav-link" onClick={toHistoryMain} to='/history'>
                                HISTORY
                            </Link>

                            <Link
                                onClick={logout}
                                className="nav-item nav-title nav-link" to='/'>
                                LOGOUT
                            </Link>
                            {/* <a href='https://stockcheck-pcd-us.herokuapp.com/'>
                                <img className="flag" src={unitedState} alt="united-states-img" />
                            </a> */}
                            {/* <a href='https://stockcheck-2022-europe.herokuapp.com/'>
                                <img className="flag" src={euro} alt="euro-img" />
                            </a> */}



                        </ul>

                        {
                            state.role === 'admin' && state.listSearchBar && location.pathname === '/list' ?
                                <button onClick={addItemOn} data-bs-toggle="modal" data-bs-target="#exampleModal" className="btn btn-outline-success" type="button">
                                    <div className="bi bi-plus" style={{ 'fontSize': '1rem' }} >Add Item</div>
                                </button>
                                : null
                        }

                        {
                            state.volumeIcon ?
                                <>
                                    <i
                                        onClick={volumeControl}
                                        className={` bi bi-volume-mute volume-icon mx-4
                                    ${state.soundSwitch ? 'volume-icon-hidden' : null}
                                    `} ></i>
                                    <i
                                        onClick={volumeControl}
                                        className={`bi bi-volume-up volume-icon mx-5
                                    ${state.soundSwitch ? null : 'volume-icon-hidden'}
                                    `}></i>
                                </>
                                : null
                        }


                    </div>

                </div>
            </nav>

            {
                state.situationPercents > 0 ?
                    <div className={`progress ${state.getErrTimes > 0 ? 'progress-bar-hidden' : null}`} style={{ height: '15px' }}>
                        <div className="progress-bar" role="progressbar" style={{ width: `${state.situationPercents}%` }} aria-valuenow="10" aria-valuemin="0" aria-valuemax="100">{`${state.situationPercents}%`}</div>
                    </div>
                    : null
            }

        </>
    )
}

export default Navbar;