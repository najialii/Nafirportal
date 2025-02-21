const pdfParse = require("pdf-parse");
const docx4js = require("docx4js");
const fs = require("fs");
const CV = require("../models/cv");

const REQUIRED_SECTIONS = ["education", "experience", "skills"];

const extractTextFromDocx = async (filePath) => {
  const doc = await docx4js.load(filePath);
  return doc.getFullText();
};

const scanCV = (text) => {
     const lowerText = text.toLowerCase();
     const hasSections = REQUIRED_SECTIONS.every((section) =>
    lowerText.includes(section)
  );

  return {
    atsScore: hasSections ? 100 : 50,
    missingSections: REQUIRED_SECTIONS.filter(
      (section) => !lowerText.includes(section)
    ),
  };
};


exports.uploadCV = async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  const { path, mimetype, originalname } = req.file;
  let text = "";

  try {
    if (mimetype === "application/pdf") {
      const data = await pdfParse(fs.readFileSync(path));
      text = data.text;
    } else if (
      mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      text = await extractTextFromDocx(path);
    } else {
      return res.status(400).json({ error: "Unsupported file format" });
    }

    
    const result = scanCV(text);

    
    const newCV = await CV.create({
      filename: originalname,
      text,
      atsScore: result.atsScore,
      missingSections: result.missingSections,
    });

    res.json({
      message: result.atsScore === 100 ? "CV is ATS-friendly!" : "CV needs improvement.",
      atsScore: result.atsScore,
      missingSections: result.missingSections,
      cvId: newCV._id,
    });
  } catch (error) {
    res.status(500).json({ error: "Error processing file" });
  } finally {
    fs.unlinkSync(path); 
  }
};

exports.getAllCVs = async (req, res) => {
  try {
    const cvs = await CV.find().sort({ uploadedAt: -1 });
    res.json(cvs);
  } catch (error) {
    res.status(500).json({ error: "Error fetching CVs" });
  }
};

exports.getCVById = async (req, res) => {
  try {
    const cv = await CV.findById(req.params.id);
    if (!cv) return res.status(404).json({ error: "CV not found" });
    res.json(cv);
  } catch (error) {
    res.status(500).json({ error: "Error fetching CV" });
  }
};
