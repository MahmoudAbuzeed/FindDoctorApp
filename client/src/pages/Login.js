import React, { Component } from 'react';
import {
  Button,
  FormGroup,
  Label,
  Input,
  Form,
  
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { graphql } from "react-apollo";
import * as compose from "lodash.flowright";
import { getUserDoctorQuery,  } from "../queries/queries";





class Login extends Component {

  constructor(props) {
    super(props);
    this.emailEl = React.createRef();
    this.passwordEl = React.createRef();
  }


  submitForm(e) {
    e.preventDefault();
    this.props.getUserDoctorQuery({
      variables: {
        email: this.state.email,
        password: this.state.password,
        
      },
     
    });
    this.props.history.push('/');
  }
  
  

  render() {
    return (
      <div style={{ padding: 20 }}>
        <h3>Sign in to your account</h3>
        <hr />

      

        <Form onSubmit={this.submitForm.bind(this)}>
            <div>
              <FormGroup>
                <Label>Email</Label>
                <Input

                  name='email'
                  type='email'
                  placeholder='someone@example.com'
                  onChange={e => this.setState({ email: e.target.value })}

                />

              </FormGroup>
              <FormGroup>
                <Label>Password</Label>
                <Input

                  name='password'
                  type='password'
                  placeholder='Your Password'
                  onChange={e => this.setState({ passowrd: e.target.value })}
                />
               
              </FormGroup>
              <Button
                color='primary'
                block
              >
                Sign In
              </Button>
            </div>
        <Link to='/signup'>Do not have an account? Sign Up Now</Link>
        </Form>
      </div>
    );
  }
}


export default compose(
  graphql(getUserDoctorQuery, { name: "getUserDoctorQuery" })
)(Login);