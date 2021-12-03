import React from 'react';
import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Route, Switch } from "react-router-dom";
import HomeMain from "./components/HomeMain";
import { useEffect } from "react";
//import { geolocated, GeolocatedProps } from "react-geolocated";
import { useDispatch } from "react-redux";
//import { setCoords } from "../src/redux/action";
import Weather from "../src/components/Weather";

function App() {
  const dispatch = useDispatch();
return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact render={() => <HomeMain />} />
        <Route path="/weather" exact render={() => <Weather />} />
        
        <Route
          render={() => (
            <>
              <br />
              <br />
              <h1 className="text-danger text-center m-5 p-5">
                404 - NOT FOUND
              </h1>
              <br />
            </>
          )}
        />
      </Switch>
    </Router>
  );
}
export default App;
