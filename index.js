const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 6969;

const { graphqlHTTP } = require('express-graphql');
const schema = require('./Schemas');

//create graphql server
app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
    customFormatErrorFn: (err) => {
      return err.message;
    },
  })
);

app.listen(PORT, () => {
  console.log(`server running at ${PORT}`);
});
