import React from "react";
import {Link} from "react-router-dom";

const DeptContsTable = ({contracts}) => {
    if (contracts.length === 0)
        return (<></>);
    return (
        <>
            <h3>Contracts< /h3>
            <table id="contracts" className="table-list-resDept">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Description</th>
                </tr>
                </thead>
                <tbody>
                {contracts.map(cont => (
                    <tr>
                        <td data-label="ID"><Link
                            to={`/contracts/details/${cont.idContract}`}>{cont.idContract}</Link></td>
                        <td data-label="Description">{cont.description}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>);
};
export default DeptContsTable;