import React from "react";
import "./App.css";
import HeaderComponent from "./components/layout/header/header.component";
import SidebarComponent from "./components/layout/sidebar/sidebar.component";
import AppplicationComponent from "./components/pages/Application.component";
import LoanComponent from "./components/pages/City.component";
import ContactComponent from "./components/pages/Contact.component";
import OfficeComponent from "./components/pages/Office.component";
import CityComponent from "./components/pages/City.component";
import PaymentComponent from "./components/pages/Payment.component";
import MaturityComponent from "./components/pages/Maturity.component";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <HeaderComponent />
        <SidebarComponent />
        <Route path="/application" component={AppplicationComponent} />
        <Route path="/loan" component={LoanComponent} />
        <Route path="/contact" component={ContactComponent} />
        <Route path="/office" component={OfficeComponent} />
        <Route path="/city" component={CityComponent} />
        <Route path="/payment" component={PaymentComponent} />
        <Route path="/maturity" component={MaturityComponent} />
      </div>
    </Router>
  );
}

export default App;
