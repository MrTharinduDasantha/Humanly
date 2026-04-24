import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";

const uploadToCloudinary = (buffer) => {
  return new Promise((reslove, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "humanly",
      },
      (error, response) => {
        if (error) return reject(error);
        reslove(response);
      },
    );

    Readable.from(buffer).pipe(stream);
  });
};

const deleteFromCloudinary = (publicId) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(publicId, (error, response) => {
      if (error) return reject(error);
      resolve(response);
    });
  });
};

export { uploadToCloudinary, deleteFromCloudinary };
