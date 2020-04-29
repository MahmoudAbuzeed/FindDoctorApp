const graphql = require('graphql');


const Cardiologist = require('../models/Doctors/cardiologist-model');
const Dentist = require('../models/Doctors/dentist-model');
const Dermatologist = require('../models/Doctors/dermatologist-model');
const Inernist = require('../models/Doctors/inernist-model');
const Orthopedist = require('../models/Doctors/orthopedist-model');
const Physiotherapist = require('../models/Doctors/physiotherapist-model');
const PlasticSurgeon = require('../models/Doctors/plasticSurgeon-model');
const Surgery = require('../models/Doctors/surgery-model');
const Urologist = require('../models/Doctors/urologist-model');
const Governorate = require('../models/governorate-model');


const {
   GovernorateType,
   CardiologistType
} = require('./types');



const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
} = graphql;


// ---------- Query ---------- //

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {

       // ---------- Return Governorate and all Governorates ---------- //
       governorate: {
        type: GovernorateType,
        args : {id: { type: GraphQLID}},
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




       // ---------- Return Cardiologist and all Cardiologists ---------- //
      cardiologist: {
          type: CardiologistType,
          args: {id: { type: GraphQLID } },
          reslove(parent, args){
              return Cardiologist.findById(args.id);
          }
      },
      cardiologists: {
          type: new GraphQLList(CardiologistType),
          resolve(parent, args){
              return Cardiologist.find({});
          }
      },
  
   
    }
});


// ---------- Mutation ---------- //

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addCardilogist: { 
            type: CardiologistType,
            args: {
                name : {type: GraphQLString},
                certificates: {type: GraphQLString},
                telephone: {type: GraphQLString},
                fees: {type: GraphQLString},
                dates: {type: GraphQLString},
                governorateId: {type: GraphQLString}

            },
            resolve(parent, args){
                let cardiologist = new Cardiologist({
                    name: args.name,
                    certificates: args.certificates,
                    telephone: args.telephone,
                    fees: args.fees,
                    dates: args.dates,
                    governorateId: args.governorateId
                });
                return cardiologist.save();
            }
        },


        addGovernorate: { 
            type: GovernorateType,
            args: {
                name : {type: GraphQLString},
                

            },
            resolve(parent, args){
                let governorate = new Governorate({
                    name: args.name,
                    
                });
                return governorate.save();
            }
        },

    }
})




module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});