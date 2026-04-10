// src/pages/land-cultivation-analysis/data/cultivationMonthlyData.js
import RAW_CULTIVATION_DATA from "./cultivationData";  

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May",
  "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

// Season multiplier ranges
const SEASON_MULTIPLIERS = {
  Summer: { min: -0.25, max: -0.15 },  // Mar-Apr-May
  Monsoon: { min: 0.20, max: 0.35 },  // Jun-Jul-Aug-Sep
  Winter: { min: 0.05, max: 0.10 },   // Oct-Nov-Dec-Jan-Feb
};

const getSeasonImpact = (monthIndex) => {
  if (monthIndex >= 2 && monthIndex <= 4) return "Summer";
  if (monthIndex >= 5 && monthIndex <= 8) return "Monsoon";
  return "Winter";
};

// Generate random within range
const randomRange = (min, max) => min + Math.random() * (max - min);

export const fetchMonthlyCultivationData = async () => {
  await new Promise(resolve => setTimeout(resolve, 50));

  const years = ["2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025", "2026"];
  const processedData = [];

  for (const record of RAW_CULTIVATION_DATA) {
    const stateName = record.State.trim();
    const monthlyData = [];

    years.forEach((year) => {
      MONTHS.forEach((month, index) => {
        const season = getSeasonImpact(index);
        const multiplier = randomRange(
          SEASON_MULTIPLIERS[season].min, 
          SEASON_MULTIPLIERS[season].max
        );

        // Slightly scale target for monthly values (divide yearly by 12)
        const baseTarget = (Math.random() * 0.1 + 0.95) *  (600000 / 12); 
        const actualValue = baseTarget + baseTarget * multiplier;

        monthlyData.push({
          month,
          year: parseInt(year),
          cultivableLand: Math.round(baseTarget),
          actualCultivated: Math.round(actualValue),
          season
        });
      });
    });

    processedData.push({
      state: stateName,
      monthlyData
    });
  }

  return processedData;
};
