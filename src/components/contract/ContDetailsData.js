import React from "react";
import {Link} from "react-router-dom";
import {getFormattedDate} from "../../helpers/dateHelper";
import ContsDeptTable from "./ContsDeptTable";

const ContDetailsData = ({contData}) => {
    return (
        <>
            <form className="form">
                <label htmlFor="desc">Description: </label>
                <input type="text" id="desc" name="desc" value={contData.description} disabled/>
                <label htmlFor="startDate">Start date: </label>
                <input type="date" id="startDate" name="startDate"
                       value={contData.startDate ? getFormattedDate(contData.startDate) : ''} disabled/>
                <label htmlFor="dueDate">Due date: </label>
                <input type="date" id="dueDate" name="dueDate"
                       value={contData.dueDate ? getFormattedDate(contData.dueDate) : ''} disabled/>
                <div className="form-buttons">
                    <Link to={`/contracts/edit/${contData.idContract}`} className="list-actions-button-edit">
                        Edit
                    </Link>
                    <Link to="/contracts" className="button-cancel">
                        Cancel
                    </Link>
                </div>
            </form>
            <ContsDeptTable departments={contData.departments}/>
        </>
    );
}
export default ContDetailsData;