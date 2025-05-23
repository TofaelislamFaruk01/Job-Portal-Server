const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 3000;
const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'https://job-portal-70de2.web.app'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // allow the request
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
};


app.use(cors(corsOptions));
// app.use(cors());
app.use(express.json());






const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.eixcuzu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
   // await client.connect();
    // Send a ping to confirm a successful connection
   // await client.db("admin").command({ ping: 1 });
    //console.log("Pinged your deployment. You successfully connected to MongoDB!");

    const database = client.db("JobPortal");
   
    const jobsCollection = database.collection("Jobs");

    const jobApplicationCollection =  database.collection("job-applications");

   

    app.get('/jobs',async(req,res)=>{

        const cursor = jobsCollection.find();

        const result = await cursor.toArray(); 
        res.send(result);
    })

    app.get('/jobs/:id',async(req,res)=>{

      const id = req.params.id;
      const query ={ _id : new ObjectId(id)}

      const result = await jobsCollection.findOne(query);
      res.send(result);

    })

    //job application api
    //get api for getting all data.get one data, get some data [0,1,many] for application
    app.get('/job-applications',async(req,res)=>{

      const email = req.query.email;
      const query = {applicant_email:email}
      const result = await jobApplicationCollection.find(query).toArray();

      //not the best way 
      for(const applicaion of result)
      {
        console.log(applicaion.job_id);
        const query1 ={ _id : new ObjectId(applicaion.job_id)}

        const job = await jobsCollection.findOne(query1);
        if(job){
          applicaion.title = job.title;
          applicaion.company = job.company;
          applicaion.company_logo = job.company_logo;
        }
      }
      res.send(result);

    })
    //post api for applicaion
    app.post('/job-applications',async(req,res)=>{
      const application = req.body;
      const result =await jobApplicationCollection.insertOne(application);
      res.send(result);
    })


    
   // await client.db("admin").command({ ping: 1 });
   // console.log("Pinged your deployment. You successfully connected to MongoDB!");


  } finally {
    // Ensures that the client will close when you finish/error
   // await client.close();
  }
}
run().catch(console.dir);



app.get('/',(req,res)=>{
    res.send('Job is falling from the sky');
})

app.listen(port,()=>{
    console.log(`Job is waiting at : ${port}`);
})

module.export=app;
// const serverless = require('serverless-http');
// module.exports.handler = serverless(app);