import React from "react";
import {Link} from "react-router-dom";
import {getFormattedDate} from "../../helpers/dateHelper";
const ContListTableRow = ({key, contData, handler}) => {
    return (
        <tr key={key}>
            <td data-label="Description">{contData.description}</td>
            <td data-label="Start date">{contData.startDate ? getFormattedDate(contData.startDate) : ''}</td>
            <td data-label="Due date">{contData.dueDate ? getFormattedDate(contData.dueDate) : '------'}</td>
            <td>
                <ul className="list-actions">
                    <li><Link to={`/contracts/details/${contData.idContract}`}
                              className="list-actions-button-details">Details</Link></li>
                    <li><button className="list-actions-button-delete"
                                onClick={() =>handler(contData.idContract)}>Delete</button></li>
                </ul>
            </td>
        </tr>
    );
}
export default ContListTableRow;