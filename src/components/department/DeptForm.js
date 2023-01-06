import React from "react";
import {Link} from "react-router-dom";

class DeptForm extends React.Component {
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

export default DeptForm;