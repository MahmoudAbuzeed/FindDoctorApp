import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { Route, Switch } from "react-router-dom";

import { Home, Login , Signup } from './pages';
import { NavBar } from './components';
import { Container } from "reactstrap";


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
          <Route path="/login" component={Login} exact />
          <Route path="/Signup" component={Signup} exact />

        </Switch>
      </ApolloProvider>
      </Container>
      </div>
    );
  }
} 

export default App;
