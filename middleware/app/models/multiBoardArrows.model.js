module.exports = mongoose => {
    var schema = mongoose.Schema(
      // see https://mongoosejs.com/docs/schematypes.html
      {
      // arrowID: Number,
        arrowType: String,
        anchorStart: {
            onCard: String,
            boardRubrics: Array,
            x: Number,
            y: Number
        },
        anchorEnd: {
            onCard: String,
            boardRubrics: Array,
            x: Number,
            y: Number
        }
      },
      { timestamps: true }
    );
    const MultiBoardArrow = mongoose.model("multiBoardArrow", schema);
    return MultiBoardArrow;
}