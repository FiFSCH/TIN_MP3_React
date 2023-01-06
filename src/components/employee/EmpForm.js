import React from "react";
import {Link} from "react-router-dom";
import {getEmpsApiCall} from "../../apiCalls/empApiCalls";
import {getDeptsApiCall} from "../../apiCalls/deptApiCalls";

class EmpForm extends React.Component {

    render() {
        const emps = getEmpsApiCall();
        const depts = getDeptsApiCall();
        return (
            <main>
                <h2>Employee</h2>
                <form className="form">
                    <label htmlFor="fname">First name: <abbr title="required" aria-label="required">*</abbr></label>
                    <input type="text" id="fname" name="fname" value=""/>
                    <span id="errorFname" className="errors-text"></span>
                    <label htmlFor="lname">Lastname: <abbr title="required" aria-label="required">*</abbr></label>
                    <input type="text" id="lname" name="lname" value=""/>
                    <span id="errorLname" className="errors-text"></span>
                    <label htmlFor="employedFrom">Employed since: <abbr title="required" aria-label="required">*</abbr></label>
                    <input type="date" id="employedFrom" name="employedFrom" value=""/>
                    <span id="errorEmployedSince" className="errors-text"></span>
                    <label htmlFor="employedTo">Employment termination: </label>
                    <input type="date" id="employedTo" name="employedTo" value=""/>
                    <span id="errorEmployedTo" className="errors-text"></span>
                    <label htmlFor="phone">Phone number: <abbr title="required" aria-label="required">*</abbr></label>
                    <input type="text" id="phone" name="phone" value=""/>
                    <span id="errorPhoneNumber" className="errors-text"></span>
                    <label htmlFor="email">Email address: <abbr title="required" aria-label="required">*</abbr></label>
                    <input type="email" id="email" name="email" value=""/>
                    <span id="errorEmail" className="errors-text"></span>
                    <label htmlFor="supervisor">Supervisor: </label>
                    <select name="supervisor" id="supervisor">
                        <option selected value="">--Select supervisor--</option>
                        {emps.map(emp => (
                            <option value={emp.id}>{emp.firstName} {emp.lastname}</option>
                        ))}
                    </select>
                    <label htmlFor="dept">Department: </label>
                    <select name="dept" id="dept">
                        <option disabled selected value="">--Select department--</option>
                        {depts.map(dept => (
                            <option value={dept.id}>{dept.name}, {dept.loc}</option>
                        ))}
                    </select>
                    <span id="errorDept" className="errors-text"></span>
                    <div className="form-buttons">
                        <input type="submit" value="Save" className="button-submit"/>
                        <Link to="/employees" className="button-cancel">
                            Cancel
                        </Link>
                    </div>
                </form>
            </main>
        )
    }
}

export default EmpForm;