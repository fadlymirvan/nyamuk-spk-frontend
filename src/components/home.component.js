import React, { Component } from "react";
import UserService from "../services/user.service";
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.retrieveAllData = this.retrieveAllData.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.calculateSymptoms = this.calculateSymptoms.bind(this);
        this.state = {
            content: null,
            checkedBox: [],
            checked: null
        }
    }

    componentDidMount() {
        this.retrieveAllData();
    }

    retrieveAllData() {
        UserService.getPublicContent().then(
            response => {
                this.setState({
                    content: response.data
                });
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

    handleOnChange(e) {
        const { checkedBox } = this.state;
        const index = parseInt(e.target.value);
        let newCheckedBox = [...checkedBox];
        newCheckedBox[index] = e.target.checked;

        this.setState({
            checkedBox: newCheckedBox
        });
    }

    calculateSymptoms() {
        console.log(this.state);
        const { content, checkedBox } = this.state;
        const probNyamuk = content.prob_jenis_nyamuk;
        const probGejala = content.prob_gejala;
        const jenisNyamukLength = content.jenis_nyamuk_length
        const indices = checkedBox.reduce(
            (out, bool, index) => bool ? out.concat(index) : out,
            []
        );
        let arrProbFinal = [];
        console.log(indices);
        let resProbGejala = 0;
        indices.forEach(index => {
            let gejalaRatio =
                probGejala[index] / jenisNyamukLength;
            resProbGejala = resProbGejala === 0 ?
                gejalaRatio :
                resProbGejala * gejalaRatio;
        });

        console.log(resProbGejala);

        probNyamuk.forEach(nyamuk => {
            let probFinal = nyamuk * resProbGejala;
            arrProbFinal.push(probFinal);
        })

        console.log(arrProbFinal);
    }

    render() {
        if (this.state.content !== null) {
            const { gejala } = this.state.content;
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
                                    value={index}
                                    checked={this.state.checked}
                                    onChange={this.handleOnChange}
                                />
                                <label htmlFor={`custom-checkbox-${index}`} className="ml-2 form-check-label">
                                    {gejala.code} - {gejala.name}
                                </label>
                            </div>
                        );
                    })}
                    <div className="container">
                        <div className="row">
                            <div className="col text-center">
                                <button
                                    onClick={this.calculateSymptoms}
                                    className="btn btn-success m-3"
                                >
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
