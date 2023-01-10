import React from "react";
import {Link} from "react-router-dom";
import {getContsApiCall} from "../../apiCalls/contApiCalls";
import ContListTable from "./ContListTable";
import {deleteContApiCall} from "../../apiCalls/contApiCalls";
import {withTranslation} from "react-i18next";

class ContList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            contracts: []
        }
    }
    handleDelete = (id) => {
        if (window.confirm(this.props.t('confirm')))
            deleteContApiCall(id).then(() => this.fetchConts());
    }

    fetchConts = () => {
        getContsApiCall().then(res => res.json()).then((data) => {
                this.setState({
                    isLoaded: true,
                    contracts: data
                });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )
    }

    componentDidMount() {
        this.fetchConts();
    }

    render() {
        const {error, isLoaded, contracts} = this.state;
        let content;
        if (error)
            content = <p>{this.props.t('error')} {error.message}</p>
        else if (!isLoaded)
            content = <p>{this.props.t('loading')}</p>
        else
            content = <ContListTable conts={contracts} handler={id => this.handleDelete(id)}/>
        return (
            <main>
                <h2>{this.props.t('cont.list.title')}</h2>
                {content}
                <p><Link to="/contracts/add" className="button-add">{this.props.t('cont.list.addNew')}</Link></p>
            </main>
        );
    }
}

export default withTranslation() (ContList);