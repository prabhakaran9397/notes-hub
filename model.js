var DB = require('./database').DB;

var User = DB.Model.extend({
   tableName: 'students',
   idAttribute: 'id',
});

module.exports = {
   User: User
};