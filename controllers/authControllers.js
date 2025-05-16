import Admin from "../models/adminModel.js";
import Student from "../models/studentModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Admin Registration
export const adminRegister = async (req, res) => {
  console.log("admin register /auth/admin/register");
  try {
    const { name, email, password } = req.body;

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res
        .status(400)
        .json({ success: false, message: "Admin already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new admin
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

// Student Registration
export const studentRegister = async (req, res) => {
  console.log("student register /auth/student/register");
  try {
    const { name, email, enrollmentNumber, course, year, password } = req.body;

    // Check if student already exists
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res
        .status(400)
        .json({ success: false, message: "Student already exists" });
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new student
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

// Student Login
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

    // Find student by email
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

    // Compare passwords
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Generate token
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

// Admin Login
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

    // Find admin by email
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

    // Compare passwords
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Generate token
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