const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");
const fs = require("fs");
const path = require("path");
const CV = require("../models/cv");

const REQUIRED_SECTIONS = ["education", "experience", "skills"];

const extractTextFromDocx = async (filePath) => {
  const result = await mammoth.extractRawText({ path: filePath });
  return result.value;
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

const buildCVFromData = async (text) => {
  const lines = text.split('\n');
  console.log("Extracted lines:", lines); // Log the extracted lines

  const nameLine = lines.find(line => /name\s*:/i.test(line));
  const emailLine = lines.find(line => /email\s*:/i.test(line));
  const phoneLine = lines.find(line => /phone\s*:/i.test(line));

  console.log("nameLine:", nameLine);
  console.log("emailLine:", emailLine);
  console.log("phoneLine:", phoneLine);

  const missingFields = [];

  if (!nameLine) {
    missingFields.push("Name");
  }
  if (!emailLine) {
    missingFields.push("Email");
  }
  if (!phoneLine) {
    missingFields.push("Phone");
  }

  const name = nameLine ? nameLine.split(':')[1].trim() : null;
  const email = emailLine ? emailLine.split(':')[1].trim() : null;
  const phone = phoneLine ? phoneLine.split(':')[1].trim() : null;
  const education = lines.filter(line => /education\s*:/i.test(line)).map(line => line.split(':')[1].trim());
  const experience = lines.filter(line => /experience\s*:/i.test(line)).map(line => line.split(':')[1].trim());
  const skills = lines.filter(line => /skills\s*:/i.test(line)).map(line => line.split(':')[1].trim());

  console.log("Extracted fields:", { name, email, phone, education, experience, skills });

  if (!education.length) {
    missingFields.push("Education");
  }
  if (!experience.length) {
    missingFields.push("Experience");
  }
  if (!skills.length) {
    missingFields.push("Skills");
  }


  const cvContent = `
    Name: ${name}
    Email: ${email}
    Phone: ${phone}

    Education:
    ${education.map(ed => `- ${ed}`).join('\n')}

    Experience:
    ${experience.map(exp => `- ${exp}`).join('\n')}

    Skills:
    ${skills.map(skill => `- ${skill}`).join('\n')}
  `;

  const atsScore = 100; // Assuming a perfect score for a manually built CV
  const missingSections = [];

  return {
    atsScore,
    missingSections,
    cvContent,
  };
};

exports.uploadCV = async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  const { path: filePath, mimetype, originalname } = req.file;
  let text = "";

  try {
    if (mimetype === "application/pdf") {
      const data = await pdfParse(fs.readFileSync(filePath));
      text = data.text;
    } else if (
      mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      text = await extractTextFromDocx(filePath);
    } else {
      return res.status(400).json({ error: "Unsupported file format" });
    }

    console.log("Extracted text:", text); // Log the extracted text

    const result = scanCV(text);

    if (result.atsScore < 100) {
      // Execute CV builder using the extracted data
      const builtCV = await buildCVFromData(text);
      const templates = [
        `${req.protocol}://${req.get('host')}/templates/template1.html`,
        `${req.protocol}://${req.get('host')}/templates/template2.html`,
        `${req.protocol}://${req.get('host')}/templates/template3.html`,
      ];
      return res.json({
        message: "CV needs improvement. Here is a suggested CV and some templates to use:",
        atsScore: result.atsScore,
        missingSections: result.missingSections,
        cvContent: builtCV.cvContent,
        templates: templates,
      });
    } else {
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
    }
  } catch (error) {
    console.error("Error processing file:", error);
    res.status(500).json({ error: error.message });
  } finally {
    fs.unlinkSync(filePath); 
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
