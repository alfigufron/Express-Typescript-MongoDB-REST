import { check } from "express-validator";
import { validationHandler } from "../config/http";
import { ValidatorMessage } from "../constant/validator.constant";
import ValidatorUtils from "../utils/validator";

const superadminValidator = {
  create: [
    check("email")
      .notEmpty()
      .withMessage(ValidatorUtils.errorMessage("email", ValidatorMessage.Empty))
      .isEmail()
      .normalizeEmail()
      .trim()
      .escape()
      .withMessage(
        ValidatorUtils.errorMessage("email", ValidatorMessage.FormatInvalid)
      ),

    check("password")
      .notEmpty()
      .withMessage(
        ValidatorUtils.errorMessage("password", ValidatorMessage.Empty)
      )
      .isLength({ min: 6 })
      .withMessage(
        ValidatorUtils.errorMessage(
          "password",
          ValidatorMessage.MinimumLength,
          { length: 6 }
        )
      ),

    check("name")
      .notEmpty()
      .withMessage(ValidatorUtils.errorMessage("name", ValidatorMessage.Empty))
      .isLength({ min: 3 })
      .withMessage(
        ValidatorUtils.errorMessage("name", ValidatorMessage.MinimumLength, {
          length: 3,
        })
      ),

    validationHandler,
  ],
};

export default superadminValidator;
