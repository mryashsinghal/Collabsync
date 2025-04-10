import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    projectName: { type: String, required: true },
    description: { type: String, required: true },
    techStack: [{ type: String, required: true }], // Array of technologies
    projectType: {
      type: String,
      enum: ["Open Source", "Startup", "Research", "Hackathon"],
      required: true,
    },
    collaborationMode: {
      type: String,
      enum: ["Remote", "Hybrid", "In-Person"],
      required: true,
    },
    availableRoles: [{ type: String }], // List of roles open for joining
    thumbnail: { type: String }, // URL to project image
    timeline: {
      startDate: { type: Date, required: true },
      endDate: { type: Date, default: null }, // If ongoing, it can be null
    },
    teamMembers: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        role: { type: String, required: true },
        summary : {type : String, required : true},
        joinedOn: { type: Date, default: Date.now },
      },
    ],
    joinRequests: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        techStack: [{ type: String }],
        message: { type: String },
        status: { type: String, default: 'pending' },
        requestDate: { type: Date, default: Date.now },
      },
    ],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, enum: ["Open", "Closed"], default: "Open" },
    visibility: { type: String, enum: ["Public", "Private"], default: "Public" },
    repositoryLink: { type: String }, // Optional GitHub/Version Control Link
    website: { type: String }, // Optional live project link
    likes: { type: Number, default: 0 }, // Count of users who liked the project
  },
  { timestamps: true ,toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

projectSchema.virtual("createdByDetails", {
  ref: "User",
  localField: "createdBy",
  foreignField: "_id",
  justOne: true,
});

// Exporting the model
const Project = mongoose.model("Project", projectSchema);
export default Project;
     