import React from "react";
import {Link} from "react-router-dom";
import { getDeptsApiCall} from "../../apiCalls/deptApiCalls";
import formMode from "../../helpers/formHelper";
import withRouter from "../../helpers/withRouter";
import {getContByIdApiCall} from "../../apiCalls/contApiCalls";

class ContForm extends React.Component {
    constructor(props) {
        super(props);
        const paramsContId = this.props.params.contId;
        const currentFormMode = paramsContId ? formMode.EDIT : formMode.NEW;
        this.state = {
            departments: [],
            contId: paramsContId,
            cont: {
                desc: '',
                startDate: null,
                dueDate: null,
                deptContName: null
            },
            errors: {
                desc: '',
                startDate: '',
                dueDate: '',
                deptContName: ''
            },
            formMode: currentFormMode,
            redirect: false,
            error: null
        };
    }
    fetchDepts = () => {
        getDeptsApiCall().then(res => res.json()).then((data) => {
                this.setState({
                    departments: data
                });
            },
            (error) => {
                this.setState({
                    error
                });
            }
        );
    };
    fetchContDetails = () => {
        getContByIdApiCall(this.state.contId).then(res => res.json()).then(
            (data) => {
                if (data.message)
                    this.setState({
                        message: data.message
                    });
                else {
                    this.setState({
                        cont: data,
                        message: null
                    });
                }
                this.setState({isLoaded: true});
            },
            (error) => {
                this.setState({
                        isLoaded: true,
                        error
                    }
                );
            }
        );
    };
    componentDidMount() {
        this.fetchDepts();
        const currentFormMode = this.state.formMode;
        if (currentFormMode === formMode.EDIT)
            this.fetchContDetails();
    }
    handleChange = (event) => {
        const {name, value} = event.target;
        const cont = {...this.state.cont};
        cont[name] = value;
        const errorMessage = this.validateField(name, value);
        const errors = {...this.state.errors};
        errors[name] = errorMessage;
        this.setState({
            cont: cont,
            errors: errors
        });
    };

    render() {
        const depts = getDeptsApiCall();
        return (
            <main>
                <h2>Contract</h2>
                <form className="form">
                    <label htmlFor="desc">Description: <abbr title="required" aria-label="required">*</abbr></label>
                    <input type="text" id="desc" name="desc" value=""/>
                    <span id="errorDescription" className="errors-text"></span>
                    <label htmlFor="startDate">Start date: <abbr title="required" aria-label="required">*</abbr></label>
                    <input type="date" id="startDate" name="startDate"/>
                    <span id="errorStartDate" className="errors-text"></span>
                    <label htmlFor="dueDate">Due date: </label>
                    <input type="date" id="dueDate" name="dueDate" value=""/>
                    <span id="errorDueDate" className="errors-text"></span>
                    <label htmlFor="deptContName">Responsible department: <abbr title="required" aria-label="required">*</abbr></label>
                    <select name="IdDept" id="deptContName" required>
                        <option disabled selected value="">--Select Department--</option>
                        {depts.map(dept => <option value={dept.id}>{dept.name}, {dept.loc}</option>)}
                    </select>
                    <span id="errorDeptContName" className="errors-text"></span>
                    <div className="form-buttons">
                        <input type="submit" value="Save" className="button-submit"/>
                        <Link to="/contracts" class="button-cancel">Cancel</Link>
                    </div>
                </form>
            </main>
        );
    }
}

export default withRouter(ContForm);