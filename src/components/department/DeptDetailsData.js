import React from "react";
import {Link} from "react-router-dom";
import DeptContsTable from "./DeptContsTable";

const DeptDetailsData = ({deptData}) => {
    return (
        <>
            <form className="form">
                <label htmlFor="name">Name: </label>
                <input type="text" id="name" name="name" placeholder="" value={deptData.name}/>
                <label htmlFor="location">Location: </label>
                <input type="text" id="location" name="location" placeholder=""
                       value={deptData.location}/>
                <div className="form-buttons">
                    <Link to={`/departments/edit/${deptData.idDepartment}`} className="list-actions-button-edit">
                        Edit
                    </Link>
                    <Link to="/departments" className="button-cancel">
                        Cancel
                    </Link>
                </div>
            </form>
            <DeptContsTable contracts={deptData.contracts}/>
        </>)
};
export default DeptDetailsData;