import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./components/fontAwesome/Icons";

import Home from "./components/pages/Home";
import Contact from "./components/pages/Contact";
import Hotels from "./components/pages/Hotels";
import Navigation from "./components/layout/Nav";
import HotelDetail from "./components/pages/Detail";
import Create from "./components/pages/Create";
import Login from "./components/pages/Login";
import Admin from "./components/pages/Admin";
import './sass/styles.scss';

function App() {

  return (
        <Router>
            <Navigation />
            <Switch>
              <Route path="/" exact><Home /></Route>
              <Route path="/hotels" exact><Hotels /></Route>
              <Route path="/contact" exact><Contact /></Route>
              <Route path="/create" exact><Create /></Route>
              <Route path="/login" exact><Login /></Route>
              <Route path="/admin" exact><Admin /></Route>
              <Route path="/detail/:id" exact><HotelDetail /></Route>
            </Switch>
      </Router>
  );
}

export default App;