import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./pages/home";
import Tips from "./pages/tips";
import NotFound from "./pages/not-found";

import { Container, Form, Navbar } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css";

const App = () => {
  const [jwt, setJwt] = useState(
    "eyJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiYmVuZGVjaHJhaSJ9.PkZzU7B63xX_ym5W6VLGBTyGMLpqTknamubHMpJCrxM"
  );

  const [implementation, setImplementation] = useState('regular')

  return (
    <Router>
      <Navbar bg="dark" variant="dark" expand="sm">
        <Container fluid>
          <Navbar.Brand href="/"><h1>Hacking JWTs</h1></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Form inline className="ml-auto">
              <Form.Group controlId="exampleForm.SelectCustom">
                <Form.Label className="mr-2 text-light">Implementation Type</Form.Label>
                <Form.Control as="select" onChange={ev => setImplementation(ev.target.value)}>
                  <option value="regular">Using an SDK</option>
                  <option value="ignore-signature">Code Ignores Signature</option>
                  <option value="allow-none">Supports alg: "none"</option>
                  <option value="trust-algorithm">Trusts token header.alg</option>
                </Form.Control>
              </Form.Group>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Switch>
        <Route path="/" exact >
          <Home jwt={jwt} setJwt={setJwt} implementation={implementation} />
        </Route>
        <Route path="/tips/">
          <Tips />
        </Route>
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;
