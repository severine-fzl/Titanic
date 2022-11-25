import mongoose from 'mongoose';

const PassengerSchema = new mongoose.Schema({
    PassengerId: Number,
    Survived: Number ,
    Pclass: Number,
    Name: String ,
    Sex: String,
    Age: Number ,
    SibSp: Number,
    Parch: Number,
    Ticket: String,
    Fare: Number,
    Cabin: String,
    Embarked: String
  });

const collectionName = 'passengers';
export const PassengerModel = mongoose.model('Passengers', PassengerSchema, collectionName);