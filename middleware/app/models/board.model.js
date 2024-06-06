module.exports = mongoose => {
  var schema = mongoose.Schema(
    // see https://mongoosejs.com/docs/schematypes.html
    {
      boardName: String,
      boardType: String,
      boardPosition: Object,
      cardList: Array,
      arrowList: Array,
      cardIDCounter: Number,
      arrowIDCounter: Number,
      anchorIDCounter: Number
    },
    { timestamps: true }
  );
  //change _id to id
  /* schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  }); */
  const Board = mongoose.model("board", schema);
  return Board;
};