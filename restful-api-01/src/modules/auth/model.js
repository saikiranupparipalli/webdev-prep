import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlen: 3,
      maxlen: 14,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: true,
      required: [true, "email is required"],
    },
    password: {
      type: String,
      minlen: 8,
      maxlen: 14,
      required: [true, "password is required"],
    },
    role: {
      type: String,
      enum: ["customer, seller, admin"],
      default: "customer",
    },

    verificationToken: { type: String, select: false },
    refreshToken: { type: String, select: false },
    resetPassword: { type: String, select: false },
    resetPasswordExpires: { type: String, select: false },
  },
  { timeStamp: true },
);

userSchema.pre("save", async () => {
  if (!this.password.ismodified) return;
  this.password = await bcrypt.hash(this.password, 12);
  next();
});
userSchema.methods.comparePassword = async (userPassword) => {
  return bcrypt.compare(userPassword, this.password);
};

export default mongoose.model("User", userSchema);
