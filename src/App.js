import React from "react";
import Header from "./components/ fragments/Header";
import Navigation from "./components/ fragments/Navigation";
import MainContent from "./components/other/MainContent";
import Footer from "./components/ fragments/Footer";
import EmpList from "./components/employee/EmpList";
import InternalError from "./components/other/InternalError";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import EmpDetails from "./components/employee/EmpDetails";
import EmpForm from "./components/employee/EmpForm";
import DeptList from "./components/department/DeptList";
import DeptDetails from "./components/department/DeptDetails";
import DeptForm from "./components/department/DeptForm";
import ContList from "./components/contract/ContList";
import ContDetails from "./components/contract/ContDetails";
import ContForm from "./components/contract/ContForm";
import withRouter from "./helpers/withRouter";
import LoginForm from "./components/other/LoginForm";
import {getCurrentUser} from "./helpers/authHelper";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: undefined,
            prevPath: ""
        }
    }

    handleLogin = (user) => {
        localStorage.setItem("user", user);
        this.setState({user: user});
    }
    handleLogout = () => {
        localStorage.removeItem("user");
        this.setState({user: undefined});
    }

    componentDidMount() {
        const currentUser = getCurrentUser();
        this.setState({user: currentUser});
    }

    render() {
        return (
            <Router>
                <>
                    <Header/>
                    <Navigation handleLogout={this.handleLogout}/>
                    <Routes>
                        <Route path="/" element={<MainContent/>}/>
                        <Route path="/login" element={<LoginForm handleLogin={this.handleLogin}/>}/>
                        <Route path="/employees" element={<EmpList/>}/>
                        <Route path="/employees/details/:empId" element={<EmpDetails/>}/>
                        <Route path="/employees/details/" element={<EmpList/>}/>
                        <Route path="/employees/edit/:empId" element={<EmpForm/>}/>
                        <Route path="/employees/add" element={<EmpForm/>}/>
                        <Route path="/departments" element={<DeptList/>}/>
                        <Route path="/departments/details/:deptId" element={<DeptDetails/>}/>
                        <Route path="/departments/details/" element={<DeptList/>}/>
                        <Route path="/departments/edit/:deptId" element={<DeptForm/>}/>
                        <Route path="/departments/add" element={<DeptForm/>}/>
                        <Route path="/contracts" element={<ContList/>}/>
                        <Route path="/contracts/details/:contId" element={<ContDetails/>}/>
                        <Route path="/contracts/edit/:contId" element={<ContForm/>}/>
                        <Route path="/contracts/add" element={<ContForm/>}/>
                        <Route path="/internalError" element={<InternalError/>}/>
                    </Routes>
                    <Footer/>
                </>
            </Router>
        );
    }
}

export default withRouter(App);
