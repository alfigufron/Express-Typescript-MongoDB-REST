import { ErrorHandler } from "../config/http";
import { HTTPCode } from "../constant/http.constant";
import { TByteUnit } from "../types/unit.type";

const UnitUtils = {
  converterBytes: (bytes: number, unit: TByteUnit) => {
    let result: number;

    switch (unit) {
      case "B":
        result = bytes;
        break;
      case "KB":
        result = bytes / 1024;
        break;
      case "MB":
        result = bytes / 1024 / 1024;
        break;
      case "GB":
        result = bytes / 1024 / 1024 / 1024;
        break;
      case "TB":
        result = bytes / 1024 / 1024 / 1024 / 1024;
        break;
      default:
        throw new ErrorHandler(
          "Invalid Converter Byte Value",
          null,
          HTTPCode.ServerError
        );
    }

    return result;
  },
};

export default UnitUtils;
