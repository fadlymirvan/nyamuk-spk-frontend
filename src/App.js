import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import SymptomsListComponent from "./components/symptons-component/symptoms-list.component";
import EditSymptomComponent from "./components/symptons-component/edit-symptom.component";
import AddSymptomComponent from "./components/symptons-component/add-symptom.component";
import WeightListComponent from "./components/weight-component/weight-list.component";
import EditWeightComponent from "./components/weight-component/edit-weight.component";
class App extends Component {
  render() {
    // Add NavBar
    return (
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark" style={{paddingLeft: '20%', paddingRight: '20%'}}>
            <a href="/symptoms" className="navbar-brand">
              Home
            </a>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/symptoms"} className="nav-link">
                  Gejala
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/weights"} className="nav-link">
                  Bobot
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/"} className="nav-link">
                  Tentang
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/"} className="nav-link">
                  Login
                </Link>
              </li>
            </div>
            <div className="navbar-nav float-right">
              <li className="nav-item">
                <Link to={"/"} className="nav-link">
                  Login
                </Link>
              </li>
            </div>
          </nav>
          <div className="container mt-3">
            <Switch>
              {/*Symptoms*/}
              <Route exact path={["/", "/symptoms"]} component={SymptomsListComponent} />
              <Route exact path="/add-symptoms" component={AddSymptomComponent} />
              <Route exact path="/symptoms/:id" component={EditSymptomComponent} />

              {/*Weights*/}
              <Route exact path="/weights" component={WeightListComponent} />
              <Route exact path="/weight/:id" component={EditWeightComponent} />
            </Switch>
          </div>
        </div>
    );
  }
}
export default App;
