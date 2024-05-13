const { MONGO_DB, M_CONNECT } = require('./config/mongoDB');

exports.createNote = async (payload) => {
    
    const db = (await M_CONNECT).db('Codeeditor');
    let collection = await db.collection('cedit');
    let res = await collection.insertOne(payload);
    return res.insertedId;
}

exports.fetchAllNotes = async (query) => {
    const db = (await M_CONNECT).db('Codeeditor');
    let collection = await db.collection('cedit');
    let res = await collection.find(query).sort({ createdAt: -1 }).toArray(); // want newly created notes on the top. 
    return res;
}

exports.updateNote = async (id, payload) => {
    const db = (await M_CONNECT).db('Codeeditor');
    let collection = await db.collection('cedit');

    await collection.updateOne(
        { '_id': new MONGO_DB.ObjectId(id) },
        { $set: payload }
    );
    return true;
}

exports.deleteNote = async (id) => {
    const db = (await M_CONNECT).db('Codeeditor');
    let collection = await db.collection('cedit');

    const response = await collection.deleteOne(
        { '_id': MONGO_DB.ObjectID(id) }
    );

    if (!(response.result.n == 1)) {
        throw new Error('Error while deleting note');
    }
    return response.n;
}