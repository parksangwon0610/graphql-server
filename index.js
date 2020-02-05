const { ApolloServer, gql } = require('apollo-server');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/test',{
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
  console.log("connection to mongoDB");
})




const typeDefs = gql`
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }
`;


const books = [
    {
      title: 'Harry Potter and the Chamber of Secrets',
      author: 'J.K. Rowling',
    },
    {
      title: 'Jurassic Park',
      author: 'Michael Crichton',
    },
  ];


const resolvers = require('./resolve/resolvers').resolvers;


 
const server = new ApolloServer({ 
  typeDefs, 
  resolvers 
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}/${server.graphqlPath}`);
});