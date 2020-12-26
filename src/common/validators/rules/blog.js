module.exports = {
  title: {
    in: ["body"],
    errorMessage: "Title is missing",
    exists: true,
  },
  description: {
    in: ["body"],
    errorMessage: "Description field is missing",
    exists: true,
  },
  thumb_image: {
    in: ["body"],
    errorMessage: "Thumb image is missing",
    exists: true,
  },
};
