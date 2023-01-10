import React from "react";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

const Navigation = () => {
    const {t} = useTranslation();
    return (<nav>
        <ul>
            <li><Link to="/">{t('nav.main-page')}</Link></li>
            <li><Link to="/employees">{t('nav.employees')}</Link></li>
            <li><Link to="/contracts">{t('nav.contracts')}</Link></li>
            <li><Link to="/departments">{t('nav.departments')}</Link></li>
        </ul>
    </nav>);
}
export default Navigation;