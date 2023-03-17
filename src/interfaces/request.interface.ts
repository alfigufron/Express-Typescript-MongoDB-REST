import { Request } from "express";

import { Files } from "formidable";
import { TFormDataMiddleware, TMimeTypeFiles } from "../types/form-data.type";
import { TByteUnit } from "../types/unit.type";

interface IRequestWithFiles extends Request {
  files: Files;
}

interface IFormDataObjectFiles {
  file: TFormDataMiddleware;
  name: string;
  optional?: boolean;
  typefile?: TMimeTypeFiles;
  maxFileSize?: {
    value: number;
    unit: TByteUnit;
  };
}

export { IRequestWithFiles, IFormDataObjectFiles };
