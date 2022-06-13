import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import SymptomsListComponent from "./components/symptons-component/symptoms-list.component";
import EditSymptomComponent from "./components/symptons-component/edit-symptom.component";
import AddSymptomComponent from "./components/symptons-component/add-symptom.component";
import WeightListComponent from "./components/weight-component/weight-list.component";
import EditWeightComponent from "./components/weight-component/edit-weight.component";
import Home from "./components/home.component";
import LoginComponent from "./components/auth-component/login.component";
import RegisterComponent from "./components/auth-component/register.component";
import Profile from "./components/auth-component/profile.component";
import AuthService from "./services/auth.service";
class App extends Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);
        this.state = {
            showAdminBoard: false,
            currentUser: undefined,
        };
    }

    componentDidMount() {
        const roles = AuthService.getCurrentUserRoles();
        const user = AuthService.getCurrentUser()
            .then(resp => {
                return resp.data;
            });
        if (user && roles) {
            this.setState({
                currentUser: user,
                showAdminBoard: roles.includes("ROLE_ADMIN"),
            });
        }
    }
    logOut() {
        AuthService.logout();
        this.setState({
            showAdminBoard: false
        });
    }

  render() {
      const { currentUser, showAdminBoard } = this.state;
    // Add NavBar
    return (
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark" style={{paddingLeft: '20%', paddingRight: '20%'}}>
            <a href="/" className="navbar-brand">
              Home
            </a>
            <div className="navbar-nav mr-auto">
                {showAdminBoard && (
                    <li className="nav-item">
                        <Link to={"/symptoms"} className="nav-link">
                            Gejala
                        </Link>
                    </li>
                )}

                {/*{showAdminBoard && (*/}
                {/*    <li className="nav-item">*/}
                {/*        <Link to={"/weights"} className="nav-link">*/}
                {/*            Bobot*/}
                {/*        </Link>*/}
                {/*    </li>*/}
                {/*)}*/}

              <li className="nav-item">
                <Link to={"/about"} className="nav-link">
                  Tentang
                </Link>
              </li>
            </div>

              {currentUser ? (
                  <div className="navbar-nav ml-auto">
                      {/*<li className="nav-item">*/}
                      {/*    <Link to={"/profile"} className="nav-link">*/}
                      {/*        {currentUser.username}*/}
                      {/*    </Link>*/}
                      {/*</li>*/}
                      <li className="nav-item">
                          <a href="/login" className="nav-link" onClick={this.logOut}>
                              Logout
                          </a>
                      </li>
                  </div>
              ) : (
                  <div className="navbar-nav ml-auto">
                      <li className="nav-item">
                          <Link to={"/login"} className="nav-link">
                              Login
                          </Link>
                      </li>
                      {/*<li className="nav-item">*/}
                      {/*    <Link to={"/register"} className="nav-link">*/}
                      {/*        Sign Up*/}
                      {/*    </Link>*/}
                      {/*</li>*/}
                  </div>
              )}
          </nav>
          <div className="container mt-3">
            <Switch>
              {/*Symptoms*/}
              <Route exact path="/symptoms" component={SymptomsListComponent} />
              <Route exact path="/add-symptoms" component={AddSymptomComponent} />
              <Route exact path="/symptoms/:id" component={EditSymptomComponent} />

              {/*Weights*/}
              {/*<Route exact path="/weights" component={WeightListComponent} />*/}
              {/*<Route exact path="/weight/:id" component={EditWeightComponent} />*/}

                <Route exact path={["/", "/home"]} component={Home} />
                <Route exact path="/login" component={LoginComponent} />
                {/*<Route exact path="/register" component={RegisterComponent} />*/}
                {/*<Route exact path="/profile" component={Profile} />*/}


                <Route exact path="/about" component={Home} />
            </Switch>
          </div>
        </div>
    );
  }
}
export default App;
