import { Application } from "../models/applicationModel.js";
import Job from "../models/jobModel.js";
import cloudinary from "cloudinary";

export const postApplication = async (req, res, next) => {
  try {
    const { role } = req.user;
    if (role === "employeer") {
      return res
        .status(409)
        .json({ message: "You are not allowed to use this resource" });
    }
    // console.log(req.body);
    // res.send(req.files);

    if (!req.files || Object.keys(req.files).length == 0) {
      throw { statusCode: 400, message: "Please provide resume" };
    }
    const { resume } = req.files;

    const allowedFormats = ["image/png", "image/jpg", "image/webp"];
    if (!allowedFormats.includes(resume.mimetype)) {
      throw {
        statusCode: 400,
        message: "please provide image in jpg png or webp formats",
      };
    }
    const cloudinaryResponse = await cloudinary.uploader.upload(
      resume.tempFilePath
    );
    // console.log(cloudinaryResponse);
    if (!cloudinaryResponse || cloudinary.error) {
      console.log("Unkown cloudinary error");
      throw { statusCode: 400, message: "Failed to upload resume" };
    }

    const { name, email, coverLetter, jobId, phone, address } = req.body;
    const applicantID = {
      user: req.user._id,
      role: "jobSeeker",
    };
    if (!jobId) {
      throw { statusCode: 400, message: "Please provide jobId" };
    }
    const jobDetails = await Job.findById(jobId);
    if (!jobDetails) {
      throw { statusCode: 404, message: "Job not found" };
    }
    // console.log(jobDetails.postedBy,req.user._id);
    const employerID = {
      user: jobDetails.postedBy,
      role: "employeer",
    };
    const application = await Application.create({
      name,
      email,
      coverLetter,
      jobId,
      phone,
      address,
      applicantID,
      employerID,
      resume: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      },
    });
    res.status(200).json({ msg: "Application created successfully" });

  } catch (error) {
    next(error);
  }
};
export const employeerGetAllApplications = async (req, res, next) => {
  try {
    const { role } = req.user;
    if (role === "jobSeeker") {
      return res
        .status(409)
        .json({ message: "You are not allowed to use this resource" });
    }
    const { _id } = req.user;
    const applications = await Application.find({ "employerID.user": _id });
    res.status(200).json({ applications });
  } catch (error) {
    next(error);
  }
};
export const jobSeekerGetAllApplications = async (req, res, next) => {
  try {
    const { role } = req.user;
    if (role === "employeer") {
      return res
        .status(409)
        .json({ message: "You are not allowed to use this resource" });
    }
    const { _id } = req.user;
    const applications = await Application.find({ "applicantID.user": _id });
    res.status(200).json({ applications });
  } catch (error) {
    next(error);
  }
};

export const deleteApplication = async (req, res, next) => {
  try {
    const { role } = req.user;
    if (role === "employeer") {
      return res
        .status(409)
        .json({ message: "You are not allowed to use this resource" });
    }
    const { id } = req.params;
    const application = await Application.findById(id);
    if (!application) {
      throw { statusCode: 404, message: "application not found" };
    }
    await Application.deleteOne({ _id: id }); // Use await to ensure the deletion is complete before responding
    res.status(200).json({ message: "application deleted successfully" });
  } catch (error) {
    next(error);
  }
};

