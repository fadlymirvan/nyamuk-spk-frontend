import React, { Component } from "react";
import WeightService from "../../services/weight.service";
import weightService from "../../services/weight.service";

export default class EditWeightComponent extends Component {
    constructor(props) {
        super(props);
        this.getWeight = this.getWeight.bind(this);
        this.onChangeWeightValue = this.onChangeWeightValue.bind(this);
        this.updateWeight = this.updateWeight.bind(this);
        this.cancelWeight = this.cancelWeight.bind(this);

        this.state = {
            currentWeight: {
                id: null,
                description: "",
                weight_value: 0,
            },
            message: ""
        }
    };

    componentDidMount() {
        this.getWeight(this.props.match.params.id);
    }

    getWeight(id) {
        weightService.get(id)
            .then(resp => {
                this.setState({
                    currentWeight: resp.data,
                });
            })
            .catch(err => {
                console.log(err);
            })
    }

    onChangeWeightValue(e) {
        const weight_value = e.target.value;
        this.setState((prevState) =>  {
            return {
                currentSymptom: {
                    ...prevState.currentWeight,
                    weight_value: weight_value,
                }
            };
        });
    }

    updateWeight() {
        WeightService.update(
            this.state.currentWeight.id,
            this.state.currentWeight
        )
            .then(resp => {
                console.log(resp.data);
                this.setState({
                    message: "Weight was updated successfully",
                });
                this.props.history.push("/weights");
            })
            .catch(err => {
                console.log(err);
            })
    }

    cancelWeight() {
        this.props.history.push("/weights");
    }

    render() {
        const { currentWeight } = this.state;
        return (
            <div className="submit-form">
                <div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input
                            type="text"
                            className="form-control"
                            id="description"
                            required
                            value={currentWeight.description}
                            name="description"
                            disabled={true}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="weight_value">Weight Value</label>
                        <input
                            type="number"
                            className="form-control"
                            id="weight_value"
                            value={currentWeight.weight_value}
                            onChange={this.onChangeWeightValue}
                            name="weight_value"
                        />
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col text-center">
                                <button onClick={this.updateWeight} className="btn btn-success m-3">
                                    Submit
                                </button>
                                <button onClick={this.cancelWeight} className="btn btn-danger">
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
