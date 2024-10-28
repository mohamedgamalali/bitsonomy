import { Schema, model } from "mongoose";
import { UserDocument, UserModel } from "./mongoose-types";
const userSchema = new Schema({
    name: {
      type: String,
      required: function (this: UserDocument) {
        return !this.isTemporary;
      },
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: function (this: UserDocument) {
        return !this.isTemporary;
      },
    },
    isTemporary: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
userSchema.index({ email: 1 }, { unique: true });
userSchema.statics.createTemporaryUser = async function (email: string) {
    const existingUser = await this.findOne({ email });
    if (existingUser) {
        return existingUser;
    }
    const user = new this({ email, isTemporary: true });
    return await user.save();
}
export const UserInstance = model<UserDocument, UserModel>("User", userSchema);
