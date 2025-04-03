const fs = require('fs');
const path = require('path');
const { Document, Packer, Paragraph, TextRun } = require('docx');

const generateTemplate1 = () => {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: "John Doe",
                bold: true,
                size: 32,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun("Email: john.doe@example.com | Phone: (123) 456-7890"),
            ],
          }),
          new Paragraph({
            text: "Education",
            heading: "Heading1",
          }),
          new Paragraph("Bachelor of Science in Computer Science, University of Example, 2020"),
          new Paragraph({
            text: "Experience",
            heading: "Heading1",
          }),
          new Paragraph("Software Engineer, Example Company, 2020 - Present"),
          new Paragraph({
            text: "Skills",
            heading: "Heading1",
          }),
          new Paragraph("JavaScript, HTML, CSS, React, Node.js"),
        ],
      },
    ],
  });

  Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync(path.join(__dirname, 'templates', 'template1.docx'), buffer);
  });
};

const generateTemplate2 = () => {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: "Jane Smith",
                bold: true,
                size: 32,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun("Email: jane.smith@example.com | Phone: (123) 456-7890"),
            ],
          }),
          new Paragraph({
            text: "Education",
            heading: "Heading1",
          }),
          new Paragraph("Master of Business Administration, University of Example, 2018"),
          new Paragraph({
            text: "Experience",
            heading: "Heading1",
          }),
          new Paragraph("Project Manager, Example Company, 2018 - Present"),
          new Paragraph({
            text: "Skills",
            heading: "Heading1",
          }),
          new Paragraph("Project Management, Agile, Scrum, Leadership"),
        ],
      },
    ],
  });

  Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync(path.join(__dirname, 'templates', 'template2.docx'), buffer);
  });
};

const generateTemplate3 = () => {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: "Michael Johnson",
                bold: true,
                size: 32,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun("Email: michael.johnson@example.com | Phone: (123) 456-7890"),
            ],
          }),
          new Paragraph({
            text: "Education",
            heading: "Heading1",
          }),
          new Paragraph("Bachelor of Fine Arts, University of Example, 2016"),
          new Paragraph({
            text: "Experience",
            heading: "Heading1",
          }),
          new Paragraph("Graphic Designer, Example Company, 2016 - Present"),
          new Paragraph({
            text: "Skills",
            heading: "Heading1",
          }),
          new Paragraph("Adobe Photoshop, Illustrator, InDesign, Creativity"),
        ],
      },
    ],
  });

  Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync(path.join(__dirname, 'templates', 'template3.docx'), buffer);
  });
};

generateTemplate1();
generateTemplate2();
generateTemplate3();