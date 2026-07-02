import mongoose from 'mongoose';

// This defines what a "Project" looks like in the database.
// Every project saved to MongoDB will have these fields.
const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    tech: {
      type: [String], // an array of strings, e.g. ["React", "Node.js"]
      default: [],
    },
    link: {
      type: String,
      default: '',
    },
  },
  { timestamps: true } // automatically adds createdAt / updatedAt
);

const Project = mongoose.model('Project', projectSchema);

export default Project;
