import React from "react";
import {getEmpByIdApiCall, getEmpsApiCall, addEmployeeApiCall, updateEmpApiCall} from "../../apiCalls/empApiCalls";
import {getDeptsApiCall} from "../../apiCalls/deptApiCalls";
import withRouter from "../../helpers/withRouter";
import formMode from "../../helpers/formHelper";
import FormInput from "../form/FormInput";
import FormButtons from "../form/FormButtons";
import {Navigate} from "react-router-dom";
import {
    checkRequired,
    checkTxtLengthRange,
    checkDate,
    checkPhone,
    checkEmail
} from "../../helpers/ValidationCommon";

class EmpForm extends React.Component {
    constructor(props) {
        super(props);
        const paramsEmpId = this.props.params.empId;
        const currentFormMode = paramsEmpId ? formMode.EDIT : formMode.NEW;
        this.state = {
            employees: [],
            departments: [],
            empId: paramsEmpId,
            emp: {
                fname: '',
                lname: '',
                employedFrom: null,
                dateTo: null,
                phone: '',
                email: '',
                password: '',
                supervisors: null,
                departments: null,
            },
            errors: {
                fname: '',
                lname: '',
                employedFrom: '',
                dateTo: '',
                phone: '',
                email: '',
                password: '',
                supervisors: '',
                departments: '',
            },
            formMode: currentFormMode,
            redirect: false,
            error: null
        }
    }

