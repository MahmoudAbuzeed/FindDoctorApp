import React, {Component, useState } from "react";
import { graphql } from 'react-apollo';
import * as compose from "lodash.flowright";
import {
    Card,
    Button,
    CardDeck,
    CardBody,
    Badge, 
    Collapse,
    Row,
    Col,
    CardText,
    Spinner,
    Form,
    Label,
    Input,
    FormGroup,
    ButtonGroup,
    
  } from 'reactstrap';

import { getDoctorsQuery, getSpecializationQuery , getGovernoratesQuery} from "../queries/queries";
import './Doctors.css';
import { Link } from "react-router-dom";





class Doctors extends Component {


  displaySpecialization(){
    let data = this.props.getSpecializationQuery;
    if(data.loading){
        return( <option disabled>Loading Specialization</option> );
    } else {
        return data.specializations.map(specialization => {
            return( <option key={ specialization.id } value={specialization.id}>{ specialization.name }</option> );
        });
    }
  }
  displayGovernorate(){
    let data = this.props.getGovernoratesQuery;
    if(data.loading){
        return( <option disabled>Loading Governorate</option> );
    } else {
        return data.governorates.map(governorate => {
            return( <option key={ governorate.id } value={governorate.id}>{ governorate.name }</option> );
        });
    }
  }


    displayDoctors(){
        let data = this.props.getDoctorsQuery;
        if(data.loading){
          return (<div className="text-center"><Spinner style={{ width: '3rem', height: '3rem' }} />{' '}</div>);
        } else {
          return data.doctors.map(doctor => {
            return(
                <CardDeck>
                <Card className="cardMargin" body inverse style={{ backgroundColor: '#333', borderColor: '#333' }} >
                  <CardBody key={doctor.id}>
                     <h2>{doctor.name} <Badge color="secondary">{doctor.specialization.name}</Badge></h2>
                     <CardText><h6>Certificates: {doctor.certificates}</h6></CardText>
                     <CardText><h6>Address: {doctor.address}</h6></CardText>
                     <CardText><h6>Telephone: {doctor.telephone}</h6></CardText>
                     <CardText><h6>Fees: {doctor.fees}</h6></CardText>
                     <CardText><h6>Dates: {doctor.dates}</h6></CardText>
                     <CardText><h6>Specialization: {doctor.specialization.name}</h6></CardText>
                     <CardText><h6>Governorate: {doctor.governorate.name}</h6></CardText>
                     <ButtonGroup>
                     <Link to="/EditDoctor">
                       <Button color="success"> Update</Button>
                       </Link> 	&nbsp;	&nbsp;	&nbsp;   
                        <Button color="danger">Delete</Button>
                    </ButtonGroup>

                  </CardBody>
                </Card>
                </CardDeck>
           
            )
          })
        }
    }
  render() {
    const FilterDoctors = (props) => {
      const [isOpen, setIsOpen] = useState(false);
    
      const toggle = () => setIsOpen(!isOpen);
    
      return (
        <div className="collapseMargin ">
          <Button className="text-center"  color="success" onClick={toggle} style={{ marginBottom: '1rem' }}>Filter Doctors</Button>
          <Collapse isOpen={isOpen}>
            <Form>
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
              
              <Button color='primary'>
                Filter
              </Button>
 
        </Form>
          
          </Collapse>
        </div>
      );
    }
    
    return (
      
      <div className="main ">
        <Row>
        <Col xs="10" ><FilterDoctors /></Col>
        <Col ><Link to="/AddDoctor">
          <Button
           className="text-center"
           color="success"
           style={{ marginBottom: '1rem' }}>
              Add Doctor
          </Button>
          </Link>
        </Col>
        
        </Row>
        {this.displayDoctors()}
    
      </div>
      
    );
  }
}


export default compose(
  graphql(getSpecializationQuery, { name: "getSpecializationQuery" }),
  graphql(getGovernoratesQuery, { name: "getGovernoratesQuery" }),
  graphql(getDoctorsQuery, { name: "getDoctorsQuery" }),

)(Doctors);

