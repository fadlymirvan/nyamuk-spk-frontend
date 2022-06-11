import React, { Component } from "react";
import AuthService from "../../services/auth.service";
export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: {},
            isLoaded: false
        };
    }

    componentDidMount() {
        AuthService.getCurrentUser()
            .then(resp => {
                console.log(resp);
                this.setState({
                    currentUser: resp.data,
                    isLoaded: true,
                })
            })
    }

    render() {
        if (this.state.isLoaded) {
            const { currentUser } = this.state;
            return (
                <div className="container">
                    <header className="jumbotron">
                        <h3>
                            <strong>{currentUser.username}</strong> Profile
                        </h3>
                    </header>
                    <p>
                        <strong>Token:</strong>{" "}
                        {currentUser.accessToken.substring(0, 20)} ...{" "}
                        {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
                    </p>
                    <p>
                        <strong>Id:</strong>{" "}
                        {currentUser.id}
                    </p>
                    <p>
                        <strong>Email:</strong>{" "}
                        {currentUser.email}
                    </p>
                </div>
            );
        } else {
            return (
                <div></div>
            )
        }
    }
}
