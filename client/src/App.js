import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { Route, Switch } from "react-router-dom";

import { Home } from './pages';
import  Signup from './pages/Signup';
import  Login from './pages/Login';
import  Doctors from './pages/Doctors';
import  AddDoctor from './pages/AddDoctor';

import { NavBar } from './components';
import { Container } from "reactstrap";
import EditDoctor from "./pages/EditDoctor";


// apollo client setup
const client = new ApolloClient({
  uri: "http://localhost:5000/graphql"
});

class App extends Component {
  render() {
    return (
      <div>
      <NavBar />
      <Container>
      <ApolloProvider client={client}>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/Doctors" component={Doctors} exact />

          <Route path="/login" component={Login} exact />
          <Route path="/Signup" component={Signup} exact />
          <Route path="/AddDoctor" component={AddDoctor} exact />
          <Route path="/EditDoctor" component={EditDoctor} exact />

        </Switch>
      </ApolloProvider>
      </Container>
      </div>
    );
  }
} 

export default App;
