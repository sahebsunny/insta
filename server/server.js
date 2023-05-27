// const express = require("express");
// const multer = require('multer');
// const schedule = require('node-schedule');
// const { IgApiClient } = require('instagram-private-api');

// const upload = multer({ dest: 'uploads/' }); // store uploaded images in an 'uploads' directory
// const app = express();
// const ig = new IgApiClient();

// app.post('/upload', upload.single('image'), async (req, res) => {
//   // receive data from the React form
//   const { text, date, time, platform } = req.body;
//   const image = req.file;

//   if (platform === 'Instagram') {
//     const jobDate = new Date(`${date}T${time}`);
//     schedule.scheduleJob(jobDate, async () => {
//       // Instagram posting logic
//       // Note: It's against Instagram's ToS to use unofficial APIs to post
//       ig.state.generateDevice('sushobhan.pramanik'); // Replace with your Instagram username
//       await ig.account.login('<sushobhan.pramanik', 'QAZqaz123..'); // Replace with your Instagram username and password

//       const publishResult = await ig.publish.photo({
//         file: image.path, // file path to your image
//         caption: text, // caption to be posted with your image
//       });

//       console.log(publishResult); // log out the result
//     });
//   }

//   res.sendStatus(200);
// });

// app.listen(4000, () => {
//   console.log('Listening on port 4000...');
// });




const express = require("express");
const multer = require('multer');
const schedule = require('node-schedule');
const { IgApiClient } = require('instagram-private-api');
const cors = require('cors');

const upload = multer({ dest: 'uploads/' }); // store uploaded images in an 'uploads' directory
const app = express();
const ig = new IgApiClient();

// CORS middleware
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.post('/upload', upload.single('image'), async (req, res) => {
  // receive data from the React form
  const { text, date, time, platform } = req.body;
  const image = req.file;

  if (platform === 'Instagram') {
    const jobDate = new Date(`${date}T${time}`);
    schedule.scheduleJob(jobDate, async () => {
      // Instagram posting logic
      // Note: It's against Instagram's ToS to use unofficial APIs to post
      ig.state.generateDevice('sushobhan.pramanik'); // Replace with your Instagram username
      await ig.account.login('sushobhan.pramanik', '..'); // Replace with your Instagram username and password

      const publishResult = await ig.publish.photo({
        file: image.path, // file path to your image
        caption: text, // caption to be posted with your image
      });

      console.log(publishResult); // log out the result
    });
  }

  res.sendStatus(200);
});

app.listen(4000, () => {
  console.log('Listening on port 4000...');
});
