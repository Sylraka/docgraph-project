module.exports = mongoose => {
  var schema = mongoose.Schema(
    // see https://mongoosejs.com/docs/schematypes.html
    {
      boardName: String,
      boardRubrics: Array,
      boardPosition: Object,
      linkList: Array,
      cardList: Array,
      arrowList: Array,
      cardIDCounter: Number,
      arrowIDCounter: Number,
      anchorIDCounter: Number
    },
    { timestamps: true }
  );
  const Board = mongoose.model("board", schema);
  return Board;
};