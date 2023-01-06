import React from "react";
import {Link} from "react-router-dom";
import {getContsApiCall} from "../../apiCalls/contApiCalls";
import {getFormattedDate} from "../../helpers/dateHelper";

const ContList = () => {
    const contList = getContsApiCall();
    return (
        <main>
            <h2>Contracts</h2>
            <table id="ContractsList" className="table-list">
                <thead>
                <tr>
                    <th>Description</th>
                    <th>Start date</th>
                    <th>Due date</th>
                    <th>Options</th>
                </tr>
                </thead>
                <tbody>
                {contList.map(cont => (
                    <tr>
                        <td data-label="Description">{cont.desc}</td>
                        <td data-label="Start date">{cont.start ? getFormattedDate(cont.start) : ''}</td>
                        <td data-label="Due date">{cont.end ? getFormattedDate(cont.end) : '------'}</td>
                        <td>
                            <ul className="list-actions">
                                <li><Link to={`/contracts/details/${cont.id}`}
                                          className="list-actions-button-details">Details</Link></li>
                                <li><Link to={`/contracts/delete/${cont.id}`} className="list-actions-button-delete"
                                          onClick="return confirm('Are you sure?')">Delete</Link></li>
                            </ul>
                        </td>
                    </tr>))}
                </tbody>
            </table>
            <p><Link to="/contracts/add" className="button-add"> Add new contract </Link></p>
        </main>
    );
}
export default ContList;