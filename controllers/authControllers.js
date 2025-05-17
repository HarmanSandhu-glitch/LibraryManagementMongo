import Admin from "../models/adminModel.js";
import Student from "../models/studentModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

export const adminRegister = async (req, res) => {
  console.log("admin register /auth/admin/register");
  try {
    const { name, email, password } = req.body;

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res
        .status(400)
        .json({ success: false, message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await Admin.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: newAdmin._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("token", token);
    res.redirect('/render/adminDashboard');
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

export const studentRegister = async (req, res) => {
  console.log("student register /auth/student/register");
  try {
    const { name, email, enrollmentNumber, course, year, password } = req.body;

    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res
        .status(400)
        .json({ success: false, message: "Student already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newStudent = await Student.create({
      name,
      email,
      enrollmentNumber,
      course,
      year,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: newStudent._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("token", token);
    res.redirect('/render/home');
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: "Registration failed. Please try again.",
      error: error.message 
    });
  }
};

export const studentLogin = async (req, res) => {
  console.log("student login /auth/student/login");
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: "Email and password are required"
      });
    }

    console.log(email,password);

    const student = await Student.findOne({ email });
    console.log(student);
    if (!student) {
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });
    }

    if (!student.password) {
      return res.status(400).json({
        success: false,
        message: "Password hash not found for student"
      });
    }

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    console.log(token);
    res.cookie("token", token);
    res.redirect('/render/home');
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

export const adminLogin = async (req, res) => {
  console.log("admin login /auth/admin/login");
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required"
      });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res
        .status(404)
        .json({ success: false, message: "Admin not found" });
    }

    if (!admin.password) {
      return res.status(400).json({
        success: false,
        message: "Password hash not found for admin"
      });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token);
    res.redirect('/render/adminDashboard');
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

export const logout = async (req, res) => {
  console.log("logout route");
  res.clearCookie("token");
  res.redirect("/render/home");
};