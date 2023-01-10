import React from "react";
import {Link} from "react-router-dom";
import {withTranslation} from "react-i18next";
import withRouter from "../../helpers/withRouter";

class Navigation extends React.Component {
    handleLanguageChange = lang => {
        const {i18n} = this.props;
        i18n.changeLanguage(lang, (err, t) => {
            if (err) return console.log(err);
        })
    }

    render() {
        return (<nav>
            <ul>
                <li><Link to="/">{this.props.t('nav.main-page')}</Link></li>
                <li><Link to="/employees">{this.props.t('nav.employees')}</Link></li>
                <li><Link to="/contracts">{this.props.t('nav.contracts')}</Link></li>
                <li><Link to="/departments">{this.props.t('nav.departments')}</Link></li>
                <li className="lang"><button onClick={() => this.handleLanguageChange('pl')}>PL</button></li>
                <li className="lang"><button onClick={() => this.handleLanguageChange('en')}>EN</button></li>
            </ul>
        </nav>);
    }
}

export default withTranslation()(withRouter(Navigation));