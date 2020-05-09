const graphql = require('graphql');


const Governorate = require('../model/governorate');
const Specialization = require('../model/specialization');
const Doctors = require('../model/doctors');







const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLList
    
} = graphql;






const UserPatientType = new GraphQLObjectType({
    name: "UserPatient",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        token: { type: GraphQLString },
        tokenExpiration: { type: GraphQLString },

        

    })
});

const UserDoctorType = new GraphQLObjectType({
    name: "UserDoctor",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        specialization: { type: GraphQLString },
        token: { type: GraphQLString },
        tokenExpiration: { type: GraphQLString },
        
        

    })
});


const GovernorateType = new GraphQLObjectType({
    name: "Governorate",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        doctors: {
            type: new GraphQLList(DoctorsType),
            resolve(parent, args){
                return Doctors.find({ governorateId: parent.id });
            }

        }

        

    })
});

const SpecializationType = new GraphQLObjectType({
    name: "Specialization",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        doctors: {
            type: new GraphQLList(DoctorsType),
            resolve(parent, args){
                return Doctors.find({ specializationId: parent.id });
            }

        }
        

    })
});


const DoctorsType = new GraphQLObjectType({
    name: "Doctors",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString},
        certificates: { type: GraphQLString},
        address: { type: GraphQLString},
        telephone: { type: GraphQLString},
        fees: { type: GraphQLString},
        dates: { type: GraphQLString},
        governorate: {
            type: GovernorateType,
            resolve(parent, args){
                return Governorate.findById(parent.governorateId)
            }
        },
        specialization: {
            type: SpecializationType,
            resolve(parent, args){
                return Specialization.findById(parent.specializationId)
            }
        },
    })
});



module.exports = {
    GovernorateType,
    DoctorsType,
    SpecializationType,
    UserPatientType,
    UserDoctorType,
    
}