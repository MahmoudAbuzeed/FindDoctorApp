const graphql = require('graphql');


const Governorate = require('../model/governorate');
const Doctors = require('../model/doctors');
const Specialization = require('../model/specialization');
const UserPatient = require('../model/Users/patient');
const UserDoctor = require('../model/Users/doctor');


const {
   GovernorateType,
   DoctorsType,
   SpecializationType,
   UserPatientType,
   UserDoctorType
} = require('./types');



const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;

 
// ---------- Query ---------- //

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {



         // ---------- Return User and all Users ---------- //


         userPatient: {
            type: UserPatientType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return UserPatient.findById(args.id);
            }
        },
       
        userPatients: {
            type: new GraphQLList(UserPatientType),
            resolve(parent, args){
                return UserPatient.find({});
            }
        },

        userDoctor: {
            type: UserDoctorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return UserDoctor.findById(args.id);
            }
        },
       
        userDoctors: {
            type: new GraphQLList(UserDoctorType),
            resolve(parent, args){
                return UserDoctor.find({});
            }
        },
       // ---------- Return Governorate and all Governorates ---------- //
       governorate: {
           type: GovernorateType,
           args: {id: { type: GraphQLID} },
           resolve(parent ,args){
               return Governorate.findById(args.id)
           }
       },
       governorates: {
           type: new GraphQLList(GovernorateType),
           resolve(parent, args){
               return Governorate.find({});
           }
       },
   
       // ---------- Return specialization and all specializations ---------- //
   
       specialization: {
        type: SpecializationType,
        args: { id: { type: GraphQLID } },
        resolve(parent, args){
            return Specialization.findById(args.id);
        }
    },
       specializations: {
           type: new GraphQLList(SpecializationType),
           resolve(parent, args){
               return Specialization.find({});
           }
       },
   
       // ---------- Return Doctors and all Doctors ---------- //
       doctor: {
        type: DoctorsType,
        args: { id: { type: GraphQLID } },
        resolve(parent, args){
            return Doctors.findById(args.id);
        }
    },
       doctors: {
             type: new GraphQLList(DoctorsType),
             resolve(parent, args){
                 return Doctors.find({});
             }
       },
   
   
     
     
      
    }
});


// ---------- Mutation ---------- //

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addDoctors: { 
            type: DoctorsType,
            args: {
                name : { type: new GraphQLNonNull(GraphQLString) },
                certificates: { type: new GraphQLNonNull(GraphQLString) },
                telephone: { type: new GraphQLNonNull(GraphQLString) },
                address: { type: new GraphQLNonNull(GraphQLString) },
                fees: { type: new GraphQLNonNull(GraphQLString) },
                dates: { type: new GraphQLNonNull(GraphQLString) },
                governorateId: { type: new GraphQLNonNull(GraphQLString) },
                specializationId: { type: new GraphQLNonNull(GraphQLString) },

            },
            resolve(parent, args){
                let doctors = new Doctors({
                    name: args.name,
                    certificates: args.certificates,
                    telephone: args.telephone,
                    address: args.address,
                    fees: args.fees,
                    dates: args.dates,
                    governorateId: args.governorateId,
                    specializationId: args.specializationId
                });
                return doctors.save();
            }
        },


        addGovernorate: { 
            type: GovernorateType,
            args: {
                name : { type: new GraphQLNonNull(GraphQLString) },
                

            },
            resolve(parent, args){
                let governorate = new Governorate({
                    name: args.name,
                    
                });
                return governorate.save();
            }
        },
        addSpecialization: { 
            type: SpecializationType,
            args: {
                name : { type: new GraphQLNonNull(GraphQLString) },
                

            },
            resolve(parent, args){
                let specialization = new Specialization({
                    name: args.name,
                    
                });
                return specialization.save();
            }
        },

        addDoctorUser: { 
            type: UserDoctorType,
            args: {
                name : { type: new GraphQLNonNull(GraphQLString) },
                email : { type: new GraphQLNonNull(GraphQLString) },
                password : { type: new GraphQLNonNull(GraphQLString) },
                specialization : { type: new GraphQLNonNull(GraphQLString) },
                

            },
            resolve(parent, args){
                let userDoctor = new UserDoctor({
                    name: args.name,
                    email: args.email,
                    password: args.password,
                    specialization: args.specialization,
                    
                });
                return userDoctor.save();
            }
        },

        addPatientUser: { 
            type: UserPatientType,
            args: {
                name : { type: new GraphQLNonNull(GraphQLString) },
                email : { type: new GraphQLNonNull(GraphQLString) },
                password : { type: new GraphQLNonNull(GraphQLString) },
                

            },
            resolve(parent, args){
                let patientUser = new UserPatient({
                    name: args.name,
                    email: args.email,
                    password: args.password,
                    
                });
                return patientUser.save();
            }
        },

    }
})




module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});