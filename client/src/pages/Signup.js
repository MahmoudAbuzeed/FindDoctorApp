import React, { Component } from 'react';
import { Button, FormGroup, Label, Input, Form } from 'reactstrap';
import { Link } from 'react-router-dom';
import * as compose from "lodash.flowright";
import { graphql } from "react-apollo";

import {addUserDoctorMutation, getSpecializationQuery } from "../queries/queries";

class Signup extends Component {
  
 
  constructor(props){
    super(props);
    this.state = {
        name: '',
        email: '',
        password: '',
        specialization: '',
        
    };
  }

  displaySpecialization(){
    var data = this.props.getSpecializationQuery;
    if(data.loading){
        return( <option disabled>Loading Specialization</option> );
    } else {
        return data.specializations.map(specialization => {
            return( <option key={ specialization.id } value={specialization.id}>{ specialization.name }</option> );
        });
    }
}

  

  _handleFormSubmit(e) {
    e.preventDefault()

    this.props.addUserDoctorMutation({
      variables: {
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
          specialization: this.state.specialization,
      },
      
      
      
  });
  this.props.history.push('/Login');
  
  
  }
  
  render() {
    return (
      <div style={{ padding: 20 }}>
        <h3>Create new account</h3>
        <hr />
        <Form onSubmit={this._handleFormSubmit.bind(this)}>
       
            <div>
              <FormGroup>
                <Label>Name</Label>
                <Input

                  name='name'
                  type='string'
                  placeholder='Your Name'

                  onChange={ (e) => this.setState({ name: e.target.value }) } 
                />

               
              </FormGroup>
              <FormGroup>
                <Label>Email</Label>
                <Input

                  name='email'
                  type='email'
                  placeholder='someone@example.com'

                  onChange={ (e) => this.setState({ email: e.target.value }) } 
                />
              </FormGroup>
              <FormGroup>
                <Label>Password</Label>
                <Input

                  name='password'
                  type='password'
                  placeholder='Your Password'

                  onChange={ (e) => this.setState({ password: e.target.value }) } 
                />

              </FormGroup>
              <FormGroup>
                <Label>Specialization</Label>
                <Input
                  name='specialization'
                  type='select'

                  onChange={ (e) => this.setState({ specialization: e.target.value }) } 
                >
                  <option>Select Specialization</option>
              { this.displaySpecialization() }
                </Input>

              </FormGroup>
              
              <Button color='primary'>
                Create Account
              </Button>
            </div>
     
        <Link to='/login'>Have an account? Sign In</Link>
        </Form>
      </div>
    );
  }
}



export default compose(
  graphql(getSpecializationQuery, { name: "getSpecializationQuery" }),
  graphql(addUserDoctorMutation, { name: "addUserDoctorMutation" })
)(Signup);