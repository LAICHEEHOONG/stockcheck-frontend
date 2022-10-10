import React, { useEffect, useContext } from "react";
import { MyContext } from '../context/index';
import heyImage from '../image/hey_hey.webp';
import '../css/history_date_list.css';

const HistorySingleList = () => {
    const { state, findSingleHistoryData, setListSearchBar, setSituationPercentsToZero } = useContext(MyContext);

    useEffect(() => {
        findSingleHistoryData();
        setListSearchBar('on');
        setSituationPercentsToZero()
    }, [findSingleHistoryData, setListSearchBar, setSituationPercentsToZero])

    useEffect(() => () => {
        setListSearchBar('off');
        return;
    }, [setListSearchBar])



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


        // const input = document.getElementById('myInput');
        // const filter = input.value.toUpperCase();
        // const table = document.getElementById('myTable');
        // const tr = table.getElementsByTagName('tr');

        // for (let i = 0; i < tr.length; i++) {
        //     let td_ean = tr[i].getElementsByTagName("td")[0];
        //     let td_product = tr[i].getElementsByTagName("td")[2];
        //     if (td_ean || td_product) {
        //         let txtValue_ean = td_ean.textContent || td_ean.innerText;
        //         let txtValue_product = td_product.textContent || td_product.innerText;

        //         if (txtValue_ean.toUpperCase().indexOf(filter) > -1) {
        //             tr[i].style.display = "";
        //         } else if (txtValue_product.toUpperCase().indexOf(filter) > -1) {
        //             tr[i].style.display = "";
        //         } else {
        //             tr[i].style.display = "none";
        //         }
        //     }

        // }


    }


    return (
        <>






            <div className="alert alert-primary d-flex align-items-center" role="alert">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                    className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2"
                    viewBox="0 0 16 16" role="img" aria-label="Warning:">
                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
                </svg>
                <div>
                    {state.historySingleDate} · {`Zone ${state.zone} Stock Check`}
                </div>
            </div>
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
                                <option value="situation">ALL {`(${state.historySituation.all})`}</option>
                                <option value="extra">EXTRA {`(${state.historySituation.extra})`}</option>
                                <option value="short">SHORT {`(${state.historySituation.short})`}</option>
                                <option value="anomaly">{`➕ ➖ `}{`(${state.historySituation.anomaly})`}</option>
                                <option value="match">MATCH {`(${state.historySituation.match})`}</option>
                            </select>
                        </th>
                        <th scope="col" className="table-head product">PRODUCT</th>

                    </tr>
                </thead>
                <tbody>



                    {
                        state.historySingleData.length === 0 || state.historySingleData === undefined ? null : state.historySingleData.map((item, i) => {
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
                                    <td className="ean">
                                        {item.ean}
                                    </td>
                                    <td>
                                        <img
                                            className="img"
                                            onError={e => e.target.src = heyImage}
                                            src={`https://www.phco.my/images/thumbs/products/${item.ean}/0.jpg`} alt="img" width="100" height="100" />
                                    </td>

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
        </>
    )
}

export default HistorySingleList;