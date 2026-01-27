import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { WorkoutPlan, DayPlan } from './types';

// PDF Export
export function exportToPDF(plan: WorkoutPlan): void {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  let yPos = 20;
  
  // Title
  doc.setFontSize(24);
  doc.setTextColor(34, 197, 94); // Green
  doc.text(`${plan.program_settings.duration_days}-Day Calisthenics Challenge`, pageWidth / 2, yPos, { align: 'center' });
  
  yPos += 12;
  doc.setFontSize(12);
  doc.setTextColor(100);
  doc.text(`Prepared for: ${plan.user_profile.name}`, pageWidth / 2, yPos, { align: 'center' });
  
  yPos += 20;
  
  // User Profile Summary
  doc.setFontSize(16);
  doc.setTextColor(0);
  doc.text('Your Profile', 14, yPos);
  yPos += 8;
  
  doc.setFontSize(10);
  doc.setTextColor(60);
  const profileData = [
    ['Age', `${plan.user_profile.age} years`],
    ['Weight', `${plan.user_profile.weight_kg} kg`],
    ['Height', `${plan.user_profile.height_cm} cm`],
    ['BMI', `${plan.bmi}`],
    ['Experience', plan.user_profile.experience],
    ['Goal', plan.user_profile.goal.replace('_', ' ')],
    ['Days/Week', `${plan.user_profile.available_days_per_week}`],
    ['Session Duration', `${plan.user_profile.session_duration_min} min`]
  ];
  
  autoTable(doc, {
    startY: yPos,
    head: [],
    body: profileData,
    theme: 'plain',
    styles: { fontSize: 10 },
    columnStyles: { 0: { fontStyle: 'bold', cellWidth: 40 } }
  });
  
  yPos = (doc as any).lastAutoTable.finalY + 15;
  
  // Program Summary
  doc.setFontSize(16);
  doc.setTextColor(0);
  doc.text('Program Summary', 14, yPos);
  yPos += 8;
  
  const summaryData = [
    ['Total Days', `${plan.summary.total_days}`],
    ['Training Days', `${plan.summary.training_days}`],
    ['Rest Days', `${plan.summary.rest_days}`],
    ['Avg Session Time', `${plan.summary.avg_session_time} min`],
    ['Total Volume', `${plan.summary.total_volume} reps`],
    ['Progression Model', plan.program_settings.progression_model.replace('_', ' ')]
  ];
  
  autoTable(doc, {
    startY: yPos,
    head: [],
    body: summaryData,
    theme: 'plain',
    styles: { fontSize: 10 },
    columnStyles: { 0: { fontStyle: 'bold', cellWidth: 40 } }
  });
  
  // How to Use section
  doc.addPage();
  yPos = 20;
  
  doc.setFontSize(18);
  doc.setTextColor(34, 197, 94);
  doc.text('How to Use This Program', 14, yPos);
  yPos += 12;
  
  doc.setFontSize(11);
  doc.setTextColor(60);
  const instructions = [
    '1. Always complete the warm-up before training to prevent injury.',
    '2. Rest for the indicated time between sets.',
    '3. Use the RPE (Rate of Perceived Exertion) scale: 6=Easy, 9=Very Hard.',
    '4. Track your completed sets and note any pain or discomfort.',
    '5. Progress to the next level when all sets feel easy (RPE < 7).',
    '6. Take rest days seriously - recovery is when muscles grow.',
    '7. Stay hydrated and maintain good nutrition for best results.'
  ];
  
  instructions.forEach(instruction => {
    const lines = doc.splitTextToSize(instruction, pageWidth - 28);
    lines.forEach((line: string) => {
      doc.text(line, 14, yPos);
      yPos += 6;
    });
    yPos += 2;
  });
  
  // Daily Workouts
  plan.days.forEach((day, index) => {
    if (day.theme === 'rest') return;
    
    if (yPos > 230) {
      doc.addPage();
      yPos = 20;
    }
    
    // Day Header
    doc.setFontSize(14);
    doc.setTextColor(34, 197, 94);
    doc.text(`Day ${day.day_number}: ${day.theme.toUpperCase()} (${day.date})`, 14, yPos);
    yPos += 8;
    
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Est. Time: ${day.est_time_min} min`, 14, yPos);
    yPos += 10;
    
    // Exercises table
    const exerciseData = day.exercises.map(ex => {
      const reps = Array.isArray(ex.reps_per_set) 
        ? ex.reps_per_set.join(', ') 
        : `${ex.reps_per_set.hold_sec}s hold`;
      return [ex.name, `${ex.sets}`, reps, `${ex.rest_sec}s`, ex.tempo];
    });
    
    autoTable(doc, {
      startY: yPos,
      head: [['Exercise', 'Sets', 'Reps', 'Rest', 'Tempo']],
      body: exerciseData,
      theme: 'striped',
      styles: { fontSize: 9 },
      headStyles: { fillColor: [34, 197, 94] }
    });
    
    yPos = (doc as any).lastAutoTable.finalY + 15;
  });
  
  // Footer on each page
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(9);
    doc.setTextColor(150);
    doc.text('Prepared by HealthyPlates', pageWidth / 2, 285, { align: 'center' });
    doc.text(`Page ${i} of ${totalPages}`, pageWidth - 14, 285, { align: 'right' });
  }
  
  doc.save(`Calisthenics_Challenge_${plan.user_profile.name}_${plan.program_settings.duration_days}days.pdf`);
}

// Excel Export
export function exportToExcel(plan: WorkoutPlan): void {
  const wb = XLSX.utils.book_new();
  
  // Sheet 1: Plan
  const planData: any[][] = [
    ['Date', 'Day #', 'Theme', 'Exercise', 'Category', 'Sets', 'Reps/Hold', 'Rest (sec)', 'Tempo', 'Target Muscles', 'Completed Sets', 'RPE', 'Status', 'Notes']
  ];
  
  plan.days.forEach(day => {
    if (day.exercises.length === 0) {
      planData.push([
        day.date,
        day.day_number,
        'REST',
        'Recovery Day',
        '-',
        '-',
        '-',
        '-',
        '-',
        '-',
        '-',
        '-',
        '-',
        'Focus on recovery and stretching'
      ]);
    } else {
      day.exercises.forEach(ex => {
        const reps = Array.isArray(ex.reps_per_set) 
          ? ex.reps_per_set.join(', ')
          : `${ex.reps_per_set.hold_sec}s`;
        planData.push([
          day.date,
          day.day_number,
          day.theme.toUpperCase(),
          ex.name,
          ex.category,
          ex.sets,
          reps,
          ex.rest_sec,
          ex.tempo,
          ex.target_muscles.join(', '),
          '', // Completed sets (user fills)
          '', // RPE (user fills)
          '', // Status dropdown
          ex.notes
        ]);
      });
    }
  });
  
  const planSheet = XLSX.utils.aoa_to_sheet(planData);
  
  // Set column widths
  planSheet['!cols'] = [
    { wch: 12 }, // Date
    { wch: 6 },  // Day #
    { wch: 12 }, // Theme
    { wch: 25 }, // Exercise
    { wch: 10 }, // Category
    { wch: 6 },  // Sets
    { wch: 15 }, // Reps
    { wch: 10 }, // Rest
    { wch: 8 },  // Tempo
    { wch: 30 }, // Target Muscles
    { wch: 15 }, // Completed
    { wch: 6 },  // RPE
    { wch: 10 }, // Status
    { wch: 30 }  // Notes
  ];
  
  XLSX.utils.book_append_sheet(wb, planSheet, 'Plan');
  
  // Sheet 2: Summary
  const summaryData = [
    ['PROGRAM SUMMARY'],
    [''],
    ['User Profile'],
    ['Name', plan.user_profile.name],
    ['Age', plan.user_profile.age],
    ['Weight (kg)', plan.user_profile.weight_kg],
    ['Height (cm)', plan.user_profile.height_cm],
    ['BMI', plan.bmi],
    ['Experience', plan.user_profile.experience],
    ['Goal', plan.user_profile.goal],
    ['Days/Week', plan.user_profile.available_days_per_week],
    ['Session Duration (min)', plan.user_profile.session_duration_min],
    [''],
    ['Program Stats'],
    ['Total Days', plan.summary.total_days],
    ['Training Days', plan.summary.training_days],
    ['Rest Days', plan.summary.rest_days],
    ['Total Volume (reps)', plan.summary.total_volume],
    ['Avg Session Time (min)', plan.summary.avg_session_time],
    ['Estimated TDEE (cal)', plan.tdee],
    [''],
    ['Baseline Tests'],
    ['Max Push-ups', plan.baseline_tests.max_pushups],
    ['Max Squats', plan.baseline_tests.max_bodyweight_squat],
    ['Max Plank (sec)', plan.baseline_tests.max_plank_sec],
    ['Max Pull-ups', plan.baseline_tests.max_pullups],
    ['RPE Preference', plan.baseline_tests.rpe_preference]
  ];
  
  const summarySheet = XLSX.utils.aoa_to_sheet(summaryData);
  summarySheet['!cols'] = [{ wch: 25 }, { wch: 20 }];
  XLSX.utils.book_append_sheet(wb, summarySheet, 'Summary');
  
  // Sheet 3: Exercise Library
  const libraryData: any[][] = [
    ['Exercise Name', 'Category', 'Difficulty', 'Primary Muscles', 'Easier Variant', 'Harder Variant', 'Avoid If']
  ];
  
  plan.exercise_library.forEach(ex => {
    libraryData.push([
      ex.name,
      ex.category,
      ex.difficulty,
      ex.primary_muscles.join(', '),
      ex.progressions.easier || '-',
      ex.progressions.harder || '-',
      ex.contraindications.join(', ') || 'None'
    ]);
  });
  
  const librarySheet = XLSX.utils.aoa_to_sheet(libraryData);
  librarySheet['!cols'] = [
    { wch: 25 }, // Name
    { wch: 10 }, // Category
    { wch: 12 }, // Difficulty
    { wch: 35 }, // Muscles
    { wch: 20 }, // Easier
    { wch: 20 }, // Harder
    { wch: 25 }  // Avoid
  ];
  XLSX.utils.book_append_sheet(wb, librarySheet, 'Library');
  
  // Save file
  XLSX.writeFile(wb, `Calisthenics_Challenge_${plan.user_profile.name}_${plan.program_settings.duration_days}days.xlsx`);
}
