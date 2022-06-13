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
            jenisNyamuk: "",
            isJenisNyamuk: false
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
        const gejala = content.gejala;
        const jenisNyamukLength = content.jenis_nyamuk_length;
        const dataLength = content.data_length;
        const jenisNyamuk = [
            {
                name: "Demam Berdarah"
            },
            {
                name: "Malaria"
            },
            {
                name: "Chikungunya"
            }
        ]
        const indices = checkedBox.reduce(
            (out, bool, index) => bool ? out.concat(index) : out,
            []
        );

        const isTrue = (data) => {
            return data ? 1 : 0;
        }

        let arrResult = [];
        for (let i=0; i<jenisNyamukLength; i++) {
            let resProbGejala = 0;
            let mulResProb = 0;
            indices.forEach(index => {
                let calc = (isTrue(gejala[index][`N0${i+1}`]) + (dataLength * (1/jenisNyamukLength))) / (1 + dataLength);
                resProbGejala += calc;
                mulResProb = mulResProb === 0 ? calc : mulResProb * calc;
            });
            let Pn = (resProbGejala / jenisNyamukLength) * mulResProb;
            arrResult.push(Pn);
        }

        let maxValIndex = arrResult.reduce((index, x, i, arr) => x > arr[index] ? i : index, 0);
        console.log(arrResult[maxValIndex], jenisNyamuk[maxValIndex].name);

        this.setState({
            jenisNyamuk: jenisNyamuk[maxValIndex].name,
            isJenisNyamuk: true
        })
    }

    render() {
        if (this.state.content !== null) {
            const { gejala, isJenisNyamuk, jenisNyamuk } = this.state.content;
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
                    {isJenisNyamuk ?
                        <div className="container">
                            <h3>{jenisNyamuk}</h3>
                        </div> :
                        <div></div>}
                </div>
            );
        } else {
            return (
                <div></div>
            )
        }
    }
}
