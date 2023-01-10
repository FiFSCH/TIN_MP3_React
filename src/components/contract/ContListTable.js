import React from "react";
import ContListTableRow from "./ContListTableRow";
import {useTranslation} from "react-i18next";
const ContListTable = ({conts, handler}) => {
    const {t} = useTranslation();
    if (conts.length === 0)
        return <p>{t('cont.list.empty')}</p>
    return (<table id="ContractsList" className="table-list">
            <thead>
            <tr key='headings'>
                <th>{t('cont.fields.desc')}</th>
                <th>{t('cont.fields.start')}</th>
                <th>{t('cont.fields.end')}</th>
                <th>{t('list.options.title')}</th>
            </tr>
            </thead>
            <tbody>
            {conts.map(cont => <ContListTableRow key={cont.idContract} contData={cont} handler={handler}/>)}
            </tbody>
        </table>
    );
}
export default ContListTable