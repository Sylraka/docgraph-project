module.exports = mongoose => {
    var schema = mongoose.Schema(
      // see https://mongoosejs.com/docs/schematypes.html
      {
        collectionName: String
      },
      { timestamps: true }
    );
    const Collection = mongoose.model("collection", schema);
    return Collection;
  };