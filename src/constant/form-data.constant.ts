enum EnumTypeFormDataMiddleware {
  Single = "Single",
  Multiple = "Multiple",
}

const MimeTypeFiles = {
  IMAGE: ["image/png", "image/jpg", "image/jpeg"],
  PDF: ["application/pdf"],
  EXCEL: [
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ],
  POWERPOINT: [
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  ],
};

export { EnumTypeFormDataMiddleware, MimeTypeFiles };
