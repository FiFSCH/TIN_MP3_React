import React from "react";
import {useParams} from "react-router-dom";
import {getContByIdApiCall} from "../../apiCalls/contApiCalls";
import {getFormattedDate} from "../../helpers/dateHelper";
import {Link} from "react-router-dom";

const ContDetails = () => {
    let {contId} = useParams();
    contId = parseInt(contId);
    const cont = getContByIdApiCall(contId);
    return (
        <main>
            <h2>Contract Details</h2>
            <form className="form">
                <label htmlFor="desc">Description: </label>
                <input type="text" id="desc" name="desc" value={cont.desc} disabled/>
                <label htmlFor="startDate">Start date: </label>
                <input type="date" id="startDate" name="startDate"
                       value={cont.start ? getFormattedDate(cont.start) : ''} disabled/>
                <label htmlFor="dueDate">Due date: </label>
                <input type="date" id="dueDate" name="dueDate"
                       value={cont.end ? getFormattedDate(cont.end) : '------'} disabled/>
                <div className="form-buttons">
                    <Link to={`/contracts/edit/${cont.id}`} className="list-actions-button-edit">
                        Edit
                    </Link>
                    <Link to="/contracts" className="button-cancel">
                        Cancel
                    </Link>
                </div>
            </form>
            <h3>Departments< /h3>
            <table id="responsibleDepartment" className="table-list-resDept">
                <thead>
                <tr>
                    <th>Responsible Department</th>
                    <th>Location</th>
                </tr>
                </thead>
                <tbody>
                {cont.dept.map(dept => (
                    <tr>
                        <td data-label="Department"><Link
                            to={`/departments/details/${!dept.id ? '' : dept.id}`}>{dept.name}</Link></td>
                        <td data-label="Location">{dept.loc}</td>
                    </tr>))}
                </tbody>
            </table>
        </main>
    );
}
export default ContDetails;