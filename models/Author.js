var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var AuthorSchema = Schema({
    firstName: { type: String, required: true, max: 100 },
    lastName: { type: String, required: true, max: 100 },
    dateOfBirth: { type: Date },
    dateOfDeath: { type: Date }
},
    { collection: 'Authors' });

//Virtual for author full name
AuthorSchema.virtual('name')
    .get(function () {
        return this.lastName + ', ' + this.firstName;
    });
//Virtual for this author instance URL
AuthorSchema.virtual('url')
    .get(function () {
        return '/catalog/author/' + this._id;
    });

AuthorSchema.virtual('dateOfBirthFormatted').get(function () {
    return moment(this.dateOfBirth).format('MMMM Do, YYYY');
});
AuthorSchema.virtual('dateOfDeathFormatted').get(function () {
    return moment(this.dateOfDeath).format('MMMM Do, YYYY');
});
//Export model
module.exports = mongoose.model('Author', AuthorSchema);
