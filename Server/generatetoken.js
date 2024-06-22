
const jwt = require('jsonwebtoken');

const generateAuthToken = function(data){
    data = JSON.stringify(data);
    const token = jwt.sign(data , 'Scaler')
    return token;
}

module.exports = generateAuthToken;