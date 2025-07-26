const multer = require('multer');
const path = require('path');

const appUrl = "http://localhost:8081";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/uploadImages'));
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const filename = Date.now() + ext;
        cb(null, filename);
    },
});

const upload = multer({ storage: storage });

const uploadImage = async (file) => {
    return `${appUrl}/public/uploadImages/` + file.filename;
};

module.exports = { upload, uploadImage };
