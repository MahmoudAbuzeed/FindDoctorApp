const graphql = require('graphql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



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
   UserDoctorType,
   
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

       // ---------- Login ---------- //
       doctorLogin: {
        type: UserDoctorType,
        args: {
             email: { type: GraphQLString},
             password: { type: GraphQLString}

         },
         resolve: async(parent, args)=>{
            const doctor = await UserDoctor.findOne({ email: args.email });
            if (!doctor) {
                throw new Error('User does not exist!');
              }
              const isEqual = await bcrypt.compare(args.password, doctor.password);
              if (!isEqual) {
                throw new Error('Password is incorrect!');
              }
              const token = jwt.sign(
                { userId: doctor.id, email: doctor.email },
                'somesupersecretkey',
                {
                  expiresIn: '7d'
                }
              );
              return {email: doctor.email, id: doctor.id, token: token, tokenExpiration: 1 };
              
            }
   
    },

    patientLogin: {
        type: UserPatientType,
        args: {
             email: { type: GraphQLString},
             password: { type: GraphQLString},
             

         },
        resolve: async(parent, args)=>{
            const patient = await UserPatient.findOne({ email: args.email });
            if (!patient) {
                throw new Error('User does not exist!');
              }
              const isEqual = await bcrypt.compare(args.password, patient.password);
              if (!isEqual) {
                throw new Error('Password is incorrect!');
              }
              const token = jwt.sign(
                { userId: patient.id, email: patient.email },
                'somesupersecretkey',
                {
                  expiresIn: '7d'
                }
              );
              return {id: patient.id, token: token, tokenExpiration: 1 };
            }
      
    
    
          
        
        
        
    },




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
            resolve(parent, args, req){
                /*if(!req.isAuth) {
                    throw new Error('Unauthenticated!');
                  }*/
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
            resolve(parent, args, req){
                if(!req.isAuth) {
                    throw new Error('Unauthenticated!');
                  }
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
            resolve(parent, args, req){
                if(!req.isAuth) {
                    throw new Error('Unauthenticated!');
                  }
                let specialization = new Specialization({
                    name: args.name,
                    
                });
                return specialization.save();
            }
        },

        addUserDoctor: { 
            type: UserDoctorType,
            args: {
                name : { type: new GraphQLNonNull(GraphQLString) },
                email : { type: new GraphQLNonNull(GraphQLString) },
                password : { type: new GraphQLNonNull(GraphQLString) },
                specialization : { type: new GraphQLNonNull(GraphQLString) },
                

            },
            resolve: async (parent, args, req) =>{
                
                try {
                    const existingUser = await UserDoctor.findOne({ email: args.email });
                    if (existingUser) {
                      throw new Error('User exists already.');
                    }
                return bcrypt
                .hash(args.password, 10)
               .then(hash => {
               args.password = hash;
                let userDoctor = new UserDoctor({
                    name: args.name,
                    email: args.email,
                    password: args.password,
                    specialization: args.specialization,
                    
                });
                return userDoctor.save();
            })
        
            }catch (err) {
                throw err;
              }
            }
        
        },

        addUserPatient: { 
            type: UserPatientType,
            args: {
                name : { type: new GraphQLNonNull(GraphQLString) },
                email : { type: new GraphQLNonNull(GraphQLString) } ,
                password : { type: new GraphQLNonNull(GraphQLString) },
                

            },
            resolve: async (parent, args, req) => {
                
                try {
                const existingUser = await UserPatient.findOne({ email: args.email });
                if (existingUser) {
                  throw new Error('User exists already.');
                }
                return bcrypt
                .hash(args.password, 10)
               .then(hash => {
               args.password = hash;
               
                let userPatient = new UserPatient({
                    name: args.name,
                    email: args.email,
                    password: args.password,
                    
                });
                return userPatient.save();
            })
        }catch (err) {
            throw err;
          }
        

            }
        },


        deleteDoctor: {
            type: DoctorsType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parent, args, req){
               /* if(!req.isAuth) {
                    throw new Error('Unauthenticated!');
                    
                  } */
                  return Doctors.findByIdAndDelete(args.id); 
            }
        },


        updateDoctor: {
            type: DoctorsType,
            args: {
                id: { type: GraphQLID },
                name: { type: GraphQLString },
                certificates: { type: GraphQLString },
                telephone: { type: GraphQLString },
                address: { type: GraphQLString },
                fees: { type: GraphQLString },
                dates: { type: GraphQLString },
                governorateId: { type: GraphQLString },
                specializationId: { type: GraphQLString },
                
            },
            resolve(parent, args, req){
               /* if(!req.isAuth) {
                    throw new Error('Unauthenticated!');
                    
                  } */
                  return Doctors.findByIdAndUpdate({"_id" : args.id},
                    { "$set":{
                        name: args.name,
                        certificates: args.certificates,
                        telephone: args.telephone,
                        address: args.address,
                        fees: args.fees,
                        dates: args.dates,
                        governorateId: args.governorateId,
                        specializationId: args.specializationId,
                    }},
                    {"new": true} 
                     ); 
            }
        },

    }
})




module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});