    fetchEmps = () => {
        getEmpsApiCall().then(res => res.json()).then((data) => {
            this.setState({
                employees: data
            });
        }, (error) => {
            this.setState({
                error
            });
        });
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
        )
    }
    fetchEmpDetails = () => {
        getEmpByIdApiCall(this.state.empId).then(res => res.json()).then(
            (data) => {
                if (data.message)
                    this.setState({
                        message: data.message
                    })
                else {
                    let placeholder = {
                        fname: data.firstName,
                        lname: data.lastName,
                        employedFrom: data.dateFrom,
                        dateTo: data.dateTo,
                        phone: data.phoneNumber,
                        email: data.email,
                        password: data.password,
                        supervisors: data.supervisedBy,
                        departments: data.idDepartment
                    }
                    this.setState({
                        emp: placeholder,
                        message: null
                    })
                }
                this.setState({isLoaded: true})
            },
            (error) => {
                this.setState({
                        isLoaded: true,
                        error
                    }
                )
            }
        )
    }

    componentDidMount() {
        this.fetchEmps();
        this.fetchDepts();
        const currentFormMode = this.state.formMode;
        if (currentFormMode === formMode.EDIT)
            this.fetchEmpDetails()

    }

    validateField = (fieldName, fieldValue) => {
        let errorMessage = '';
        if (fieldName === 'fname') {
            if (!checkRequired(fieldValue))
                errorMessage = 'Field is required!'
            // else if (!checkTxtLengthRange(2, 40))
            //     errorMessage = 'Field should contain 2-40 characters!'
        }
        if (fieldName === 'lname') {
            if (!checkRequired(fieldValue))
                errorMessage = 'Field is required!'
            // else if (!checkTxtLengthRange(2, 40))
            //     errorMessage = 'Field should contain 2-40 characters!'
        }
        if (fieldName === 'email') {
            if (!checkRequired(fieldValue))
                errorMessage = 'Field is required!'
            // else if (!checkTxtLengthRange(5, 60))
            //     errorMessage = 'Field should contain 2-40 characters!'
            // else if (!checkEmail(fieldValue))
            //     errorMessage = 'Provide correct email!'
        }
        if (fieldName === 'phone') {
            if (!checkRequired(fieldValue))
                errorMessage = 'Field is required!'
            // else if (!checkTxtLengthRange(2, 15))
            //     errorMessage = 'Field should contain 2-15 characters!'
            // else if (!checkPhone(fieldValue))
            //     errorMessage = 'Provide correct phone number!'
        }
        if (fieldName === 'employedFrom') {
            if (!checkRequired(fieldValue))
                errorMessage = 'Field is required!'
            // else if (!checkDate(fieldValue))
            //     errorMessage = 'Date cannot be grater than today\'s date!'
            // else if (!checkEmail(fieldValue))
            //     errorMessage = 'Provide correct email!'
        }
        return errorMessage;
    }
    handleChange = (event) => {
        const {name, value} = event.target;
        const emp = {...this.state.emp}
        emp[name] = value;
        const errorMessage = this.validateField(name, value);
        const errors = {...this.state.errors}
        errors[name] = errorMessage;
        this.setState({
            emp: emp,
            errors: errors
        })
    }

    hasErrors = () => {
        const errors = this.state.errors;
        for (const errorField in this.state.errors) {
            if (errors[errorField].length > 0) {
                return true;
            }
        }
        return false;
    }

    validateForm = () => {
        const emp = this.state.emp;
        const errors = this.state.errors;
        for (const fieldName in emp) {
            const fieldValue = emp[fieldName];
            const errorMessage = this.validateField(fieldName, fieldValue);
            errors[fieldName] = errorMessage;
        }
        this.setState({errors: errors})
        return !this.hasErrors();
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const isValid = this.validateForm()
        if (isValid) {
            const
                emp = this.state.emp,
                currentFormMode = this.state.formMode
            let
                promise,
                response;
            if (currentFormMode === formMode.NEW) {
                promise = addEmployeeApiCall(emp)
            } else if (currentFormMode === formMode.EDIT) {
                const empId = this.state.empId
                console.log(emp);
                promise = updateEmpApiCall(empId, emp)
            }
            if (promise) {
                promise
                    .then(
                        (data) => {
                            response = data
                            if (response.status === 201 || response.status === 500) {
                                return data.json()
                            }
                        })
                    .then(
                        (data) => {
                            if (!response.ok && response.status === 500) {
                                console.log(data)
                                for (const i in data) {
                                    const errorItem = data[i]
                                    const errorMessage = errorItem.message
                                    const fieldName = errorItem.path
                                    const errors = {...this.state.errors}
                                    errors[fieldName] = errorMessage
                                    this.setState({
                                        errors: errors,
                                        error: null
                                    })
                                }
                            } else {
                                this.setState({redirect: true})
                            }
                        },
                        (error) => {
                            this.setState({error})
                            console.log(error)
                        }
                    )
            }
        }
    }

    render() {
        const {redirect} = this.state
        if (redirect) {
            return (
                <Navigate to={'/employees'}/>
            )
        }
        const errorsSummary = this.hasErrors() ? 'Therre are errors!' : '';
        const fetchError = this.state.error ? `Error: ${this.state.error.message}` : '';
        const globalErrorMessage = errorsSummary || fetchError || this.state.message;
        const employees = this.state.employees;
        const departments = this.state.departments;
        const pageTitle = this.state.formMode === formMode.NEW ? 'New employee' : 'Edit employee'
        return (
            <main>
                <h2>{pageTitle}</h2>
                <form className="form" onSubmit={this.handleSubmit}>
                    <FormInput
                        type="text"
                        label="First name"
                        required
                        error={this.state.errors.fname}
                        name="fname"
                        placeholder="2-60 characters"
                        onChange={this.handleChange}
                        value={this.state.emp.fname}
                    />
                    <FormInput
                        type="text"
                        label="Lastname"
                        required
                        error={this.state.errors.lname}
                        name="lname"
                        placeholder="2-60 characters"
                        onChange={this.handleChange}
                        value={this.state.emp.lname}
                    />
                    <FormInput
                        type="date"
                        label="Employed since"
                        required
                        error={this.state.errors.employedFrom}
                        name="employedFrom"
                        onChange={this.handleChange}
                        value={this.state.emp.employedFrom}
                    />
                    <FormInput
                        type="date"
                        label="Employed to"
                        error={this.state.errors.dateTo}
                        name="dateTo"
                        onChange={this.handleChange}
                        value={this.state.emp.dateTo}
                    />
                    <FormInput
                        type="text"
                        label="Phone number"
                        required
                        error={this.state.errors.phone}
                        name="phone"
                        placeholder="2-15 characters"
                        onChange={this.handleChange}
                        value={this.state.emp.phone}
                    />
                    <FormInput
                        type="text"
                        label="Email"
                        required
                        error={this.state.errors.email}
                        name="email"
                        placeholder="sample@email.com"
                        onChange={this.handleChange}
                        value={this.state.emp.email}
                    />
                    <FormInput
                        type="password"
                        label="Password"
                        required
                        error={this.state.errors.password}
                        name="password"
                        onChange={this.handleChange}
                        value={this.state.emp.password}
                    />
                    <label htmlFor="supervisors">Supervisor: </label>
                    <select name="supervisors" id="supervisors" onChange={this.handleChange}>
                        <option disabled selected value="">--Select supervisor--</option>
                        {employees.map(emp => (
                            <option value={emp.idEmployee}>{emp.firstName} {emp.lastName}</option>
                        ))}
                    </select>
                    <label htmlFor="departments">Department: </label>
                    <select name="departments" id="departments" onChange={this.handleChange}>
                        <option disabled selected value="">--Select department--</option>
                        {departments.map(dept => (
                            <option value={dept.idDepartment}>{dept.name}, {dept.location}</option>
                        ))}
                    </select>
                    <FormButtons
                        mode={this.state.formMode}
                        error={globalErrorMessage}
                        cancelPath="/employees"
                    />
                </form>
            </main>
        )
    }
}

