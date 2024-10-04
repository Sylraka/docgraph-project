module.exports = mongoose => {

  var schemax = mongoose.Schema(
    // see https://mongoosejs.com/docs/schematypes.html
    {
      _id: mongoose.Schema.Types.ObjectId,
      boardName: String,
      boardType: String,
      boardPosition: {
        x: Number,
        y: Number
      }
    },
    { timestamps: true }
  );

  var schemaMultiBoard = mongoose.Schema({
    multiBoard: {
      type: [schemax],
      required: true
    },
  })

  const MultiBoard = mongoose.model("MultiBoard", schemaMultiBoard);
  return MultiBoard;
};