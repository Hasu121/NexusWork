const mongoose = require('mongoose');

const AffiliatedCompanySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
});

const AffiliatedCompany = mongoose.model('AffiliatedCompany', AffiliatedCompanySchema);
module.exports = AffiliatedCompany;
