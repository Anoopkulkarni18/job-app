import Job from "../models/jobModel.js";

export const getAllJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find({ expired: false });
    res.status(200).json({ jobs });
  } catch (error) {
    next(error);
  }
};

export const postJobs = async (req, res, next) => {
  try {
    const { role } = req.user;
    if (role === "jobSeeker") {
      return res
        .status(409)
        .json({ message: "You are not allowed to post the job" });
    }
    const {
      title,
      description,
      category,
      country,
      city,
      location,
      fixedSalary,
      salaryFrom,
      salaryTo,
      expired,
      jobPostedOn,
    } = req.body;
    if (!title || !description || !category || !country || !city || !location) {
      throw { statusCode: 500, message: "Please fill all the information" };
    }

    if ((!salaryFrom || !salaryTo) && !fixedSalary) {
      throw {
        statusCode: 500,
        message:
          "You cannot enter fixed and ranged salary both simoultaneously",
      };
    }

    if (salaryFrom && salaryTo && fixedSalary) {
      throw {
        statusCode: 500,
        message:
          "You cannot enter fixed and ranged salary both simoultaneously",
      };
    }

    const postedBy = req.user._id;
    await Job.create({
      title,
      description,
      category,
      country,
      city,
      location,
      fixedSalary,
      salaryFrom,
      salaryTo,
      expired,
      jobPostedOn,
      postedBy,
    });
    res.status(200).json({ message: "Job posted successfully" });
  } catch (error) {
    next(error);
  }
};

export const getMyJobs = async (req, res, next) => {
  try {
    const { role } = req.user;
    if (role === "jobSeeker") {
      return res
        .status(409)
        .json({ message: "You are not allowed to post the job" });
    }

    const myJobs = await Job.find({ postedBy: req.user._id });
    res.status(200).json({ myJobs });
  } catch (error) {
    next(error);
  }
};
export const updateJob = async (req, res, next) => {
  try {
    const { role } = req.user;
    if (role === "jobSeeker") {
      return res
        .status(409)
        .json({ message: "You are not allowed to post the job" });
    }
    const { id } = req.params;
    let currentJob = await Job.findById(id);

    if (!currentJob) {
      throw { statusCode: 404, message: "Job not found" };
    }
    currentJob = await Job.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidator: true,
      useFindAndModify: true,
    });
    res.status(200).json({
      message: "Job updated successfully",
      currentJob,
    });
  } catch (error) {
    next(error);
  }
};
export const deleteJob = async (req, res, next) => {
  try {
    const { role } = req.user;
    if (role === "jobSeeker") {
      return res
        .status(409)
        .json({ message: "You are not allowed to post the job" });
    }
    console.log(req.user);
    const { id } = req.params;
    console.log(id);
    const deletedJob = await Job.findByIdAndDelete(id);
    // console.log(deleteJob);
    if (!deletedJob) {
      throw { statusCode: 404, message: "Job not found" };
    }
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const getSingleJob = async (req, res, next) => {
  try {
    const { id } = req.params;
    const job = await Job.findById(id);
    if (!res) {
      throw { statusCode: 404, message: "Job not found" };
    }
    res.status(200).json({ job });
  } catch (error) {
    next(error);
  }
};
