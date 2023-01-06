import React from "react";
import {Link} from "react-router-dom";

const Navigation = () => {
    return (<nav>
        <ul>
            <li><Link to="/">Main page</Link></li>
            <li><Link to="/employees">Employees</Link></li>
            <li><Link to="/contracts">Contracts</Link></li>
            <li><Link to="/departments">Departments</Link></li>
        </ul>
    </nav>);
}
export default Navigation;