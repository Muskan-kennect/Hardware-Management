
const express = require('express');
const dotenv = require("dotenv").config();
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

const cors = require('cors');

const db = require("./Config/dbConnection");
const categoryRoute = require("./Routers/categoryRoute");
const employeeRoute = require("./Routers/employeeRoute");
const deviceRoute = require("./Routers/deviceRoute");
const requestRoute = require("./Routers/requestRoute");

const allotmentRoute = require("./Routers/allotmentRoute");

const app = express();
const port = process.env.PORT;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set up Multer storage for device specs
const deviceSpecsStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/deviceSpecs');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const deviceSpecsUpload = multer({ storage: deviceSpecsStorage });

// Set up Multer storage for device warranty
const deviceWarrantyStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/deviceWarranty');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const deviceWarrantyUpload = multer({ storage: deviceWarrantyStorage });

// Handle device specs file upload
app.post('/uploadDeviceSpecs', deviceSpecsUpload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded for device specs.');
  }
  const fileUrl = `${process.env.BACKEND_DOMAIN}/uploads/deviceSpecs/${encodeURIComponent(req.file.filename)}`;
  res.json({ url: fileUrl });
});

// Handle device warranty file upload
app.post('/uploadDeviceWarranty', deviceWarrantyUpload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded for device warranty.');
  }
 const fileUrl = `${process.env.BACKEND_DOMAIN}/uploads/deviceWarranty/${encodeURIComponent(req.file.filename)}`;
  res.json({ url: fileUrl });
});


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



app.use("/category",categoryRoute);

app.use("/employee",employeeRoute);

app.use("/device",deviceRoute);

app.use("/request",requestRoute);

app.use("/allotment",allotmentRoute);

app.get('/', (req, res) => {
  res.send('Hello, this is your Express server!');
});


app.listen(port, () => {
    db()
    .then((mongooseInstance) => {
      
    console.log(`Server is running on http://localhost:${port}`);
    })
    .catch((error) => {
    console.error('Unable to start server:', error.message);
    process.exit(1);
    });
});
