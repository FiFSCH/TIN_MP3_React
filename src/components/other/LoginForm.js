import React from "react";
import withRouter from "../../helpers/withRouter";
import {withTranslation} from "react-i18next";
import FormInput from "../form/FormInput";
import FormButtons from "../form/FormButtons";
import loginApiCall from "../../apiCalls/authApiCalls";
import {checkRequired} from "../../helpers/ValidationCommon";
import {Navigate} from "react-router-dom";


class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                email: '',
                password: ''
            },
            errors: {
                email: '',
                password: ''
            },
            error: '',
            message: '',
            redirect: false
        }
    }

    handleChange = (event) => {
        const {name, value} = event.target;
        const user = {...this.state.user};
        user[name] = value;
        const errorMessage = this.validateField(name, value);
        const errors = {...this.state.errors};
        errors[name] = errorMessage;
        this.setState({
            user: user,
            errors: errors
        });
    }
    handleSubmit = (event) => {
        event.preventDefault();
        const isValid = this.validateForm();
        if (isValid) {
            const user = this.state.user
            let response;

            loginApiCall(user).then(
                (res) => {
                    response = res;
                    return res.json();

                })
                .then(
                    (data) => {
                        if (response.status === 200) {
                            if (data.token) {
                                const userString = JSON.stringify(data);
                                this.props.handleLogin(userString);
                                this.setState({redirect: true})
                                //this.props.history.goBack();
                            }
                        } else if (response.status === 401) {
                            this.setState({message: data.messge});
                        }
                    },
                    (error) => {
                        this.setState({error})
                    }
                );
        }
    };
    validateField = (fieldName, fieldValue) => {
        let errorMessage = '';
        if (fieldName === 'email') {
            if (!checkRequired(fieldValue))
                errorMessage = 'Field is required!';
        }
        if (fieldName === 'password') {
            if (!checkRequired(fieldValue))
                errorMessage = 'Field is required!';
        }
        return errorMessage;
    };
    validateForm = () => {
        const user = this.state.user;
        const errors = this.state.errors;
        for (const fieldName in user) {
            const fieldValue = user[fieldName];
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

    render() {
        const {redirect} = this.state;
        if (redirect) {
            return (
                <Navigate to={'/'}/>
            );
        }
        const errorsSummary = this.hasErrors() ? this.props.t('errors') : '';
        const fetchError = this.state.error ? `${this.props.t('error')}: ${this.state.error.message}` : '';
        const globalErrorMessage = errorsSummary || fetchError || this.state.message;
        return (
            <main>
                <h2>{this.props.t('login.login')}</h2>
                <div id="login">
                    <form className="form" method="post" onSubmit={this.handleSubmit}>
                        <FormInput
                            type="email"
                            label={this.props.t('emp.fields.email')}
                            error={this.state.errors.email}
                            name="email"
                            onChange={this.handleChange}
                            value={this.state.user.email}
                        />
                        <FormInput
                            type="password"
                            label={this.props.t('emp.fields.password')}
                            error={this.state.errors.password}
                            name="password"
                            onChange={this.handleChange}
                            value={this.state.user.password}
                        />
                        <FormButtons
                            error={globalErrorMessage}
                            lbl={this.props.t('login.login')}
                            cancelPath="/"
                        />
                    </form>
                </div>
            </main>
        );
    }
}
export default withTranslation() (withRouter(LoginForm));