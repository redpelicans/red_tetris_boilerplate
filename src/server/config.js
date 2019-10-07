const mongoose = require('mongoose');

export default async function connectToDatabase(uri) {
    try {
	await mongoose.connect(uri, { urlNewUrlParser: true });
	await mongoose.set('useFindAndModify', false);

    } catch (err) {
	console.log(err);
	process.exit(1);
    }
}



