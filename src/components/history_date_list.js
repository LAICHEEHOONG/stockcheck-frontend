import React, { useContext, useEffect } from "react";
import { MyContext } from '../context/index';
import FourO4History from "./404_history";
import FourO4 from "./404";
import '../css/history_date_list.css';

const HistoryDateList = () => {
    const { state, setHistorySingleId, getZoneHistory } = useContext(MyContext);

    useEffect(() => {
        getZoneHistory();
    }, [getZoneHistory])

    const getId = (e) => {
        setHistorySingleId(e.target.id)
    }

    return (
        <>
            {
                state.historyData === '' || state.historyData.length === 0 ? <FourO4History /> :
                    <table className="table table-hover ">
                        <thead>
                            <tr>
                                <th className="date-list-th" scope="col">NO</th>
                                <th className="date-list-th" scope="col">DATE</th>
                                <th className="date-list-th" scope="col">TIME</th>
                                <th className="date-list-th" scope="col">YEAR</th>
                                <th className="date-list-th" scope="col">ZONE</th>
                                <th className="date-list-th" scope="col">TIME ZONE</th>
                            </tr>
                        </thead>
                        <tbody>

                            {

                                state.historyData.map((obj, i) => {
                                    // console.log(obj)
                                    let hour = parseInt(obj.date.slice(15, 18));
                                    let amPm = () => {
                                        if(hour > 12) {
                                            hour = hour - 12;
                                            return 'PM';
                                        } else {
                                            return 'AM';
                                        }
                                    }
                                    let hour12 = () => {
                                        if(hour > 12) {
                                            return hour - 12;
                                        }

                                        return hour;
                                    }
                                    return (
                                        <tr
                                            onClick={getId}
                                            key={obj._id} id={obj._id} className='date-list' >
                                            <th className="date-list-td" id={obj._id} scope="row">{i + 1}</th>
                                            <td className="date-list-td" id={obj._id} >{obj.date.slice(0, 10)}</td>
                                            <td className="date-list-td" id={obj._id} >
                                                {hour12()}
                                                {obj.date.slice(18, 24)}
                                                {` ${amPm()}`}
                                            </td>
                                            <td className="date-list-td" id={obj._id} >{obj.date.slice(10, 15)}</td>
                                            <td className="date-list-td" id={obj._id} >{obj.data[0].zone}</td>

                                            <td className="date-list-td time-zone" id={obj._id} >{obj.date.slice(35, obj.date.length - 1)}</td>
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

export default HistoryDateList;