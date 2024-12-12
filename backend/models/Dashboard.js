const mongoose = require("mongoose");

const dashboardSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    imageUrl: { type: String, default: "https://res.cloudinary.com/ddfwslkx0/image/upload/v1733317585/images_iwucqp.png" },
    quizScores: {
      physicalFitness: { type: Number, default: 0 },
      nutrition: { type: Number, default: 0 },
      mentalWellBeing: { type: Number, default: 0 },
      lifestyle: { type: Number, default: 0 },
      bioMarkers: { type: Number, default: 0 },
      overallScore: { type: Number, default: 0 },
    },
    scoreHistory: [
      {
        timestamp: { type: Date, default: Date.now },
        scores: {
          physicalFitness: { type: Number, default: 0 },
          nutrition: { type: Number, default: 0 },
          mentalWellBeing: { type: Number, default: 0 },
          lifestyle: { type: Number, default: 0 },
          bioMarkers: { type: Number, default: 0 },
          overallScore: { type: Number, default: 0 },
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Dashboard", dashboardSchema);
