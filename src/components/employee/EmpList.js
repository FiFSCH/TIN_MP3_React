import React from "react";
import {Link} from "react-router-dom";
import {getEmpsApiCall} from "../../apiCalls/empApiCalls";
import EmpListTable from "./EmpListTable";

class EmpList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            employees: []
        }
    }

    fetchEmps = () => {
        getEmpsApiCall().then(res => res.json()).then((data) => {
            this.setState({
                isLoaded: true,
                employees: data
            });
        }, (error) => {
            this.setState({
                isLoaded: true,
                error
            });
        });
    }

    componentDidMount() {
        this.fetchEmps();
    }

    render() {
        const {error, isLoaded, employees} = this.state;
        let content;
        if (error)
            content = <p>Error: {error.message}</p>
        else if (!isLoaded)
            content = <p>Loading...</p>
        else
            content = <EmpListTable employees={employees}/>
        return (
            <main>
                <h2>Employees</h2>
                {content}
                <p className="section-buttons"><Link to="/employees/add" className="button-add">Add new employee</Link>
                </p>
            </main>
        );
    }
}

export default EmpList;
/*const EmpList = () => {
    const empList = getEmpsApiCall();
    return (
        <main>
            <h2>Employees</h2>
            <table id="EmpsList" className="table-list">
                <thead>
                <tr>
                    <th>First name</th>
                    <th>Lastname</th>
                    <th>Phone number</th>
                    <th>Email</th>
                    <th>Options</th>
                </tr>
                </thead>
                <tbody>
                {empList.map(emp => (
                    <tr key={emp.id}>
                        <td data-label="First Name">{emp.firstName}</td>
                        <td data-label="Lastname">{emp.lastname}</td>
                        <td data-label="Phone number">{emp.phone}</td>
                        <td data-label="Email">{emp.email}</td>
                        <td>
                            <ul className="list-actions">
                                <li><Link to={`/employees/details/${emp.id}`} className="list-actions-button-details">
                                    Details</Link>
                                </li>
                                <li><Link to={`/employees/delete/${emp.id}`} className="list-actions-button-delete"
                                          onclick="return window.confirm('Are you sure?')">
                                    Delete</Link>
                                </li>
                            </ul>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <p><Link to="/employees/add" className="button-add">Add new employee</Link></p>
        </main>
    );
}
export default EmpList;*/