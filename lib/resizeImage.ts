import sharp from "sharp";

export async function resizeImage(
  imgBlob: Buffer,
  width: number,
  height?: number,
) {
  const imgBuffer = await sharp(imgBlob)
    .resize(width, height ?? width)
    .jpeg({ mozjpeg: true, quality: 85 })
    .toBuffer();

  return imgBuffer;
}
