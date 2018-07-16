const { addNewContent, getContentPreviews, getContentById } = require('../models/handleContent');
const express = require('express');
const audioRouter = express.Router();
const multer = require('multer');
let upload = multer({ dest: 'audioUploads/' }); // just the destination directory to save to, NOT the url to post to

audioRouter.post('/', upload.single('track'), function (req, res, next) {
  console.log("\nfile", req.file);
  console.log("\nbody", req.body);
  const transcriptTokens = JSON.parse(req.body.transcriptTokens);
  const name = req.body.name;
  ensureRequiredFieldsPresent(req, ['transcriptTokens', 'name']);
  console.log("\nfirst token", transcriptTokens[0]);
  addNewContent(name, req.file.path, transcriptTokens);
});

audioRouter.get('/byId/:id', async function (req, res) {
  const originalAudioId = req.params.id;
  // res.sendFile('/Users/al.avery/not_work_related/AudioPractice/AudioPracticeBackend/audioUploads/2f06355121a634a27167876f08288c2c');
  await getContentById(originalAudioId).then(data => {
    res.status(200)
      .json({
        status: 'success',
        phrases: data.phrases,
        name: data.name,
        path_to_audio: data.path_to_audio,
        message: 'Retrieved'
      });
  });
});

audioRouter.get('/fileByPath', function (req, res) {
  console.log("hi this is here");
  console.log(req.query.path);
  res.sendFile(`/Users/al.avery/not_work_related/AudioPractice/AudioPracticeBackend/${req.query.path}`);
});

audioRouter.get('/previews', async function (req, res) {
  await getContentPreviews().then(data => {
    res.status(200)
      .json({
        status: 'success',
        previews: data,
        message: 'Retrieved ALL previews'
      });
  });
});

function ensureRequiredFieldsPresent(req, requiredFields) {
  requiredFields.forEach(field => {
    if (!req.body[field]) {
      throw new Error(`Error: required field '${field}' not present on request.body`);
    }
  });
}

module.exports = audioRouter;
