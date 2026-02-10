const { v4: uuidv4 } = require('uuid');


const REQUIRED_FIELDS_CREATE = [
    "Id_Operation",
    "Numero",
    "Date_Publication",
    "Journal",
    "Delai",
    "Date_Overture",
    "adminId",
];

const generateIDS = () => {
    return uuidv4();
}
module.exports = {
    REQUIRED_FIELDS_CREATE,
    generateIDS
};