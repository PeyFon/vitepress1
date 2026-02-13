// 有效值校验文件

export function isImage(value: string): boolean {
  const splits = value.split(".");
  const format = splits[splits.length - 1];
  return /png|jpe?g|gif|bmp|tif?f|webp/i.test(format);
}
export function isVideo(value: string): boolean {
  const splits = value.split(".");
  const format = splits[splits.length - 1];
  return /mp4|webm|ogg/i.test(format);
}
export function isDocType(value: string): boolean {
  const splits = value.split(".");
  const format = splits[splits.length - 1];
  return /doc|docx|xls|xls[xmb]|xlt[xm]|xlam|ppt|pptx/i.test(format);
}
export function isPdf(value: string): boolean {
  const splits = value.split(".");
  const format = splits[splits.length - 1];
  return /pdf/i.test(format);
}
