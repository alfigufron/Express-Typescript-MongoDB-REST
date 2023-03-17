import { HTTPCode } from "../constant/http.constant";

type TMetaReponseType = {
  success: boolean;
  code: HTTPCode;
  status: "success" | "error";
  message?: string;
};

type TJSONResponseType = {
  meta: TMetaReponseType;
  data?: object;
};

export { TMetaReponseType, TJSONResponseType };
