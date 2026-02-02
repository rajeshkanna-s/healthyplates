import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { PersonalityProfile, CompatibilityResult } from './types';
import { getMBTIName, loveLanguageLabels } from './calculations';

export const exportCompatibilityReport = (
  male: PersonalityProfile,
  female: PersonalityProfile,
  result: CompatibilityResult
): void => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  
  // Header
  doc.setFillColor(34, 139, 34);
  doc.rect(0, 0, pageWidth, 40, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.text('Personality Compatibility Report', pageWidth / 2, 20, { align: 'center' });
  
  doc.setFontSize(12);
  doc.text(`Generated on ${new Date().toLocaleDateString()}`, pageWidth / 2, 32, { align: 'center' });
  
  let yPos = 55;
  
  // Compatibility Score
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(18);
  doc.text('Overall Compatibility Score', pageWidth / 2, yPos, { align: 'center' });
  yPos += 15;
  
  doc.setFontSize(48);
  const scoreColor = result.overallScore >= 70 ? [34, 139, 34] : result.overallScore >= 50 ? [255, 165, 0] : [220, 20, 60];
  doc.setTextColor(scoreColor[0], scoreColor[1], scoreColor[2]);
  doc.text(`${result.overallScore}%`, pageWidth / 2, yPos, { align: 'center' });
  yPos += 15;
  
  doc.setFontSize(14);
  doc.setTextColor(100, 100, 100);
  doc.text(result.personalityTypeMatch, pageWidth / 2, yPos, { align: 'center' });
  yPos += 20;
  
  // Profile Comparison
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(16);
  doc.text('Profile Comparison', 14, yPos);
  yPos += 10;
  
  const maleMBTI = male.mbtiType || 'N/A';
  const femaleMBTI = female.mbtiType || 'N/A';
  
  autoTable(doc, {
    startY: yPos,
    head: [['Attribute', male.name, female.name]],
    body: [
      ['Age', male.age.toString(), female.age.toString()],
      ['Location', male.location, female.location],
      ['Personality Type', `${maleMBTI} (${getMBTIName(maleMBTI)})`, `${femaleMBTI} (${getMBTIName(femaleMBTI)})`],
      ['Love Language', loveLanguageLabels[male.traits.loveLanguage] || male.traits.loveLanguage, loveLanguageLabels[female.traits.loveLanguage] || female.traits.loveLanguage],
    ],
    theme: 'grid',
    headStyles: { fillColor: [34, 139, 34] },
  });
  
  yPos = (doc as jsPDF & { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 15;
  
  // Matched Traits
  if (result.matchedTraits.length > 0) {
    doc.setFontSize(14);
    doc.setTextColor(34, 139, 34);
    doc.text('✓ Matched Traits', 14, yPos);
    yPos += 8;
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(result.matchedTraits.join(', '), 14, yPos, { maxWidth: pageWidth - 28 });
    yPos += 15;
  }
  
  // Differences
  if (result.differences.length > 0) {
    doc.setFontSize(14);
    doc.setTextColor(220, 100, 0);
    doc.text('⚠ Key Differences', 14, yPos);
    yPos += 8;
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(result.differences.join(', '), 14, yPos, { maxWidth: pageWidth - 28 });
    yPos += 15;
  }
  
  // New page for detailed analysis
  doc.addPage();
  yPos = 20;
  
  // Strengths
  doc.setFontSize(16);
  doc.setTextColor(34, 139, 34);
  doc.text('Relationship Strengths', 14, yPos);
  yPos += 10;
  
  doc.setFontSize(11);
  doc.setTextColor(0, 0, 0);
  result.strengths.forEach((strength) => {
    doc.text(`• ${strength}`, 18, yPos);
    yPos += 8;
  });
  yPos += 10;
  
  // Challenges
  doc.setFontSize(16);
  doc.setTextColor(220, 100, 0);
  doc.text('Potential Challenges', 14, yPos);
  yPos += 10;
  
  doc.setFontSize(11);
  doc.setTextColor(0, 0, 0);
  result.challenges.forEach((challenge) => {
    doc.text(`• ${challenge}`, 18, yPos);
    yPos += 8;
  });
  yPos += 10;
  
  // Suggestions
  doc.setFontSize(16);
  doc.setTextColor(0, 100, 150);
  doc.text('Suggestions for Success', 14, yPos);
  yPos += 10;
  
  doc.setFontSize(11);
  doc.setTextColor(0, 0, 0);
  result.suggestions.forEach((suggestion) => {
    doc.text(`• ${suggestion}`, 18, yPos, { maxWidth: pageWidth - 32 });
    yPos += 12;
  });
  yPos += 15;
  
  // Trait Comparison Table
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.text('Detailed Trait Comparison', 14, yPos);
  yPos += 10;
  
  const traitData = Object.entries(result.traitScores).map(([trait, score]) => {
    const maleValue = male.traits[trait as keyof typeof male.traits];
    const femaleValue = female.traits[trait as keyof typeof female.traits];
    return [
      trait.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
      typeof maleValue === 'number' ? `${maleValue}%` : String(maleValue),
      typeof femaleValue === 'number' ? `${femaleValue}%` : String(femaleValue),
      `${score}%`,
    ];
  });
  
  autoTable(doc, {
    startY: yPos,
    head: [['Trait', male.name, female.name, 'Match %']],
    body: traitData,
    theme: 'striped',
    headStyles: { fillColor: [34, 139, 34] },
    columnStyles: {
      3: { 
        cellWidth: 25,
        halign: 'center',
      },
    },
  });
  
  // Footer
  const finalY = (doc as jsPDF & { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 20;
  doc.setFontSize(9);
  doc.setTextColor(150, 150, 150);
  doc.text('Generated by HealthyPlates Personality Match Tool', pageWidth / 2, finalY, { align: 'center' });
  doc.text('This report is for entertainment and self-reflection purposes only.', pageWidth / 2, finalY + 6, { align: 'center' });
  
  doc.save(`compatibility_report_${male.name}_${female.name}.pdf`);
};
