import mongoose from "mongoose";


const ExperienceSchema = new mongoose.Schema({
    companyName: { type: String, required: true },
    role: { type: String, required: true },
    year: { type: Number, required: true }, // Year of experience
    fromDate: { type: Date, required: true }, // Start date
    toDate: { type: Date, required: true }, // End date
    techStack: { type: [String], default: [] }, // Technologies used
    projectSummary: { type: String, required: true } // Brief description of work
  });

const ProfileSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true }, // Primary Key
  user: { type: String, required: true },
  gender: { type: String},
  college: { type: String },
  address: { type: String },
  contact: { type: String},
  email: { type: String,required : true, unique: true },
  profilePicture: { type: String, default: "" }, // URL to profile image
  bio: { type: String, default: "" },
  skills: { type: [String], default: [] }, // Array of technology names
  projectsJoined: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }], // References to Project model
  projectsCreated: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],// References to Project model
  experience: { type: [ExperienceSchema], default: [] } // Experience array 
}, { timestamps: true });

const Profile = mongoose.model("Profile", ProfileSchema);

export default Profile;
