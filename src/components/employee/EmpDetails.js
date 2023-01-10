import React from "react";
import {getEmpByIdApiCall} from "../../apiCalls/empApiCalls";
import EmpDetailsData from "./EmpDetailsData";
import withRouter from "../../helpers/withRouter";
import {withTranslation} from "react-i18next";

class EmpDetails extends React.Component {
    constructor(props) {
        super(props);
        let {empId} = this.props.params;
        this.state = {
            empId: empId,
            emp: null,
            error: null,
            isLoaded: false,
            message: null
        }
    }

    fetchEmpDetails = () => {
        getEmpByIdApiCall(this.state.empId).then(res => res.json())
            .then((data) => {
                if (data.message)
                    this.setState({
                        emp: null,
                        message: data.message
                    })
                else
                    this.setState({
                        emp: data,
                        message: null
                    })
                this.setState({isLoaded: true})
            }, (error) => {
                this.setState({isLoaded: true, error})
            })
    }

    componentDidMount() {
        this.fetchEmpDetails()
    }

    render() {
        const {emp, error, isLoaded, message} = this.state;
        let content;
        if (error)
            content = <p>{this.props.t('error')}{error.message}</p>
        else if (!isLoaded)
            content = <p>{this.props.t('loading')}</p>
        else if (message)
            content = <p> {message}</p>
        else
            content = <EmpDetailsData empData={emp}/>
        return (
            <main>
                <h2>{this.props.t('emp.form.details.pageTitle')}</h2>
                {content}
            </main>
        );
    }
}

export default withTranslation()(withRouter(EmpDetails));