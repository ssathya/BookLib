var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GenreScheam = Schema(
    {
        name: { type: String, required: true, max: 100, min: 3 }
    },
    {collection: 'Genres'}
);
GenreScheam.virtual('url').get(function () {
    return '/catalog/genre/' + this._id;
});

//Export model
module.exports = mongoose.model('Genre', GenreScheam);