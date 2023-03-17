import { NextFunction, Response } from "express";

import { IncomingForm, Fields, Files, File } from "formidable";

import { ErrorHandler } from "../config/http";
import { MimeTypeFiles } from "../constant/form-data.constant";
import { HTTPCode, HTTPMessage } from "../constant/http.constant";
import { ValidatorMessage } from "../constant/validator.constant";
import {
  IFormDataObjectFiles,
  IRequestWithFiles,
} from "../interfaces/request.interface";
import UnitUtils from "../utils/unit";
import ValidatorUtils from "../utils/validator";

const form = new IncomingForm();

const emptyDataValidator = (
  formDataObject: IFormDataObjectFiles,
  file: File
) => {
  if (!file)
    throw new ErrorHandler(
      HTTPMessage.ValidationError,
      [
        ValidatorUtils.createErrorObject(
          formDataObject.name,
          ValidatorMessage.Empty
        ),
      ],
      HTTPCode.ValidationError
    );
};

const formatTypeValidator = (
  formDataObject: IFormDataObjectFiles,
  file: File
) => {
  let errorMessage: ValidatorMessage;

  switch (formDataObject.typefile) {
    case "image":
      if (!MimeTypeFiles.IMAGE.includes(file.mimetype))
        errorMessage = ValidatorMessage.ImageFormat;
      break;
    default:
      throw new ErrorHandler(
        "Invalid Value Format Type Validator",
        null,
        HTTPCode.ServerError
      );
  }

  if (errorMessage)
    throw new ErrorHandler(
      HTTPMessage.ValidationError,
      [ValidatorUtils.createErrorObject(formDataObject.name, errorMessage)],
      HTTPCode.ValidationError
    );
};

const fileSizeValidator = (
  formDataObject: IFormDataObjectFiles,
  file: File
) => {
  const resConvertBytes = UnitUtils.converterBytes(
    file.size,
    formDataObject.maxFileSize.unit
  );

  if (resConvertBytes > formDataObject.maxFileSize.value)
    throw new ErrorHandler(
      HTTPMessage.ValidationError,
      [
        ValidatorUtils.createErrorObject(
          formDataObject.name,
          ValidatorMessage.FileTooLarge,
          {
            unit: formDataObject.maxFileSize.unit,
            value: formDataObject.maxFileSize.value,
          }
        ),
      ],
      HTTPCode.ValidationError
    );
};

const singleFileGroupValidator = (
  objectFile: IFormDataObjectFiles,
  file: File
) => {
  if (!objectFile.optional) {
    emptyDataValidator(objectFile, file);

    if (objectFile.typefile) formatTypeValidator(objectFile, file);

    if (objectFile.maxFileSize) fileSizeValidator(objectFile, file);
  }
};

const FormDataMiddleware =
  (objectFiles: Array<IFormDataObjectFiles>) =>
  async (req: IRequestWithFiles, res: Response, next: NextFunction) => {
    try {
      if (req.is("multipart/form-data")) {
        await new Promise((resolve, reject) => {
          form.parse(req, (error: Error, fields: Fields, files: Files) => {
            if (error) {
              reject(error);
              return;
            }

            try {
              objectFiles.map(item => {
                switch (item.file) {
                  case "single":
                    const file = files[item.name] as File;

                    singleFileGroupValidator(item, file);
                    break;
                  case "multiple":
                    const keys = Object.keys(files).filter(key =>
                      key.includes(`${item.name}[`)
                    );

                    if (!keys.length)
                      throw new ErrorHandler(
                        HTTPMessage.ValidationError,
                        [
                          ValidatorUtils.createErrorObject(
                            item.name,
                            ValidatorMessage.Empty
                          ),
                        ],
                        HTTPCode.ValidationError
                      );

                    keys.map(key => {
                      const file = files[key] as File;

                      singleFileGroupValidator(item, file);
                    });
                    break;
                }
              });
            } catch (err) {
              reject(new ErrorHandler(err.message, err.data, err.status));
            }

            req.files = files;
            req.body = fields;

            resolve(true);
          });
        });

        next();
      } else {
        throw new ErrorHandler(
          HTTPMessage.ClientError,
          null,
          HTTPCode.ClientError
        );
      }
    } catch (err) {
      next(
        new ErrorHandler(
          err.message,
          err.data,
          err.status || HTTPCode.ServerError
        )
      );
    }
  };

export default FormDataMiddleware;
