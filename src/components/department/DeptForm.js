import React from "react";
import {Link} from "react-router-dom";
import withRouter from "../../helpers/withRouter";
import formMode from "../../helpers/formHelper";

class DeptForm extends React.Component {
    constructor(props) {
        super(props);
        const paramsDeptId = this.props.params.deptId;
        const currentFormMode = paramsDeptId ? formMode.EDIT : formMode.NEW;
        this.state= {
            deptId: paramsDeptId,
            dept:{
                name: '',
                location: ''
            },errors:{
                name: '',
                location: ''
            },
            formMode: currentFormMode,
            redirect: false,
            error: null
        }
    }
    fetchDeptDetails = () => {

    }
    render() {
        return (
            <main>
                <h2>Department</h2>
                <form className="form">
                    <label htmlFor="name">Department name: <abbr title="required" aria-label="required">*</abbr></label>
                    <input type="text" id="name" name="name" placeholder=""/>
                    <span id="errorDeptName" className="errors-text"></span>
                    <label htmlFor="location">Department location: <abbr title="required" aria-label="required">*</abbr></label>
                    <input type="text" id="location" name="location" placeholder=""/>
                    <span id="errorDeptLoc" className="errors-text"></span>
                    <div className="form-buttons">
                        <input type="submit" value="Save" className="button-submit"/>
                        <Link to="/departments" className="button-cancel">
                            Cancel
                        </Link>
                    </div>
                </form>
            </main>
        );
    }
}

export default withRouter(DeptForm);