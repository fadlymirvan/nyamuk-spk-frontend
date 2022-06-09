import React, { Component } from "react";
import SymptomsService from "../../services/symptoms.service";

export default class EditSymptomComponent extends Component {
    constructor(props) {
        super(props);
        this.getSymptom = this.getSymptom.bind(this);
        this.onChangeCode = this.onChangeCode.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onCheckBoxN01Change = this.onCheckBoxN01Change.bind(this);
        this.onCheckBoxN02Change = this.onCheckBoxN02Change.bind(this);
        this.onCheckBoxN03Change = this.onCheckBoxN03Change.bind(this);
        this.updateSymptom = this.updateSymptom.bind(this);
        this.cancelSymptom = this.cancelSymptom.bind(this);

        this.state = {
            currentSymptom: {
                id: null,
                code: "",
                name: "",
                N01: false,
                N02: false,
                N03: false,
            },
            message: ""
        }
    };

    componentDidMount() {
        this.getSymptom(this.props.match.params.id);
    }

    getSymptom(id) {
        SymptomsService.get(id)
            .then(resp => {
                this.setState({
                    currentSymptom: resp.data
                });
                console.log(resp.data)
            })
            .catch(err => {
                console.log(err);
            })
    }

    onChangeCode(e) {
        const code = e.target.value;
        this.setState((prevState) =>  {
            return {
                currentSymptom: {
                    ...prevState.currentSymptom,
                    code: code.toUpperCase(),
                }
            };
        });
    }

    onChangeName(e) {
        const name = e.target.value;
        this.setState((prevState) =>  {
            return {
                currentSymptom: {
                    ...prevState.currentSymptom,
                    name: name,
                }
            };
        });
    }

    onCheckBoxN01Change(e) {
        this.setState((prevState) =>  {
            return {
                currentSymptom: {
                    ...prevState.currentSymptom,
                    N01: !this.state.N01,
                }
            };
        });
    }

    onCheckBoxN02Change(e) {
        this.setState((prevState) =>  {
            return {
                currentSymptom: {
                    ...prevState.currentSymptom,
                    N02: !this.state.N02,
                }
            };
        });
    }

    onCheckBoxN03Change(e) {
        this.setState((prevState) =>  {
            return {
                currentSymptom: {
                    ...prevState.currentSymptom,
                    N03: !this.state.N03,
                }
            };
        });
    }

    updateSymptom() {
        SymptomsService.update(
            this.state.currentSymptom.id,
            this.state.currentSymptom
        )
            .then(resp => {
                console.log(resp.data);
                this.setState({
                    message: "Symptom was updated successfully",
                });
                this.props.history.push("/");
            })
            .catch(err => {
                console.log(err);
            })
    }

    cancelSymptom() {
        this.props.history.push("/");
    }

    render() {
        const { currentSymptom } = this.state;
        return (
            <div className="submit-form">
                <div>
                    <div className="form-group">
                        <label htmlFor="code">Code</label>
                        <input
                            type="text"
                            className="form-control"
                            id="code"
                            required
                            value={currentSymptom.code}
                            onChange={this.onChangeCode}
                            name="code"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            required
                            value={currentSymptom.name}
                            onChange={this.onChangeName}
                            name="name"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="cf_value">Jenis Nyamuk</label><br/>
                        <div>
                            <input
                                type="checkbox"
                                id={`custom-checkbox-N01`}
                                name="Demam Berdarah"
                                value={currentSymptom.N01}
                                checked={currentSymptom.N01}
                                onChange={this.onCheckBoxN01Change}
                            />
                            <label htmlFor={`custom-checkbox-N01`} className="ml-2">Demam Berdarah</label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                id={`custom-checkbox-N02`}
                                name="Malaria"
                                value={currentSymptom.N02}
                                checked={currentSymptom.N02}
                                onChange={this.onCheckBoxN02Change}
                            />
                            <label htmlFor={`custom-checkbox-N02`} className="ml-2">Malaria</label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                id={`custom-checkbox-N03`}
                                name="Chikungunya"
                                value={currentSymptom.N03}
                                checked={currentSymptom.N03}
                                onChange={this.onCheckBoxN03Change}
                            />
                            <label htmlFor={`custom-checkbox-N03`} className="ml-2">Chikungunya</label>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col text-center">
                                <button onClick={this.updateSymptom} className="btn btn-success m-3">
                                    Submit
                                </button>
                                <button onClick={this.cancelSymptom} className="btn btn-danger">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}
