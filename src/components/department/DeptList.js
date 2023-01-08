import React from "react";
import {Link} from "react-router-dom";
import {getDeptsApiCall} from "../../apiCalls/deptApiCalls";
import DeptListTable from "./DeptListTable";

class DeptList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            departments: []
        }
    }

    fetchDepts = () => {
        getDeptsApiCall().then(res => res.json()).then((data) => {
                this.setState({
                    isLoaded: true,
                    departments: data
                });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )
    }

    componentDidMount() {
        this.fetchDepts();
    }

    render() {
        const {error, isLoaded, departments} = this.state;
        let content;
        if (error)
            content = <p>Error: {error.message}</p>
        else if (!isLoaded)
            content = <p>Loading...</p>
        else
            content = <DeptListTable depts={departments}/>
        return (
            <main>
                <h2>Departments</h2>
                {content}
                <p><Link to="/departments/add" className="button-add">Add new department</Link></p>
            </main>
        );
    }
}

export default DeptList;