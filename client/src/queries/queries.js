import { gql } from 'apollo-boost';



const getDoctorsQuery = gql`
{
    doctors {
        id
        name
        certificates
        address
        telephone
        fees
        dates
        governorate {
            name
        }
        specialization {
            name
        }
          

    }
}
`;



const getGovernoratesQuery = gql`
    {
        governorates {
            name
            id
        }
    }
`;


const getSpecializationQuery = gql`
    {
        specializations {
            name
            id
        }
    }
`;

const getUserDoctorQuery = gql`
query DoctorLogin($email: String!, $password: String!) {
    doctorLogin(email: $email, password: $password) {
      userId
      token
      tokenExpiration
    }
  }
`;


const addDoctorMutation = gql`
    mutation AddDoctors(
        $name: String!,
        $certificates: String!,
        $address: String!,
        $telephone: String!,
        $fees: String!,
        $dates: String!,
        $governorate: String!,
        $specialization: String!
        ){
            addDoctors(
            name: $name,
            certificates: $certificates,
            address: $address,
            telephone: $telephone,
            fees: $fees,
            dates: $dates,
            governorateId: $governorate,
            specializationId: $specialization,
              ){
            name
            id
        }
    }
`;

const addUserDoctorMutation = gql`
    mutation AddUserDoctor($name: String!, $email: String!, $specialization: String!, $password: String!){
        addUserDoctor(name: $name, email: $email, specialization: $specialization, password: $password){
            name
            id
        }
    }
`;

const addUserPatientMutation = gql`
    mutation AddUserPatient($name: String!, $email: String!, $password: String!){
        addUserPatient(name: $name, email: $email, password: $password){
            name
            id
        }
    }
`;




export { 
    getSpecializationQuery,
    getGovernoratesQuery,
    getDoctorsQuery,
    getUserDoctorQuery,

    addDoctorMutation,
    addUserDoctorMutation,
    addUserPatientMutation,
    


};