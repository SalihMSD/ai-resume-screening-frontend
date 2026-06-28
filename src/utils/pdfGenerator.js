import { jsPDF } from "jspdf";

export function generateATSReport(result) {

  const pdf = new jsPDF();

  let y = 20;

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(20);
  pdf.text("AI Resume Screening System", 20, y);

  y += 15;

  pdf.setFontSize(16);
  pdf.text("ATS Report", 20, y);

  y += 15;

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(12);

  pdf.text(`Candidate : ${result.candidateName}`, 20, y);

  y += 10;

  pdf.text(`Job : ${result.jobTitle}`, 20, y);

  y += 10;

  pdf.text(`ATS Score : ${result.matchPercentage}%`, 20, y);

  y += 10;

  pdf.text(`Recommendation : ${result.status}`, 20, y);

  y += 20;

  pdf.setFont("helvetica", "bold");
  pdf.text("Matched Skills", 20, y);

  y += 10;

  pdf.setFont("helvetica", "normal");

  if (result.matchedSkills.length === 0) {

    pdf.text("None", 25, y);

    y += 10;

  } else {

    result.matchedSkills.forEach(skill => {

      pdf.text(`• ${skill}`, 25, y);

      y += 8;

    });

  }

  y += 8;

  pdf.setFont("helvetica", "bold");
  pdf.text("Missing Skills", 20, y);

  y += 10;

  pdf.setFont("helvetica", "normal");

  if (result.missingSkills.length === 0) {

    pdf.text("None", 25, y);

    y += 10;

  } else {

    result.missingSkills.forEach(skill => {

      pdf.text(`• ${skill}`, 25, y);

      y += 8;

    });

  }

  y += 15;

  pdf.text(
    `Generated On : ${new Date().toLocaleString()}`,
    20,
    y
  );

  pdf.save(
    `${result.candidateName}_ATS_Report.pdf`
  );

}