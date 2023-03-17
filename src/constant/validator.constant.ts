enum ValidatorMessage {
  Empty = "cannot be empty",
  FormatInvalid = "format invalid",
  MinimumLength = "must be at least $length characters long",
  ImageFormat = "file format must be image",
  FileTooLarge = "file size too large, maximum allowed size is $unit $value",
}

export { ValidatorMessage };
