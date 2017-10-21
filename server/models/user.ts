// Pulls Mongoose dependency for creating schemas
import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

// Creates a user schema
const UserSchema = new Schema({
  username: {type: String, required: true},
  gender: {type: String, required: true},
  age: {type: Number, required: true},
  favlang: {type: String, required: true},
  location: {type: [Number], required: true},
  htmlverified: String,
  created_at: {type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now}
});

// Sets the created_at parameter equal to the current time
UserSchema.pre('save', (next) => {
  const now = new Date();
  this.updated_at = now;

  if (!this.created_at) {
    this.created_at = now;
  }
  next();
});

// Indexes this schema in 2dsphere format (critical for running proximity searches)
UserSchema.index({location: '2dsphere'});

// Exports the UserSchema for use elsewhere. Sets the MongoDB collection to be used as: "scotch-users"
const User = mongoose.model('scotch-user', UserSchema);
export default User;
