const EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
    name: "StudentDidInfo", 
    tableName: "StudentDidInfo", 
    columns: {
        did: {
            primary: true,
            type: "varchar",
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
