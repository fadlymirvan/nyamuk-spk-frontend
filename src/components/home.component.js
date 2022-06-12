import React, { Component } from "react";
import UserService from "../services/user.service";
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.retrieveAllData = this.retrieveAllData.bind(this);
        this.state = {
            content: null,
        }
    }

    componentDidMount() {
        this.retrieveAllData();
    }

    retrieveAllData() {
        UserService.getPublicContent().then(
            response => {
                console.log(response);
                this.setState({
                    content: response.data
                });
                console.log(this.state);
            },
            error => {
                this.setState({
                    content:
                        (error.response && error.response.data) ||
                        error.message ||
                        error.toString()
                });
            }
        );
    }

    render() {
        if (this.state.content !== null) {
            const { gejala } = this.state.content;
            console.log(gejala);
            return (
                <div className="container">
                    <header className="jumbotron pb-5">
                        <h3>PUBLIC CONTENT</h3>
                        <div className="container">
                            <div className="row">
                                <div className="col text-center">
                                    <button className="btn btn-secondary m-3">
                                        Nyamuk
                                    </button>
                                </div>
                            </div>
                        </div>
                    </header>
                    {gejala &&
                        gejala.map((gejala, index) => {
                        return (
                            <div key={index} className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id={`custom-checkbox-${index}`}
                                    name={gejala.name}
                                    value="false"
                                />
                                <label htmlFor={`custom-checkbox-${index}`} className="ml-2 form-check-label">{gejala.name}</label>
                            </div>
                        );
                    })}
                    <div className="container">
                        <div className="row">
                            <div className="col text-center">
                                <button className="btn btn-success m-3">
                                    Calculate
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div></div>
            )
        }
    }
}
