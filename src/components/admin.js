import React, { useContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../context';
import Navbar from "./navbar";
import '../css/admin.css';

const Admin = () => {

    const { getAllUsers, checkAdminLogin, state, updateZoneNRole, setRemoveId, logout } = useContext(MyContext);

    let navigate = useNavigate();

    useEffect(() => {
        checkAdminLogin(() => {
            logout();
            navigate('/');
        });
        getAllUsers();
    }, [checkAdminLogin, logout, navigate, getAllUsers])





    const removeUser = (event, account) => {
        const id = event.target.name;

        let alertText = `Do you want delete account ${account}?`;

        if (window.confirm(alertText)) {
            setRemoveId(id);
            logout();
            navigate('/');
        }

    }


    return (
        <>
            <Navbar />
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th className="date-list-th" scope="col">No.</th>
                        <th className="date-list-th" scope="col">NAME</th>
                        <th className="date-list-th" scope="col">SID</th>
                        <th className="date-list-th" scope="col">ZONE</th>
                        <th className="date-list-th" scope="col">ROLE</th>
                        <th className="date-list-th" scope="col">REMOVE</th>
                    </tr>
                </thead>
                <tbody>


                    {
                        state.allUsers.length === 0 ? null :
                            state.allUsers.map((obj, i) => {
                                return (
                                    <tr key={i}>
                                        <th className="date-list-td" scope="row">{i + 1}</th>
                                        <td className="date-list-td user-name">{obj.account}</td>
                                        <td className="date-list-td">{obj.sid}</td>
                                        <td className="date-list-td">
                                            <select
                                                className="form-select admin-select "
                                                id={obj._id}
                                                onChange={(event) => {
                                                    updateZoneNRole(obj._id, event.target.value)
                                                }}
                                            >
                                                <option value="00">ZONE 00</option>
                                                <option value="01">ZONE 01</option>
                                                <option value="02">ZONE 02</option>
                                                <option value="03">ZONE 03</option>
                                                <option value="04">ZONE 04</option>
                                                <option value="05">ZONE 05</option>
                                                <option value="06">ZONE 06</option>
                                                <option value="07">ZONE 07</option>
                                                <option value="08">ZONE 08</option>
                                                <option value="09">ZONE 09</option>
                                            </select>
                                        </td>

                                        {/* <td>{obj.role}</td> */}
                                        <td className="date-list-td">
                                            <select
                                                disabled={obj.sid === 643 ? true : false}
                                                className="form-select admin-select"
                                                id={obj.sid}
                                                onChange={(event) => {
                                                    updateZoneNRole(obj._id, null, event.target.value)
                                                }}
                                            >
                                                <option value="newbie">NEWBIE</option>
                                                <option value="user">USER</option>
                                                <option value="admin">ADMIN</option>
                                            </select>
                                        </td>
                                        <td>
                                            <button
                                                disabled={obj.sid === 643 ? true : false}
                                                onClick={(e) => { removeUser(e, obj.account) }}
                                                name={obj._id} type="button"
                                                className="btn btn-danger">
                                                REMOVE
                                            </button>
                                        </td>
                                    </tr>
                                )

                            })
                    }


                    {/* <select
                        name='zone'
                        {...formik.getFieldProps('zone')}
                        selected
                        className="form-select form-select-lg mb-2" aria-label="Default select example" style={{ marginTop: '10px' }}>
                        <option value="">Choose ZONE</option>
                        <option value="00">ZONE 00</option>
                        <option value="01">ZONE 01</option>
                        <option value="02">ZONE 02</option>
                        <option value="03">ZONE 03</option>
                        <option value="04">ZONE 04</option>
                        <option value="05">ZONE 05</option>
                        <option value="06">ZONE 06</option>
                        <option value="07">ZONE 07</option>
                        <option value="08">ZONE 08</option>
                        <option value="09">ZONE 09</option>
                    </select> */}




                </tbody>
            </table>

        </>
    )
}

export default Admin;