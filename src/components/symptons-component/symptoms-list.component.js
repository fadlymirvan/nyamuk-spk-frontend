import React, { Component } from "react";
import SymptomsService from "../../services/symptoms.service";
import {Button, Modal} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faXmark} from "@fortawesome/free-solid-svg-icons";

export default class SymptomsListComponent extends Component {
    constructor(props) {
        super(props);
        this.retrieveAllSymptoms = this.retrieveAllSymptoms.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.addSymptom = this.addSymptom.bind(this);
        this.deleteSymptom = this.deleteSymptom.bind(this);
        this.editSymptom = this.editSymptom.bind(this);
        this.showModals = this.showModals.bind(this);
        this.closeModals = this.closeModals.bind(this);
        this.state = {
            listSymptoms: [],
            currentSymptom: null,
            currentIndex: -1,
            showModals: false,
        };
    }

    showModals() {
        this.setState({
            showModals: true
        });
    }

    closeModals() {
        this.setState({
            showModals: false
        });
    }

    componentDidMount() {
        this.retrieveAllSymptoms();
    }

    retrieveAllSymptoms() {
        SymptomsService.getAll()
            .then(resp => {
                this.setState({
                    listSymptoms: resp.data
                });
                console.log(resp.data);
            })
            .catch(err => {
                console.log(err);
            });
    }

    refreshList() {
        this.retrieveAllSymptoms();
        this.setState({
            currentSymptom: null,
            currentIndex: -1,
        });
    }

    addSymptom() {
        this.props.history.push(`/add-symptoms`);
    }

    editSymptom(id) {
        this.props.history.push(`/symptoms/${id}`);
    }

    deleteSymptom(id) {
        SymptomsService.delete(id)
            .then(resp => {
                console.log(resp);
                this.refreshList();
                this.closeModals();
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        const { listSymptoms } = this.state;
        return (
            <div className="list row">
                <div className="col-xs-10">
                    <h4>Daftar Gejala</h4>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 text-right">
                                <button
                                    className="btn btn-success"
                                    type="button"
                                    onClick={() => { this.addSymptom() }}
                                >
                                    Add Gejala
                                </button>
                            </div>
                        </div>
                    </div>
                    <table className="table mt-2">
                        <thead style={{
                            textAlign:"center",
                        }}>
                        <tr>
                            <th rowSpan={2} className="align-middle">Code</th>
                            <th rowSpan={2} className="align-middle" style={{width: '500px'}}>Name</th>
                            <th colSpan={3}>Jenis Nyamuk</th>
                            <th rowSpan={2} className="align-middle" style={{width: '200px'}}>Action</th>
                        </tr>
                        <tr>
                            <th style={{width: '200px'}}>Demam Berdarah</th>
                            <th>Malaria</th>
                            <th>Chikungunya</th>
                        </tr>
                        </thead>
                        <tbody>
                        {listSymptoms &&
                            listSymptoms.map((symptom, index) => (
                                <tr key={symptom.id} style={{
                                    textAlign:"center",
                                }}>
                                    <td>{symptom.code}</td>
                                    <td>{symptom.name}</td>
                                    <td>
                                        {symptom.N01 ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faXmark} />}
                                    </td>
                                    <td>
                                        {symptom.N02 ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faXmark} />}
                                    </td>
                                    <td>
                                        {symptom.N03 ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faXmark} />}
                                    </td>
                                    <td>
                                        <a className="btn btn-primary mr-2" title="Edit"
                                           onClick={() => { this.editSymptom(symptom.id) }}
                                        >
                                            Edit
                                        </a>
                                        <a className="btn btn-danger" title="Delete"
                                           onClick={() => { this.showModals() }}
                                        >
                                            Delete
                                        </a>
                                        <Modal show={this.state.showModals} onHide={ this.closeModals } cl>
                                            <Modal.Header>
                                                <Modal.Title>Alert</Modal.Title>
                                                <Button variant="light" onClick={this.closeModals}>
                                                    X
                                                </Button>
                                            </Modal.Header>
                                            <Modal.Body>
                                                Are you sure want to Delete this Gejala?
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="primary" onClick={() => { this.deleteSymptom(symptom.id) }}>
                                                    Yes
                                                </Button>
                                                <Button variant="secondary" onClick={() => { this.closeModals() }}>
                                                    Cancel
                                                </Button>
                                            </Modal.Footer>
                                        </Modal>
                                    </td>
                                </tr>
                            ))}


                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
