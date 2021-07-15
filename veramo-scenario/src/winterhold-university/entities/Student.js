const EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
    name: "Student", 
    tableName: "Student", 
    columns: {
        username : {
            type: "varchar"
        },
        password: {
            type: "varchar"
        },
        studentNo: {
            type: "varchar"
        },
        studentName: {
            type: "varchar"
        },
        studentPhoneNumber: {
            type: "varchar"
        }
    }
});
