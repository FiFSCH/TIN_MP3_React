import React from "react";
import {useParams} from "react-router-dom";
import {getEmpByIdApiCall} from "../../apiCalls/empApiCalls";
import {getFormattedDate} from "../../helpers/dateHelper";
import {Link} from "react-router-dom";

const EmpDetails = () => {
    let {empId} = useParams();
    empId = parseInt(empId);
    const emp = getEmpByIdApiCall(empId);
    return (
        <main>
            <h2>Employee Details</h2>
            <form className="form">
                <label htmlFor="fname">First name: </label>
                <input type="text" id="fname" name="fname" value={emp.firstName} disabled/>
                <label htmlFor="lname">Lastname: </label>
                <input type="text" id="lname" name="lname" value={emp.lastname} disabled/>
                <label htmlFor="employedFrom">Employed since: </label>
                <input type="date" id="employedFrom" name="employedFrom"
                       value={emp.employedSince ? getFormattedDate(emp.employedSince) : ""} disabled/>
                <label htmlFor="employedTo">Employment termination: </label>
                <input type="date" id="employedTo" name="employedTo"
                       value={emp.employmentEnd ? getFormattedDate(emp.employmentEnd) : ""} disabled/>
                <label htmlFor="phone">Phone number: </label>
                <input type="text" id="phone" name="phone" value={emp.phone} disabled/>
                <label htmlFor="email">Email address: </label>
                <input type="email" id="email" name="email" value={emp.email} disabled/>
                <label htmlFor="supervisor"><Link
                    to={`/employees/details/${!emp.supervisor.id ? '' : emp.supervisor.id} `}>Supervisor: </Link></label>
                <input type="text" id="supervisor" name="supervisor"
                       value={!emp.supervisor.firstName ? '' : (emp.supervisor.firstName + ' ' + emp.supervisor.lastname)}
                       disabled required/>
                <label htmlFor="dept"><Link
                    to={`/departments/details/${!emp.department.id ? '' : emp.department.id}`}>Department: </Link></label>
                <input type="text" id="dept" name="dept"
                       value={!emp.department.name ? '' : (emp.department.name + ', ' + emp.department.loc)}
                       disabled/>

                <div className="form-buttons">
                    <Link to={`/employees/edit/${emp.id}`} className="list-actions-button-edit">
                        Edit
                    </Link>
                    <Link to="/employees" className="button-cancel">
                        Cancel
                    </Link>
                </div>
            </form>
        </main>
    );
}
export default EmpDetails