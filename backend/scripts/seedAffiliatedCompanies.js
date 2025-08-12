const mongoose = require('mongoose');
const AffiliatedCompany = require('../models/affiliatedCompany');

mongoose.connect('mongodb://localhost:27017/nexuswork').then(async () => {
    console.log('Connected to MongoDB');
    const companies = [
        { name: 'Acme Corp' },
        { name: 'BetaSoft' },
        { name: 'GammaDev' }
    ];
    for (const company of companies) {
        await AffiliatedCompany.updateOne(company, company, { upsert: true });
    }
    console.log('Affiliated companies seeded.');
    mongoose.disconnect();
}).catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
});
