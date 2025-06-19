const validator = require('validator');

const validateEditProfile = (req) => {
    const allowedFields = [ 'firstname', 'lastname', 'photoURL', 'skills', 'about' ];

    const isEditAllowed = Object.keys(req.body).every(field => allowedFields.includes(field));

    return isEditAllowed;
}

module.exports = {
    validateEditProfile,
};