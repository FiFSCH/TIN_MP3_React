import React, {useEffect} from "react";
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
import LoginForm from "./components/other/LoginForm";
import {getCurrentUser} from "./helpers/authHelper";
import ProtectedRoutes from "./components/other/ProtectedRoutes";
import {useState, createContext} from "react";

const ThemeContext = createContext(null);

const App = () => {
    const [user, setUser] = useState(undefined);
    const [theme, setTheme] = useState("light");
    const [bodyColor, setBodyColor] = useState("#1d2426")

    const switchTheme = () => {
        setTheme(curr => curr === "light" ? "dark" : "light");
        if (theme === "light") {
            setBodyColor("#ecf0f1");
            document.body.style.background = bodyColor;
        } else if (theme === "dark") {
            setBodyColor("#1d2426")
            document.body.style.background = bodyColor;
        }
    }

    const handleLogin = (user) => {
        sessionStorage.setItem("user", user);
        setUser(user);
    }
    const handleLogout = () => {
        sessionStorage.removeItem("user");
        setUser(undefined);
    }

    useEffect(() => {
        const currentUser = getCurrentUser();
        setUser(currentUser);
    }, [])

    return (
        <Router>
            <ThemeContext.Provider value={{theme, switchTheme}}>
                <div id={theme}>
                    <Header/>
                    <Navigation handleLogout={handleLogout} switchTheme={switchTheme} theme={theme}/>
                    <Routes>
                        <Route element={<ProtectedRoutes/>}>
                            <Route path="/employees" element={<EmpList/>}/>
                            <Route path="/employees/details/:empId" element={<EmpDetails/>}/>
                            <Route path="/employees/details/" element={<EmpList/>}/>
                            <Route path="/employees/edit/:empId" element={<EmpForm/>}/>
                            <Route path="/employees/add" element={<EmpForm/>}/>
                            <Route path="/departments/details/:deptId" element={<DeptDetails/>}/>
                            <Route path="/departments/details/" element={<DeptList/>}/>
                            <Route path="/departments/edit/:deptId" element={<DeptForm/>}/>
                            <Route path="/departments/add" element={<DeptForm/>}/>
                            <Route path="/contracts" element={<ContList/>}/>
                            <Route path="/contracts/details/:contId" element={<ContDetails/>}/>
                            <Route path="/contracts/edit/:contId" element={<ContForm/>}/>
                            <Route path="/contracts/add" element={<ContForm/>}/>
                        </Route>
                        <Route path="/" element={<MainContent/>}/>
                        <Route path="/login" element={<LoginForm handleLogin={handleLogin}/>}/>
                        <Route path="/departments" element={<DeptList/>}/>
                        <Route path="/internalError" element={<InternalError/>}/>
                    </Routes>
                    <Footer/>
                </div>
            </ThemeContext.Provider>
        </Router>
    );
}

export default App;