export default withRouter(EmpForm);
// return (
//     <main>
//         <h2>Employee</h2>
//         <form className="form">
//             <label htmlFor="fname">First name: <abbr title="required" aria-label="required">*</abbr></label>
//             <input type="text" id="fname" name="fname" value=""/>
//             <span id="errorFname" className="errors-text"></span>
//             <label htmlFor="lname">Lastname: <abbr title="required" aria-label="required">*</abbr></label>
//             <input type="text" id="lname" name="lname" value=""/>
//             <span id="errorLname" className="errors-text"></span>
//             <label htmlFor="employedFrom">Employed since: <abbr title="required"
//                                                                 aria-label="required">*</abbr></label>
//             <input type="date" id="employedFrom" name="employedFrom" value=""/>
//             <span id="errorEmployedSince" className="errors-text"></span>
//             <label htmlFor="employedTo">Employment termination: </label>
//             <input type="date" id="employedTo" name="employedTo" value=""/>
//             <span id="errorEmployedTo" className="errors-text"></span>
//             <label htmlFor="phone">Phone number: <abbr title="required"
//                                                        aria-label="required">*</abbr></label>
//             <input type="text" id="phone" name="phone" value=""/>
//             <span id="errorPhoneNumber" className="errors-text"></span>
//             <label htmlFor="email">Email address: <abbr title="required"
//                                                         aria-label="required">*</abbr></label>
//             <input type="email" id="email" name="email" value=""/>
//             <span id="errorEmail" className="errors-text"></span>
//             <label htmlFor="supervisor">Supervisor: </label>
//             <select name="supervisor" id="supervisor">
//                 <option selected value="">--Select supervisor--</option>
//                 {/*{emps.map(emp => (*/}
//                 {/*    <option value={emp.id}>{emp.firstName} {emp.lastname}</option>*/}
//                 {/*))}*/}
//             </select>
//             <label htmlFor="dept">Department: </label>
//             <select name="dept" id="dept">
//                 <option disabled selected value="">--Select department--</option>
//                 {/*{depts.map(dept => (*/}
//                 {/*    <option value={dept.id}>{dept.name}, {dept.loc}</option>*/}
//                 {/*))}*/}
//             </select>
//             <span id="errorDept" className="errors-text"></span>
//             <div className="form-buttons">
//                 <input type="submit" value="Save" className="button-submit"/>
//                 <Link to="/employees" className="button-cancel">
//                     Cancel
//                 </Link>
//             </div>
//         </form>
//     </main>
// )