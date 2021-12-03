import { Col, Container, Form, FormControl, Row } from "react-bootstrap";
import "./style.css";
import { BsSearch } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import { Link, NavLink } from "react-router-dom";
import { Home } from "../interfaces/index";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { setSearch } from "../redux/action/index"

import { useHistory } from "react-router";

function Navbar() {
  const [userName, setuserName] = useState<string>("");
  const user = useSelector((state: Home) => state.user);
  const weather = useSelector((state: Home) => state.weather);
  const dispatch = useDispatch();
  const history = useHistory();
  //
  const [DropDown, setDropDown] = useState(false);
  const closeDropdown = () => setDropDown(false);
  return (
    <div className="navContainer">
      <Container>
        <Row className="navBar">
          <Col xs="6" md="4" className="d-flex align-items-center my-1">
            <Link
              to="/"
              className="mr-3 navIcon"
              
            >
              <AiFillHome size="1.8rem" className="" />
            </Link>
            <div className="navSearch">
              <BsSearch className="mx-1" size="1.5rem" />
              <Form.Control
                value={weather.search}
                type="text"
                placeholder="...search"
                onChange={(e) => {
                  dispatch(setSearch(e.target.value));
                }}
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    history.push("/weather");
                  }
                }}
              />
            </div>
          </Col>
          <Col
            xs="6"
            md="8"
            className="d-flex align-items-center justify-content-end my-1"
          >
            {" "}
            <NavLink
              className="d-flex align-items-center navBtn font-weight-bold mr-2"
              exact
              to="/"
              activeClassName="selectedNavb"
              onClick={() => dispatch(setSearch(""))}
            >
              <span className="text-dropdown">Home</span>
            </NavLink> 
            {!user?.name ? (
              <FormControl
                className="nameInput"
                placeholder="...your name"
                value={userName}
                onChange={(e) => setuserName(e.target.value)}
               />
            ) : (
              <>
                <div className="separator mr-2"> </div>
                {/*  */}
                <div className="position-relative">
                  
                    <div
                      // activeClassName="selectedNavb"
                      // exact
                      // to="/profile"
                      className="navBtn profileName d-flex align-items-center mr-2"
                      onClick={() => setDropDown(!DropDown)}
                      onMouseEnter={() => setDropDown(!DropDown)}
                      onMouseOver={() => setDropDown(true)}
                    >
                      <h5 className="my-0">{user.name}</h5>{" "}
                    </div>
                   
             
                </div>
              </>
            
         
          )}
          </Col>
        </Row>
       
      </Container>
    </div>
  );
}

export default Navbar;