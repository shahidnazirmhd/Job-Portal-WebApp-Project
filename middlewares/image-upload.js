const multer = require('multer');
const uuid = require('uuid').v4;

const storageDetail = multer.diskStorage({
    destination: 'job-data/images',
    filename: function (req, file, callBack) {
      callBack(null, uuid()+"-"+file.originalname);
    }
  });

const upload = multer({storage: storageDetail});
const configureMulterMiddleware = upload.single('image');

module.exports = configureMulterMiddleware;