const express = require("express");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 1000;
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// variable
const user = process.env.DB_USER;
const password = process.env.DB_PASS;


const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${user}:${password}@cluster0.nvx6pod.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
    try {
        const projectDetailsCollection = client.db('abirPortfolio').collection('projectDetails');
        app.get('/allProjects', async (req, res) => {
            const query = {};
            const result = await projectDetailsCollection.find(query).toArray();
            res.send(result)
        })
  
  } finally {
  }
}
run().catch(console.log);

app.get("/", async (req, res) => {
  res.send("abir is running");
});

app.listen(port, () => {
  console.log("abir running on", port);
});
