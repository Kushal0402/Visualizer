import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_API_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
export async function POST(req: Request) {
  const { path } = await req.json();

  if (!path) {
    return NextResponse.json(
      { message: "Image Path not found" },
      { status: 500 }
    );
  }

  try {
    const options = {
      use_filename: true,
      unique_filename: true,
      overwrite: true,
      transformation: [{ width: 1000, height: 752, crop: "scale" }],
    };

    const result = await cloudinary.uploader.upload(path, options);

    return NextResponse.json(result, {status:200});
  } catch (err) {
    return NextResponse.json(`${err}`, {status: 500});
  }
}
