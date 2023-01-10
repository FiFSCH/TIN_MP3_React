import React from "react";
import {Navigate} from "react-router-dom";
import {getDeptsApiCall} from "../../apiCalls/deptApiCalls";
import formMode from "../../helpers/formHelper";
import withRouter from "../../helpers/withRouter";
import {getContByIdApiCall} from "../../apiCalls/contApiCalls";
import {checkRequired, checkTxtLengthRange} from "../../helpers/ValidationCommon";
import {addContApiCall, updateContApiCall} from "../../apiCalls/contApiCalls";
import FormInput from "../form/FormInput";
import FormSelectDept from "../form/FormSelectDept";
import FormButtons from "../form/FormButtons";
import {getFormattedDate} from "../../helpers/dateHelper";

class ContForm extends React.Component {
    constructor(props) {
        super(props);
        const paramsContId = this.props.params.contId;
        const currentFormMode = paramsContId ? formMode.EDIT : formMode.NEW;
        this.state = {
            departments: [],
            contId: paramsContId,
            cont: {
                IdCont: '',
                desc: '',
                startDate: null,
                dueDate: null,
                IdDept: null
            },
            errors: {
                IdCont: '',
                desc: '',
                startDate: '',
                dueDate: '',
                IdDept: ''
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
                    let placeholder = {
                        IdCont: data.idContract,
                        desc: data.description,
                        startDate: data.startDate ? getFormattedDate(data.startDate) : "",
                        dueDate: data.dueDate ? getFormattedDate(data.dueDate) : "",
                        IdDept: data.departments[0] ? data.departments[0].idDepartment : ""
                    };
                    console.log(data)
                    this.setState({
                        cont: placeholder,
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
    validateField = (fieldName, fieldValue) => {
        let errorMessage = '';
        if (fieldName === 'desc') {
            if (!checkRequired(fieldValue))
                errorMessage = 'Field is required!';
            else if (!checkTxtLengthRange(fieldValue, 13, 350))
                errorMessage = 'Field should contain 15-350 characters!';
        }
        if (fieldName === 'startDate') {
            if (!checkRequired(fieldValue))
                errorMessage = 'Field is required!';
        }
        if (fieldName === 'IdDept') {
            if (!checkRequired(fieldValue))
                errorMessage = 'Field is required!';
        }
        return errorMessage;
    };
    validateForm = () => {
        const cont = this.state.cont;
        const errors = this.state.errors;
        for (const fieldName in cont) {
            const fieldValue = cont[fieldName];
            const errorMessage = this.validateField(fieldName, fieldValue);
            errors[fieldName] = errorMessage;
        }
        this.setState({errors: errors});
        return !this.hasErrors();
    };
    hasErrors = () => {
        const errors = this.state.errors;
        for (const errorField in this.state.errors) {
            if (errors[errorField].length > 0) {
                return true;
            }
        }
        return false;
    };
    handleSubmit = (event) => {
        event.preventDefault();
        const isValid = this.validateForm();
        if (isValid) {
            const
                cont = this.state.cont,
                currentFormMode = this.state.formMode;
            let
                promise,
                response;
            if (currentFormMode === formMode.NEW) {
                promise = addContApiCall(cont);
            } else if (currentFormMode === formMode.EDIT) {
                const contId = this.state.contId;
                promise = updateContApiCall(contId, cont);
            }
            if (promise) {
                promise
                    .then(
                        (data) => {
                            response = data;
                            if (response.status === 201 || response.status === 500) {
                                return data.json();
                            }
                        })
                    .then(
                        (data) => {
                            if (!response.ok && response.status === 500) {
                                console.log(data);
                                for (const i in data) {
                                    const errorItem = data[i];
                                    const errorMessage = errorItem.message;
                                    const fieldName = errorItem.path;
                                    const errors = {...this.state.errors};
                                    errors[fieldName] = errorMessage;
                                    this.setState({
                                        errors: errors,
                                        error: null
                                    });
                                }
                            } else {
                                this.setState({redirect: true});
                            }
                        },
                        (error) => {
                            this.setState({redirect: true});
                        }
                    );
            }
        }
    };

    render() {
        const {redirect} = this.state;
        if (redirect) {
            return (
                <Navigate to={'/contracts'}/>
            );
        }
        const errorsSummary = this.hasErrors() ? 'There are errors!' : '';
        const fetchError = this.state.error ? `Error: ${this.state.error.message}` : '';
        const globalErrorMessage = errorsSummary || fetchError || this.state.message;
        const departments = this.state.departments;
        const pageTitle = this.state.formMode === formMode.NEW ? 'New contract' : 'Edit contract';
        return (
            <main>
                <h2>{pageTitle}</h2>
                <form className="form" onSubmit={this.handleSubmit}>
                    <label htmlFor="IdCont"></label>
                    <input type="hidden" name="IdCont" value=""/>
                    <FormInput
                        type="text"
                        label="Description"
                        required
                        error={this.state.errors.desc}
                        name="desc"
                        placeholder="15-350 characters"
                        onChange={this.handleChange}
                        value={this.state.cont.desc}/>
                    <FormInput
                        type="date"
                        label="Start date"
                        required
                        error={this.state.errors.startDate}
                        name="startDate"
                        placeholder=""
                        onChange={this.handleChange}
                        value={this.state.cont.startDate}/>
                    <FormInput
                        type="date"
                        label="Due date"
                        error={this.state.errors.dueDate}
                        name="dueDate"
                        placeholder=""
                        onChange={this.handleChange}
                        value={this.state.cont.dueDate}/>
                    <FormSelectDept
                        error={this.state.errors.IdDept}
                        name="IdDept"
                        collection={departments}
                        placeholder="Select department"
                        onChange={this.handleChange}
                        label="Department"
                        required/>
                    <FormButtons
                        mode={this.state.formMode}
                        error={globalErrorMessage}
                        cancelPath="/contracts"
                    />
                </form>
            </main>
        );
    }
}

export default withRouter(ContForm);