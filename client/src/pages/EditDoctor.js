import React, { Component } from 'react';
import { Button, FormGroup, Label, Input, Form } from 'reactstrap';
import * as compose from "lodash.flowright";
import { graphql } from "react-apollo";

import {addDoctorMutation, getSpecializationQuery, getGovernoratesQuery, getDoctorsQuery } from "../queries/queries";

class EditDoctor extends Component {
  
 
  constructor(props){
    super(props);
    this.state = {
        name: '',
        certificates: '',
        address: '',
        telephone: '',
        fees: '',
        dates: '',
        specialization: '',
        governorate: '',
        
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
  displayGovernorate(){
    var data = this.props.getGovernoratesQuery;
    if(data.loading){
        return( <option disabled>Loading Governorate</option> );
    } else {
        return data.governorates.map(governorate => {
            return( <option key={ governorate.id } value={governorate.id}>{ governorate.name }</option> );
        });
    }
  }

  

  _handleFormSubmit(e) {
    e.preventDefault()

    this.props.addDoctorMutation({
      variables: {
          name: this.state.name,
          certificates: this.state.certificates,
          address: this.state.address,
          telephone: this.state.telephone,
          fees: this.state.fees,
          dates: this.state.dates,
          governorate: this.state.governorate,
          specialization: this.state.specialization,
      },

      refetchQueries: [{ query: getDoctorsQuery }]
      
      
  });
  this.props.history.push('/Doctors');
  
  
  }
  
  render() {
    return (
      <div style={{ padding: 20 }}>
        <h3>Update Doctor Info </h3>
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
                <Label>Certificates</Label>
                <Input

                  type='textarea'
                  placeholder='Type Your Certificates'

                  onChange={ (e) => this.setState({ certificates: e.target.value }) } 
                />
              </FormGroup>
              <FormGroup>
                <Label>Address</Label>
                <Input

                  type='textarea'
                  placeholder='Your Address'

                  onChange={ (e) => this.setState({ address: e.target.value }) } 
                />
              </FormGroup>
              <FormGroup>
                <Label>Mobile Number</Label>
                <Input

                  type='text'
                  placeholder='Your Mobile Number'

                  onChange={ (e) => this.setState({ telephone: e.target.value }) } 
                />
              </FormGroup>
              <FormGroup>
                <Label>Fees</Label>
                <Input

                  type='text'
                  placeholder='Your Fees'

                  onChange={ (e) => this.setState({ fees: e.target.value }) } 
                />
              </FormGroup>
              <FormGroup>
                <Label>Work Time</Label>
                <Input

                  type='text'
                  placeholder='Your Work Time'

                  onChange={ (e) => this.setState({ dates: e.target.value }) } 
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
              <FormGroup>
                <Label> Governorate</Label>
                <Input
                  name='governorate'
                  type='select'

                  onChange={ (e) => this.setState({ governorate: e.target.value }) } 
                >
                  <option>Select Governorate</option>
              { this.displayGovernorate() }
                </Input>

              </FormGroup>
              
              <Button color='success'>
                Update
              </Button>

              
            </div>
     
        
        </Form>

      </div>
    );
  }
}



export default compose(
  graphql(getSpecializationQuery, { name: "getSpecializationQuery" }),
  graphql(getGovernoratesQuery, { name: "getGovernoratesQuery" }),
  graphql(getDoctorsQuery, { name: "getDoctorsQuery" }),
  graphql(addDoctorMutation, { name: "addDoctorMutation" }),

)(EditDoctor);

