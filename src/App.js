import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Home from "./pages/home";
import DemoZone from "./pages/demo-zone";
import Tips from "./pages/tips";
import NotFound from "./pages/not-found";

import "./App.css";

const App = () => {
  const [jwt, setJwt] = useState(
    "eyJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiYmVuZGVjaHJhaSJ9.PkZzU7B63xX_ym5W6VLGBTyGMLpqTknamubHMpJCrxM"
  );
  //eyJhbGciOiJSUzI1NiJ9.eyJuYW1lIjoiYmVuZGVjaHJhaSJ9.L2DD-pQ6SHuejoNJM7U6cxj__wUXSCQQ5smfigs7Ldq9FRNKLjJHEW3vPr9SrKipptKGbMDJSMSwtC3mpQuKMsDeFUBk724yuRB3KwY935g36iluHPeo_0QL38yRK7vRjO13TWIYgT6L_9mriAxWYL_M4A9C9Nz_338J71dZYzY

  return (
    <Router>
      <div className="app">
        <h1>Hacking JWTs!</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/demo-zone/">Demo Zone</Link>
            </li>
            <li>
              <Link to="/tips/">Tips</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/demo-zone/">
            <DemoZone jwt={jwt} setJwt={setJwt} />
          </Route>
          <Route path="/tips/">
            <Tips />
          </Route>
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
