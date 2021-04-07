const URI = 'mongodb+srv://asproduct:asproduct@cluster0.adn0n.mongodb.net/asproduct?retryWrites=true&w=majority'
const DB_NAME = 'asProduct'

const SETTINGS = {
    useNewUrlParser: true,
    useUnifiedTopology:true
}

module.exports = { 
    ADDRESS: URI,
    OPTIONS: SETTINGS
}