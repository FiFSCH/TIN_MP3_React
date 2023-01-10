import React from "react";
import {useTranslation} from "react-i18next";
const InternalError = () => {
    const {t} = useTranslation();
    return (<h1 style={{
        color: "red",
        textAlign: "center"
    }}>{t('internalError')}</h1>);
}
export default InternalError;