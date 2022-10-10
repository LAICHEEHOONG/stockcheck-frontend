import React, { useContext, useEffect } from "react";
import { MyContext } from "../context";
import Navbar from "./navbar";
import FourO4 from './404';
import heyImage from '../image/hey_hey.webp';
import '../css/list.css';



const List = () => {

    const { state, getZoneStockData, setListSearchBar, setSelectedProduct, addItemOff } = useContext(MyContext);


    useEffect(() => {
        getZoneStockData();
        setListSearchBar('on');
    }, [getZoneStockData, setListSearchBar])

    useEffect(() => () => {
        setListSearchBar('off');
        return;
    }, [setListSearchBar])

    const editBtn = (e) => {
        getZoneStockData();
        addItemOff();

        setSelectedProduct(e.target.id);
        if(state.checkBoxEdit === false) {
            setTimeout(() => {
                document.querySelector('.found-input').focus();
                setSelectedProduct(e.target.id);
            }, 1000);
            setTimeout(() => {
                setSelectedProduct(e.target.id);
            }, 3000)
        }
      
    }

    const situationBtn = (e) => {
        let optionValue = e.target.value;
        // console.log(optionValue)//extra, situation,short,anomaly
        const table = document.getElementById('myTable');
        const tr = table.getElementsByTagName('tr');

        if (optionValue === 'match') {
            for (let i = 1; i < tr.length; i++) {
                let td_short = tr[i].getElementsByTagName("td")[4];//5
                let txtValue_short = td_short.textContent || td_short.innerText;
                if (Number(txtValue_short) === 0) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }

        if (optionValue === 'anomaly') {
            for (let i = 1; i < tr.length; i++) {
                let td_short = tr[i].getElementsByTagName("td")[4];
                let txtValue_short = td_short.textContent || td_short.innerText;
                if (Number(txtValue_short) < 0 || Number(txtValue_short) > 0) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }

        if (optionValue === 'short') {
            for (let i = 1; i < tr.length; i++) {
                let td_short = tr[i].getElementsByTagName("td")[4];
                let txtValue_short = td_short.textContent || td_short.innerText;
                if (Number(txtValue_short) < 0) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }

        if (optionValue === 'extra') {
            for (let i = 1; i < tr.length; i++) {
                let td_short = tr[i].getElementsByTagName("td")[4];
                let txtValue_short = td_short.textContent || td_short.innerText;
                if (Number(txtValue_short) > 0) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }

        if (optionValue === 'situation') {
            for (let i = 1; i < tr.length; i++) {
                tr[i].style.display = "";
            }
        }





    }



    return (
        <>

            <Navbar />

            {
                state.addItemAlertDisplay
                    ?
                    <div className="alert alert-warning d-flex align-items-center" role="alert">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
                            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                        </svg>
                        <div>
                            {state.addItemAlert}
                        </div>
                    </div>
                    :
                    null

            }

            {
                state.getErrTimes >= 10 ? <FourO4 /> : 
                <table className="table" id='myTable'>
                <thead className='sticky-top table-dark' style={{opacity: '0.8'}}>
                    <tr>
                        <th scope="col" className="list-num table-head">No.</th>
                        <th scope="col" className="table-head">EAN</th>
                        <th scope="col" className="table-head">IMAGE</th>
                     
                        {/* <th scope="col" className="table-head product">PRODUCT</th> */}
                        <th scope="col" className="table-head">SYSTEM</th>
                        <th scope="col" className="table-head">FOUND</th>
                        <th scope="col" className="table-head">
                            <select
                                id='situation'
                                className="form-select"
                                // className="form-select admin-select"
                                style={{ 'fontWeight': 800 }}
                                onChange={situationBtn}
                            >
                                <option value="situation">ALL {`(${state.situation.all})`}</option>
                                <option value="extra">EXTRA {`(${state.situation.extra})`}</option>
                                <option value="short">SHORT {`(${state.situation.short})`}</option>
                                <option value="anomaly">{`➕ ➖ `}{`(${state.situation.anomaly})`}</option>
                                <option value="match">MATCH {`(${state.situation.match})`}</option>
                            </select>
                        </th>
                        <th scope="col" className="table-head product">PRODUCT</th>

                    </tr>
                </thead>
                <tbody>



                    {
                        state.stockData.length === 0 || state.stockData === undefined ? null : state.stockData.map((item, i) => {
                            const situation = item.onHandQty - item.sysQty;
                            const color = () => {
                                if (situation === 0) {
                                    return '';
                                } else if (situation > 0) {
                                    return 'green';
                                } else if (situation < 0) {
                                    return 'red';
                                }
                            }

                            const tooltipText = () => {
                                if (item.sid.length !== 0 || item.sid.length !== undefined) {
                                    let contents = [];
                                    item.sid.forEach(obj => {
                                        contents.push(`${obj.sid} ${obj.name} : ${obj.times}`)
                                    });

                                    let htmlText = contents.map((obj, i) => {
                                        return (
                                            <div key={i}>{obj}</div>
                                        )
                                    })

                                    return htmlText;
                                    // rn contents.join(' · ');retu
                                }
                            }

                            return (
                                <tr key={i}>
                                    <th scope="row" className="list-num" >{i + 1}</th>
                                    <td>
                                        <button
                                            onClick={editBtn}
                                            data-bs-toggle="modal"
                                            data-bs-target="#exampleModal"
                                            id={item._id} type="button" className="ean btn btn-outline-primary">{item.ean}</button>
                                    </td>
                                    <td>
                                        <img
                                            className="img"
                                            onError={e => e.target.src = heyImage}
                                            src={`https://www.phco.my/images/thumbs/products/${item.ean}/0.jpg`} alt="img" width="100" height="100" />
                                    </td>
                                    {/* <td className="product ellipsis">{item.productName}</td> */}

                                    <td className="qty">{item.sysQty}</td>

                                    <td className="qty tooltips">
                                        {
                                            item.sid.length === 0 || item.sid.length === undefined ?
                                                <span className='tooltiptexts'>No Data</span>
                                                :
                                                <span className='tooltiptexts'>{tooltipText()}</span>
                                        }

                                        {/* <span className='tooltiptexts'>hover</span> */}
                                        {item.onHandQty}
                                    </td>
                                    <td className={`qty ${color()}`}>{situation}</td>

                                    <td className="product ellipsis">{item.productName}</td>

                                </tr>
                            )
                        })
                    }



                </tbody>
            </table>
            }

   



        













        </>
    )
}

export default List;