import { ValidatorMessage } from "../constant/validator.constant";
import { IOtherDataValidatorUtils } from "../interfaces/validator.interface";
import StringUtils from "./string";

const ValidatorUtils = {
  createErrorObject: (
    key: string,
    error: ValidatorMessage,
    data?: IOtherDataValidatorUtils
  ) => {
    const msg = ValidatorUtils.errorMessage(key, error, data);

    return { param: key, msg };
  },

  errorMessage: (
    key: string,
    validatorMessage: ValidatorMessage,
    data?: IOtherDataValidatorUtils
  ) => {
    let resultMessage: string;

    switch (validatorMessage) {
      case ValidatorMessage.MinimumLength:
        resultMessage = validatorMessage.replace(
          "$length",
          String(data.length)
        );
        break;

      case ValidatorMessage.FileTooLarge:
        resultMessage = validatorMessage
          .replace("$unit", data.unit)
          .replace("$value", String(data.value));
        break;

      default:
        resultMessage = validatorMessage;
        break;
    }

    resultMessage = `${StringUtils.capitalize(key)} ${resultMessage}!`;

    return resultMessage;
  },
};

export default ValidatorUtils;
