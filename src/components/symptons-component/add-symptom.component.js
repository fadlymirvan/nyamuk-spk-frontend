import React, { Component } from "react";
import SymptomsService from "../../services/symptoms.service";

export default class AddSymptomComponent extends Component {
    constructor(props) {
        super(props);
        this.onChangeCode = this.onChangeCode.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.saveSymptom = this.saveSymptom.bind(this);
        this.cancelSymptom = this.cancelSymptom.bind(this);
        this.newSymptom = this.newSymptom.bind(this);
        this.onCheckBoxN01Change = this.onCheckBoxN01Change.bind(this);
        this.onCheckBoxN02Change = this.onCheckBoxN02Change.bind(this);
        this.onCheckBoxN03Change = this.onCheckBoxN03Change.bind(this);
        this.state = {
            id: null,
            code: "",
            name: "",
            N01: false,
            N02: false,
            N03: false,
            submitted: false,
            disabled: false,
            listNyamuk: [
                {id: "NO1", name: "Demam Berdarah"},
                {id: "NO2", name: "Malaria"},
                {id: "NO3", name: "Chikungunya"},
            ]
        };
    }

    onChangeCode(e) {
        this.setState({
            code: e.target.value,
        });
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value,
        });
    }

    saveSymptom() {
        var data = {
            code: this.state.code.toUpperCase(),
            name: this.state.name,
            N01: this.state.N01,
            N02: this.state.N02,
            N03: this.state.N03,
        };

        console.log(data);

        SymptomsService.create(data)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    code: response.data.code,
                    name: response.data.name,
                    N01: response.data.N01,
                    N02: response.data.N02,
                    N03: response.data.N03,
                    submitted: true,
                });
                console.log(data);
                this.props.history.push("/");
            })
            .catch(e => {
                console.log(e);
            });
    }

    cancelSymptom() {
        this.props.history.push("/");
    }

    newSymptom() {
        this.setState({
            id: null,
            code: "",
            name: "",
            N01: false,
            N02: false,
            N03: false,
            submitted: false,
        });
    }

    onCheckBoxN01Change(e) {
        this.setState({
            N01: !this.state.N01,
        });
    }

    onCheckBoxN02Change(e) {
        this.setState({
            N02: !this.state.N02,
        });
    }

    onCheckBoxN03Change(e) {
        this.setState({
            N03: !this.state.N03,
        });
    }

    render() {
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
                            value={this.state.code}
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
                            value={this.state.name}
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
                                value={this.state.N01}
                                onChange={this.onCheckBoxN01Change}
                            />
                            <label htmlFor={`custom-checkbox-N01`} className="ml-2">Demam Berdarah</label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                id={`custom-checkbox-N02`}
                                name="Malaria"
                                value={this.state.N02}
                                onChange={this.onCheckBoxN02Change}
                            />
                            <label htmlFor={`custom-checkbox-N02`} className="ml-2">Malaria</label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                id={`custom-checkbox-N03`}
                                name="Chikungunya"
                                value={this.state.N03}
                                onChange={this.onCheckBoxN03Change}
                            />
                            <label htmlFor={`custom-checkbox-N03`} className="ml-2">Chikungunya</label>
                        </div>
                            {/*{listNyamuk.map((nyamuk, index) => {*/}
                            {/*    return (*/}
                            {/*        <div key={index}>*/}
                            {/*            <input*/}
                            {/*                type="checkbox"*/}
                            {/*                id={`custom-checkbox-${index}`}*/}
                            {/*                name={nyamuk.name}*/}
                            {/*                value={nyamuk.name}*/}
                            {/*                onChange={() => {this.onCheckBoxChange(nyamuk.id)}}*/}
                            {/*            />*/}
                            {/*            <label htmlFor={`custom-checkbox-${index}`} className="ml-2">{nyamuk.name}</label>*/}
                            {/*        </div>*/}
                            {/*    );*/}
                            {/*})}*/}
                        {/*<input*/}
                        {/*    type="number"*/}
                        {/*    className="form-control"*/}
                        {/*    id="cf_value"*/}
                        {/*    value={this.state.cf_value}*/}
                        {/*    onChange={this.onChangeCFValue}*/}
                        {/*    name="cf_value"*/}
                        {/*    min="0" max="1" step="0.1"*/}
                        {/*    maxLength="1"*/}
                        {/*/>*/}
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col text-center">
                                <button onClick={this.saveSymptom} className="btn btn-success m-3">
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
