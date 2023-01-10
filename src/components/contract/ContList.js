import React from "react";
import {Link} from "react-router-dom";
import {getContsApiCall} from "../../apiCalls/contApiCalls";
import ContListTable from "./ContListTable";
import {deleteContApiCall} from "../../apiCalls/contApiCalls";


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
        if (window.confirm('Are you sure?'))
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
            content = <p>Error: {error.message}</p>
        else if (!isLoaded)
            content = <p>Loading...</p>
        else
            content = <ContListTable conts={contracts} handler={id => this.handleDelete(id)}/>
        return (
            <main>
                <h2>Contracts</h2>
                {content}
                <p><Link to="/contracts/add" className="button-add"> Add new contract </Link></p>
            </main>
        );
    }
}

export default ContList;