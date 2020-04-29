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
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLList
    
} = graphql;


const GovernorateType = new GraphQLObjectType({
    name: "Governorate",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString }
        

    })
});


const CardiologistType = new GraphQLObjectType({
    name: "Cardilogist",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString},
        certificates: { type: GraphQLString},
        telephone: { type: GraphQLString},
        fees: { type: GraphQLString},
        dates: { type: GraphQLString},
        governorate: {
            type: GovernorateType,
            resolve(parent, args){
                return Governorate.findById(parent.governorateId)
            }
        }
    })
});



module.exports = {
    GovernorateType,
    CardiologistType
}