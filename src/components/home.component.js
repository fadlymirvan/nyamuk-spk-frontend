import React, { Component } from "react";
import UserService from "../services/user.service";
import logo from '../logo-nyamuk.svg';
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
        });
    }

    render() {
        const { isJenisNyamuk, jenisNyamuk } = this.state;
        let url = "https://www.google.com/search?q=" + jenisNyamuk;
        if (this.state.content !== null) {
            const { gejala } = this.state.content;
            return (
                <div className="container">
                    <header className="jumbotron pb-5">
                        <h3 className="text-center">Diagnosa Penyakit Akibat Gigitan Nyamuk</h3>
                        <div className="media">
                            <div className="media-body">
                                <img src={logo} width="75%" alt="logo" />
                            </div>
                            <div className="media-body">
                                <p>
                                    Sistem diagnosa penyakit akibat gigitan nyamuk adalah sistem yang dibuat untuk
                                    membantu pengguna dalam mengetahui penyebab dari gejala yang dirasakan sehingga
                                    pengguna dapat melakukan tindakan yang tepat. Sistem ini menggunakan metode
                                    <strong> Naïve Bayes</strong> dalam melakukan perhitungan prediksi terkait gejala
                                    yang dirasakan pengguna dengan klasifikasi gejala dari gigitan nyamuk tertentu. Hasil
                                    dari diagnosa ini dapat dijadikan acuan pengguna dalam menangani gejala yang
                                    dirasakan oleh pengguna karena data gejala yang tertera sudah berdasarkan
                                    dengan data dari pakar. Untuk tindakan penanganan lebih lanjut, dapat langsung
                                    menghubungi dokter di rumah sakit.
                                </p>
                            </div>
                        </div>
                    </header>
                    <h5>Silahkan Pilih Daftar Gejala yang Anda Rasakan:</h5>
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
                            <h5>
                                Dari gejala yang dialami, kemungkinan penyebab dari gejala yang dirasa adalah karena
                                gigitan nyamuk <a href={url} target="_blank"><u><strong>{jenisNyamuk}</strong></u></a>.
                                Pengguna disarankan untuk melakukan konsultasi lebih lanjut dengan dokter.
                            </h5>

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
