// posts-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = 'posts';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const PostSchema = new Schema(
    {
      author: { type: Schema.Types.ObjectId, required: true },
      content: { type: String, required: true, trim: true },
      title: { type: String, required: true, trim: true },
      slug: { type: String, required: true, lowercase: true, trim: true },
      isDeleted: {
        type: Boolean,
        default: false,
      },
      commentStatus: {
        type: String,
        enum: ['open', 'closed'],
        default: 'open',
        lowercase: true,
        trim: true,
      },
      parent: { type: Schema.Types.ObjectId, default: null },
      rating: {
        type: Number,
        max: 5,
        min: 1,
      },
      comments: [
        {
          userId: { type: Schema.Types.ObjectId, required: true },
          parent: { type: Schema.Types.ObjectId, required: true },
          text: { type: String, trim: true, required: true },
          isDeleted: {
            type: Boolean,
            default: false,
          },
        },
      ],
      commentCount: {
        type: Number,
        default: 0,
      },
      likes: { type: Number, default: 0 },
      isPrivate: {
        type: Boolean,
        default: false,
      },
      isPremium: {
        type: Boolean,
        default: false,
      },
      postStatus: {
        type: String,
        enum: ['draft', 'published', 'unpublished'],
        lowercase: true,
        trim: true,
        default: 'draft',
      },
    },
    {
      timestamps: true,
    }
  );

  PostSchema.index({ slug: 1, author: 1 });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, PostSchema);
};
