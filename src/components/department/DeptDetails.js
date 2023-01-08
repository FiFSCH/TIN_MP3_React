import React from "react";
import withRouter from "../../helpers/withRouter";
import DeptDetailsData from "./DeptDetailsData";
import {getDeptByIdApiCall} from "../../apiCalls/deptApiCalls";

class DeptDetails extends React.Component {
    constructor(props) {
        super(props);
        let {deptId} = this.props.params;
        this.state = {
            deptId: deptId,
            dept: null,
            error: null,
            isLoaded: false,
            message: null
        }
    }

    fetchDeptDetails = () => {
        getDeptByIdApiCall(this.state.deptId).then(res => res.json()).then((data) => {
            if (data.message)
                this.setState({
                    dept: null,
                    message: data.message
                })
            else
                this.setState({
                    dept: data,
                    message: null
                })
            this.setState({isLoaded: true})
        }, (error) => {
            this.setState({isLoaded: true, error})
        })
    }

    componentDidMount() {
        this.fetchDeptDetails();
    }

    render() {
        const {dept, error, isLoaded, message} = this.state;
        let content;
        if (error)
            content = <p>Error: {error.message}</p>
        else if (!isLoaded)
            content = <p>Loading...</p>
        else if (message)
            content = <p> {message}</p>
        else
            content = <DeptDetailsData deptData={dept}/>
        return (
            <main>
                <h2>Department details</h2>
                {content}
            </main>
        );
    }
}

export default withRouter(DeptDetails);