import React from "react";
import {useParams} from "react-router-dom";
import {getDeptByIdApiCall} from "../../apiCalls/deptApiCalls";
import {Link} from "react-router-dom";

const DeptDetails = () => {
    let {deptId} = useParams();
    deptId = parseInt(deptId);
    const dept = getDeptByIdApiCall(deptId);
    return (
        <main>
            <h2>Department details</h2>
            <form className="form">
                <label htmlFor="name">Name: </label>
                <input type="text" id="name" name="name" placeholder="" value={dept.name}/>
                <label htmlFor="location">Location: </label>
                <input type="text" id="location" name="location" placeholder=""
                       value={dept.loc}/>
                <div className="form-buttons">
                    <Link to={`/departments/edit/${dept.id}`} className="list-actions-button-edit">
                        Edit
                    </Link>
                    <Link to="/departments" className="button-cancel">
                        Cancel
                    </Link>
                </div>
            </form>
            <h3>Contracts< /h3>
            <table id="contracts" className="table-list-resDept">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Description</th>
                </tr>
                </thead>
                <tbody>
                {dept.contracts.map(cont => (
                    <tr>
                        <td data-label="ID"><Link
                            to={`/contracts/details/${cont.id}`}>{cont.id}</Link></td>
                        <td data-label="Description">{cont.desc}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </main>
    );
}
export default DeptDetails;