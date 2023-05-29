import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Link } from "react-router-dom";
import React, {Component} from "react";

import Addtkdapp from "./components/add-tkdapp.component";
import TkdappList from "./components/tkdapp-list.component";
import Login from './components/login.component';

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/tkdapp" className="navbar-brand">
            btoArriola
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/tkdapp"} className="nav-link">
                Tkdapp
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <h2>Poomsae social media</h2>
          </div>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="add" element={<Addtkdapp />} />
            <Route path="/tkdapp" element={<TkdappList />} />

          </Routes>
        
      </div>
    );
  }
}
export default App;
