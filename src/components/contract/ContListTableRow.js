import React from "react";
import {Link} from "react-router-dom";
import {getFormattedDate} from "../../helpers/dateHelper";
import {useTranslation} from "react-i18next";
const ContListTableRow = ({key, contData, handler}) => {
    const {t} = useTranslation();
    return (
        <tr key={key}>
            <td data-label={t('cont.fields.desc')}>{contData.description}</td>
            <td data-label={t('cont.fields.start')}>{contData.startDate ? getFormattedDate(contData.startDate) : ''}</td>
            <td data-label={t('cont.fields.end')}>{contData.dueDate ? getFormattedDate(contData.dueDate) : '------'}</td>
            <td>
                <ul className="list-actions">
                    <li><Link to={`/contracts/details/${contData.idContract}`}
                              className="list-actions-button-details">{t('list.options.details')}</Link></li>
                    <li><button className="list-actions-button-delete"
                                onClick={() =>handler(contData.idContract)}>{t('list.options.delete')}</button></li>
                </ul>
            </td>
        </tr>
    );
}
export default ContListTableRow;