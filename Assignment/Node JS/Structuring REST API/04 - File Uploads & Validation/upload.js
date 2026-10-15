const multer = require("multer");
const path = require("path");

// Task 1: save profile pictures inside the avatars folder
const avatarStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "avatars"));
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + "-" + file.originalname;
    cb(null, fileName);
  },
});

// profile picture can only be JPEG or PNG
function avatarFileFilter(req, file, cb) {
  const allowedTypes = ["image/jpeg", "image/png"];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPEG and PNG files are allowed"));
  }
}

// Task 2: reject files bigger than 1MB
const uploadAvatar = multer({
  storage: avatarStorage,
  limits: { fileSize: 1 * 1024 * 1024 },
  fileFilter: avatarFileFilter,
});

const postImageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "post-images"));
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + "-" + file.originalname;
    cb(null, fileName);
  },
});

// Task 5: snippet I got from ChatGPT for checking file extensions
//
// const fileFilter = (req, file, cb) => {
//   const allowedTypes = /jpeg|jpg|png|gif/;
//   const extname = allowedTypes.test(
//     path.extname(file.originalname).toLowerCase()
//   );
//   const mimetype = allowedTypes.test(file.mimetype);
//
//   if (extname && mimetype) {
//     cb(null, true);
//   } else {
//     cb(new Error("Only images are allowed"));
//   }
// };
//
// Changes I made so it works in this project:
// 1. Renamed it to postImageFileFilter. This route allows gif, but avatar does not.
// 2. Changed the error message so the user knows which types are allowed.
// 3. Checked the extension with an array instead of only the regex, so a name
//    like "photo.jpg.exe" is rejected. The regex on mimetype is still used.

function postImageFileFilter(req, file, cb) {
  const allowedExtensions = [".jpg", ".jpeg", ".png", ".gif"];
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extension = path.extname(file.originalname).toLowerCase();
  const mimetypeOk = allowedTypes.test(file.mimetype);

  if (allowedExtensions.includes(extension) && mimetypeOk) {
    cb(null, true);
  } else {
    cb(new Error("Only jpg, jpeg, png and gif images are allowed"));
  }
}

const uploadPostImage = multer({
  storage: postImageStorage,
  fileFilter: postImageFileFilter,
});

module.exports = {
  uploadAvatar,
  uploadPostImage,
};
