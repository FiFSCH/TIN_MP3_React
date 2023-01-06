import React from "react";
import {Link} from "react-router-dom";
import {getDeptsApiCall} from "../../apiCalls/deptApiCalls";

class ContForm extends React.Component {
    render() {
        const depts = getDeptsApiCall();
        return (
            <main>
                <h2>Contract</h2>
                <form className="form">
                    <label htmlFor="desc">Description: <abbr title="required" aria-label="required">*</abbr></label>
                    <input type="text" id="desc" name="desc" value=""/>
                    <span id="errorDescription" className="errors-text"></span>
                    <label htmlFor="startDate">Start date: <abbr title="required" aria-label="required">*</abbr></label>
                    <input type="date" id="startDate" name="startDate"/>
                    <span id="errorStartDate" className="errors-text"></span>
                    <label htmlFor="dueDate">Due date: </label>
                    <input type="date" id="dueDate" name="dueDate" value=""/>
                    <span id="errorDueDate" className="errors-text"></span>
                    <label htmlFor="deptContName">Responsible department: <abbr title="required" aria-label="required">*</abbr></label>
                    <select name="IdDept" id="deptContName" required>
                        <option disabled selected value="">--Select Department--</option>
                        {depts.map(dept => <option value={dept.id}>{dept.name}, {dept.loc}</option>)}
                    </select>
                    <span id="errorDeptContName" className="errors-text"></span>
                    <div className="form-buttons">
                        <input type="submit" value="Save" className="button-submit"/>
                        <Link to="/contracts" class="button-cancel">Cancel</Link>
                    </div>
                </form>
            </main>
        );
    }
}

export default ContForm;