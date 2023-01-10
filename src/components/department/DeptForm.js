import React from "react";
import {Navigate} from "react-router-dom";
import withRouter from "../../helpers/withRouter";
import formMode from "../../helpers/formHelper";
import {getDeptByIdApiCall, addDeptApiCall, updateDeptApiCall} from "../../apiCalls/deptApiCalls";
import {checkRequired, checkTxtLengthRange} from "../../helpers/ValidationCommon";
import FormInput from "../form/FormInput";
import FormButtons from "../form/FormButtons";

class DeptForm extends React.Component {
    constructor(props) {
        super(props);
        const paramsDeptId = this.props.params.deptId;
        const currentFormMode = paramsDeptId ? formMode.EDIT : formMode.NEW;
        this.state = {
            deptId: paramsDeptId,
            dept: {
                name: '',
                location: ''
            }, errors: {
                name: '',
                location: ''
            },
            formMode: currentFormMode,
            redirect: false,
            error: null,
            internalError: false
        };
    }

    fetchDeptDetails = () => {
        getDeptByIdApiCall(this.state.deptId).then(res => res.json()).then(
            (data) => {
                if (data.message)
                    this.setState({
                        message: data.message
                    });
                else {

                    this.setState({
                        dept: data,
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
    componentDidMount = () => {
        const currentFormMode = this.state.formMode;
        if (currentFormMode === formMode.EDIT)
            this.fetchDeptDetails();
    };

    validateField = (fieldName, fieldValue) => {
        let errorMessage = '';
        if (fieldName === 'name') {
            if (!checkRequired(fieldValue))
                errorMessage = 'Field is required!';
            else if (!checkTxtLengthRange(fieldValue, 2, 40))
                errorMessage = 'Field should contain 2-40 characters!';
        }
        if (fieldName === 'location') {
            if (!checkRequired(fieldValue))
                errorMessage = 'Field is required!';
            else if (!checkTxtLengthRange(fieldValue, 2, 40))
                errorMessage = 'Field should contain 2-40 characters!';
        }
        return errorMessage;
    };

    handleChange = (event) => {
        const {name, value} = event.target;
        const dept = {...this.state.dept};
        dept[name] = value;
        const errorMessage = this.validateField(name, value);
        const errors = {...this.state.errors};
        errors[name] = errorMessage;
        this.setState({
            dept: dept,
            errors: errors
        });
    };
    handleSubmit = (event) => {
        event.preventDefault();
        const isValid = this.validateForm();
        if (isValid) {
            const
                dept = this.state.dept,
                currentFormMode = this.state.formMode;
            let
                promise,
                response;
            if (currentFormMode === formMode.NEW) {
                promise = addDeptApiCall(dept);

            } else if (currentFormMode === formMode.EDIT) {
                console.log(dept);
                const deptId = this.state.deptId;
                promise = updateDeptApiCall(deptId, dept);
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
                            this.setState({internalError: true})
                        }
                    );
            }
        }
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

    validateForm = () => {
        const dept = this.state.dept;
        const errors = this.state.errors;
        for (const fieldName in dept) {
            const fieldValue = dept[fieldName];
            const errorMessage = this.validateField(fieldName, fieldValue);
            errors[fieldName] = errorMessage;
        }
        this.setState({errors: errors});
        return !this.hasErrors();
    };

    render() {
        const {redirect} = this.state;
        if (redirect) {
            return (
                <Navigate to={'/departments'}/>
            );
        }
        const {internalError} = this.state;
        if (internalError) {
            return (<Navigate to='/internalError'/>);
        }
        const errorsSummary = this.hasErrors() ? 'There are errors!' : '';
        const fetchError = this.state.error ? `Error: ${this.state.error.message}` : '';
        const globalErrorMessage = errorsSummary || fetchError || this.state.message;
        const pageTitle = this.state.formMode === formMode.NEW ? 'New department' : 'Edit department';
        return (
            <main>
                <h2>{pageTitle}</h2>
                <form className="form" onSubmit={this.handleSubmit}>
                    <FormInput
                        type="text"
                        label="Name"
                        required
                        error={this.state.errors.name}
                        name="name"
                        placeholder="2-60 characters"
                        onChange={this.handleChange}
                        value={this.state.dept.name}/>
                    <FormInput
                        type="text"
                        label="Location"
                        required
                        error={this.state.errors.location}
                        name="location"
                        placeholder="2-60 characters"
                        onChange={this.handleChange}
                        value={this.state.dept.location}/>
                    <FormButtons
                        mode={this.state.formMode}
                        error={globalErrorMessage}
                        cancelPath="/departments"
                    />
                </form>
            </main>
        );
    }
}

export default withRouter(DeptForm);