import React, { Component } from "react";
import WeightService from "../../services/weight.service";
import {Button, Modal} from "react-bootstrap";

export default class WeightListComponent extends Component {
    constructor(props) {
        super(props);
        this.retrieveAllWeights = this.retrieveAllWeights.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.editWeight = this.editWeight.bind(this);
        this.state = {
            listWeights: [],
        };
    }


    componentDidMount() {
        this.retrieveAllWeights();
    }

    retrieveAllWeights() {
        WeightService.getAll()
            .then(resp => {
                this.setState({
                    listWeights: resp.data,
                });
            })
            .catch(err => {
                console.log(err);
            })
    }

    refreshList() {
        this.retrieveAllWeights();
    }

    editWeight(id) {
        this.props.history.push(`/weight/${id}`);
    }

    render() {
        const { listWeights } = this.state;
        return (
            <div className="list row">
                <div className="col-xs-10">
                    <h4>Daftar Bobot</h4>
                    <table className="table">
                        <thead>
                        <tr>
                            <th style={{width: '800px'}}>Description</th>
                            <th style={{width: '400px'}}>Value</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {listWeights &&
                            listWeights.map((weight, index) => (
                                <tr key={weight.id}>
                                    <td>{weight.description}</td>
                                    <td>{weight.weight_value}</td>
                                    <td>
                                        <a className="btn btn-primary" title="Edit"
                                           onClick={() => { this.editWeight(weight.id) }}
                                        >
                                            Edit
                                        </a>
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
