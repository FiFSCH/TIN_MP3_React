import React from "react";
import ContListTableRow from "./ContListTableRow";

const ContListTable = ({conts}) => {
    if (conts.length === 0)
        return <p>There are no contracts to display!</p>
    return (<table id="ContractsList" className="table-list">
            <thead>
            <tr key='headings'>
                <th>Description</th>
                <th>Start date</th>
                <th>Due date</th>
                <th>Options</th>
            </tr>
            </thead>
            <tbody>
            {conts.map(cont => <ContListTableRow key={cont.idContract} contData={cont}/>)}
            </tbody>
        </table>
    );
}
export default ContListTable