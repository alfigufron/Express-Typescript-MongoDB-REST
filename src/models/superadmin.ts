import { NextFunction } from "express";
import { Schema, model } from "mongoose";
import ISuperAdminModel from "../interfaces/models/superadmin.interface";
import EncryptionUtils from "../utils/bcrypt";

interface ISuperAdminSchema extends ISuperAdminModel, Document {}

const superadminSchema = new Schema<ISuperAdminSchema>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    name: { type: String, required: true },
    avatar: { type: String, default: null },
    deleted_at: { type: Date, default: null, select: false },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

superadminSchema.pre("find", function (this) {
  this.where({ deleted_at: null });
});

superadminSchema.pre("findOne", function (this) {
  this.where({ deleted_at: null });
});

superadminSchema.pre(
  "save",
  async function (this: ISuperAdminSchema, next: NextFunction) {
    this.password = await EncryptionUtils.hash(this.password);

    next();
  }
);

export default model<ISuperAdminSchema>("Superadmin", superadminSchema);
