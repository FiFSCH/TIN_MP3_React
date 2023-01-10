import React from "react";
import {Link} from "react-router-dom";
import {getEmpsApiCall} from "../../apiCalls/empApiCalls";
import EmpListTable from "./EmpListTable";
import {deleteEmpApiCall} from "../../apiCalls/empApiCalls";

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
    handleDelete = (id) => {
        if (window.confirm('Are you sure?'))
            deleteEmpApiCall(id).then(() => this.fetchEmps());
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
            content = <EmpListTable employees={employees} handler={id => this.handleDelete(id)}/>
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