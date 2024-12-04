const mongoose = require("mongoose");

const dashboardSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    imageUrl: { type: String, default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLdIEENaWqGZV9kxR871g9p6ywGNnqvbyd3z-3MoYMi-Fc6WZvtU7wE68_RHCBINkRjl4&usqp=CAU" },
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
