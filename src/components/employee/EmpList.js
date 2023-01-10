import React from "react";
import {Link} from "react-router-dom";
import {getEmpsApiCall} from "../../apiCalls/empApiCalls";
import EmpListTable from "./EmpListTable";
import {deleteEmpApiCall} from "../../apiCalls/empApiCalls";
import {withTranslation} from "react-i18next";

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
        if (window.confirm(this.props.t('confirm')))
            deleteEmpApiCall(id).then(() => this.fetchEmps());
    }

    componentDidMount() {
        this.fetchEmps();
    }

    render() {

        const {error, isLoaded, employees} = this.state;
        let content;
        if (error)
            content = <p>{this.props.t('error')}{error.message}</p>
        else if (!isLoaded)
            content = <p>{this.props.t('loading')}</p>
        else
            content = <EmpListTable employees={employees} handler={id => this.handleDelete(id)}/>
        return (
            <main>
                <h2>{this.props.t('emp.list.title')}</h2>
                {content}
                <p className="section-buttons"><Link to="/employees/add" className="button-add">{this.props.t('emp.list.addNew')}</Link>
                </p>
            </main>
        );
    }
}

export default withTranslation()(EmpList);