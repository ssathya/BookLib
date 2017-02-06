var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var moment = require('moment');

var BookInstanceSchema = Schema(
    {
        book: { type: Schema.ObjectId, ref: 'Book', required: true },
        imprint: { type: String, required: true },
        status: {
            type: String,
            required: true,
            enum: ['Available', 'Maintenance', 'Loaned', 'Reserved'],
            default: 'Maintenance'
        },
        dueDate: { type: Date, default: Date.now }
    },
    {collection:'BookInstances'}
);
BookInstanceSchema.virtual('url').get(function () {
    return '/catalog/bookInstance/' + this._id;
});
BookInstanceSchema.virtual('dueDateFormatted').get(function(){
    return moment(this.dueDate).format('MMMM Do, YYYY');
})
module.exports = mongoose.model('BookInstance', BookInstanceSchema);