import React from "react";
import {Link} from "react-router-dom";
import {getDeptsApiCall} from "../../apiCalls/deptApiCalls";
import DeptListTable from "./DeptListTable";
import {deleteDeptApiCall} from "../../apiCalls/deptApiCalls";
import {withTranslation} from "react-i18next";

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

    handleDelete = (id) => {
        if (window.confirm(this.props.t('confirm')))
            deleteDeptApiCall(id).then(() => this.fetchDepts());
    }
    componentDidMount() {
        this.fetchDepts();
    }

    render() {
        const {error, isLoaded, departments} = this.state;
        let content;
        if (error)
            content = <p>{this.props.t('error')} {error.message}</p>
        else if (!isLoaded)
            content = <p>{this.props.t('loading')}</p>
        else
            content = <DeptListTable depts={departments} handler={id => this.handleDelete(id)}/>
        return (
            <main>
                <h2>{this.props.t('dept.list.title')}</h2>
                {content}
                <p><Link to="/departments/add" className="button-add">{this.props.t('dept.list.addNew')}</Link></p>
            </main>
        );
    }
}

export default withTranslation() (DeptList);