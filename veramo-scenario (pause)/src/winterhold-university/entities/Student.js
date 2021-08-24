const EntitySchema = require("typeorm").EntitySchema;
// 사용하지 않았음
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
