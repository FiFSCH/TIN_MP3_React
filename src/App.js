import Header from "./components/ fragments/Header";
import Navigation from "./components/ fragments/Navigation";
import MainContent from "./components/other/MainContent";
import Footer from "./components/ fragments/Footer";
import EmpList from "./components/employee/EmpList";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import EmpDetails from "./components/employee/EmpDetails";
import EmpForm from "./components/employee/EmpForm";
import DeptList from "./components/department/DeptList";
import DeptDetails from "./components/department/DeptDetails";

function App() {
    return (
        <Router>
            <>
                <Header/>
                <Navigation/>
                <Routes>
                    <Route path="/" element={<MainContent/>}/>
                    <Route path="/employees" element={<EmpList/>}/>
                    <Route path="/employees/details/:empId" element={<EmpDetails/>}/>
                    <Route path="/employees/edit/:empId" element={<EmpForm/>}/>
                    <Route path="/employees/add" element={<EmpForm/>}/>
                    <Route path="/departments" element={<DeptList/>}/>
                    <Route path="/departments/details/:deptId" element={<DeptDetails/>}/>
                </Routes>
                <Footer/>
            </>
        </Router>
    );
}

export default App;
