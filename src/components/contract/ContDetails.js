import React from "react";
import withRouter from "../../helpers/withRouter";
import {getContByIdApiCall} from "../../apiCalls/contApiCalls";
import ContDetailsData from "./ContDetailsData";

class ContDetails extends React.Component {
    constructor(props) {
        super(props);
        let {contId} = this.props.params;
        this.state = {
            contId: contId,
            cont: null,
            error: null,
            isLoaded: false,
            message: null
        }
    }

    fetchContDetails = () => {
        getContByIdApiCall(this.state.contId).then(res => res.json()).then((data) => {
            if (data.message)
                this.setState({
                    cont: null,
                    message: data.message
                })
            else
                this.setState({
                    cont: data,
                    message: null
                })
            this.setState({isLoaded: true})
        }, (error) => {
            this.setState({isLoaded: true, error})
        })
    }

    componentDidMount() {
        this.fetchContDetails();
    }

    render() {
        const {cont, error, isLoaded, message} = this.state;
        let content;
        if (error)
            content = <p>Error: {error.message}</p>
        else if (!isLoaded)
            content = <p>Loading...</p>
        else if (message)
            content = <p> {message}</p>
        else
            content = <ContDetailsData contData={cont}/>
        return (
            <main>
                <h2>Contract Details</h2>
                {content}
            </main>
        );
    }
}

export default withRouter(ContDetails);