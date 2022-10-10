import React, { useEffect, useContext } from "react";
import { MyContext } from '../context/index';
import Navbar from "./navbar";
import HistoryDateList from "./history_date_list";
import HistorySingleList from "./history_single_list";

const History = () => {
    const { state, getZoneHistory, toHistoryMain } = useContext(MyContext);


    useEffect(() => {

        getZoneHistory();
        toHistoryMain();

    }, [getZoneHistory, toHistoryMain])

    return (
        <>
            <Navbar />
            {
                state.historyDateList ? <HistoryDateList /> : null
            }
            {
                state.historySingleList ? <HistorySingleList /> : null
            }


        </>
    )
}

export default History;