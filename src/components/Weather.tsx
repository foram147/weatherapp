import React, { useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import "./style.css";
import Card from "./Card";
import { useDispatch, useSelector } from "react-redux";
import { Home } from "../interfaces/index";
import { runSearch } from "../redux/action/index";

function Weather() {
  const weather = useSelector((state: Home) => state.weather);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(runSearch());
  }, []);

  return (
    <Container>
      <br />
      <Row>
        <Card />
        {weather.loading && (
          <div className="text-center w-100">
            <h1 className="text-muted">Search city</h1>
          </div>
        )}
      </Row>
    </Container>
  );
}

export default Weather;