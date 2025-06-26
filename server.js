require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.json());
const userRouter = require('./api/users/user-router');
const petRouter = require('./api/pets/pets-router');


const allowedOrigins = ['http://localhost:3000', 'https://petconnection.netlify.app'];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true,
}));


// Routes for users and pets
app.use('/api', userRouter);
app.use('/api', petRouter);

const knex = require('./data/db-config'); 

knex.migrate.latest()
  .then(() => {
    console.log('✅ Migrations completed');
    return knex.seed.run();
  })
  .catch((err) => {
    console.error('❌ Migration or seed error:', err);
  });



app.get('/api/test' , (req, res) => {
    res.status(200).send('Test route is working')
})

app.get('/', (req, res) => {
    res.send('Server is up and running');
  });  

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log(`server started on port ${process.env.PORT || 9000}`);
});
