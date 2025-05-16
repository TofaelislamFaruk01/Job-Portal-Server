const express = require('express');
const cors = require('cors');
const serverless = require('serverless-http');
require('dotenv').config();

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();

const corsOptions = {
  origin: 'https://job-portal-70de2.web.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

// MongoDB setup
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.eixcuzu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let jobsCollection;
let jobApplicationCollection;

async function connectToDB() {
  try {
    await client.connect();
    const db = client.db("JobPortal");
    jobsCollection = db.collection("Jobs");
    jobApplicationCollection = db.collection("job-applications");
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
}
connectToDB();

// Routes
app.get('/', (req, res) => {
  res.send('Job is falling from the sky');
});

app.get('/jobs', async (req, res) => {
  const result = await jobsCollection.find().toArray();
  res.send(result);
});

app.get('/jobs/:id', async (req, res) => {
  const result = await jobsCollection.findOne({ _id: new ObjectId(req.params.id) });
  res.send(result);
});

app.get('/job-applications', async (req, res) => {
  const email = req.query.email;
  const result = await jobApplicationCollection.find({ applicant_email: email }).toArray();

  for (const app of result) {
    const job = await jobsCollection.findOne({ _id: new ObjectId(app.job_id) });
    if (job) {
      app.title = job.title;
      app.company = job.company;
      app.company_logo = job.company_logo;
    }
  }

  res.send(result);
});

app.post('/job-applications', async (req, res) => {
  const application = req.body;
  const result = await jobApplicationCollection.insertOne(application);
  res.send(result);
});

// ✅ LOCAL DEV: Enable server if not running in serverless
// if (process.env.NODE_ENV !== 'production') {
//   const port = process.env.PORT || 3000;
//   app.listen(port, () => {
//     console.log(`Server running locally at http://localhost:${port}`);
//   });
// }

// ✅ VERCEL: Export for serverless
module.exports.handler = serverless(app);
