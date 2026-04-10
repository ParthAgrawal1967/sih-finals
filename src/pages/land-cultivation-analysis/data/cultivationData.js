// src/pages/land-cultivation-analysis/data/cultivationData.js

// --- 1. EXPANDED HARDCODED RAW DATA (SCALED UP 50x) ---
// This data now reflects targets in the 100,000s and 1,000,000s of hectares.
const RAW_CULTIVATION_DATA = [
  {
      "State": "Andhra Pradesh ",
      "2018-19 - Target": 675000,
      "2018-19 - Ach": 550000,
      "2019-20 - Target": 700000,
      "2019-20 - Ach": 575000,
      "2020-21 - Target": 725000,
      "2020-21 - Ach": 600000,
      "2021-22 - Target": 750000,
      "2021-22 - Ach": 562850,
      "2022-23 - Target": 1000000,
      "2022-23 - Ach": 687600,
      "2023-24 - Target": 1200000,
      "2023-24 - Ach": 792950,
      "2024-25 - Target": 1500000,
      "2024-25 - Ach": 1000000,
      "2025-26 - Target": 1900000,
      "2025-26 - Ach": 1330000,
      "2026-27 - Target": 2400000,
      "2026-27 - Ach": 1680000
  },
  {
      "State": "Chhattisgarh ",
      "2018-19 - Target": 22500,
      "2018-19 - Ach": 17500,
      "2019-20 - Target": 23750,
      "2019-20 - Ach": 20000,
      "2020-21 - Target": 24500,
      "2020-21 - Ach": 21000,
      "2021-22 - Target": 25000,
      "2021-22 - Ach": 21200,
      "2022-23 - Target": 75000,
      "2022-23 - Ach": 8800,
      "2023-24 - Target": 40000,
      "2023-24 - Ach": 11200,
      "2024-25 - Target": 60000,
      "2024-25 - Ach": 25000,
      "2025-26 - Target": 90000,
      "2025-26 - Ach": 40000,
      "2026-27 - Target": 125000,
      "2026-27 - Ach": 60000
  },
  {
      "State": "Goa",
      "2018-19 - Target": 1000,
      "2018-19 - Ach": 0,
      "2019-20 - Target": 1000,
      "2019-20 - Ach": 0,
      "2020-21 - Target": 1000,
      "2020-21 - Ach": 0,
      "2021-22 - Target": 1000,
      "2021-22 - Ach": 0,
      "2022-23 - Target": 1000,
      "2022-23 - Ach": 0,
      "2023-24 - Target": 250,
      "2023-24 - Ach": 0,
      "2024-25 - Target": 500,
      "2024-25 - Ach": 250,
      "2025-26 - Target": 750,
      "2025-26 - Ach": 500,
      "2026-27 - Target": 1250,
      "2026-27 - Ach": 750
  },
  {
      "State": "Gujarat",
      "2018-19 - Target": 22500,
      "2018-19 - Ach": 2000,
      "2019-20 - Target": 23750,
      "2019-20 - Ach": 2500,
      "2020-21 - Target": 24500,
      "2020-21 - Ach": 2750,
      "2021-22 - Target": 25000,
      "2021-22 - Ach": 2900,
      "2022-23 - Target": 25000,
      "2022-23 - Ach": 0,
      "2023-24 - Target": 5000,
      "2023-24 - Ach": 0,
      "2024-25 - Target": 15000,
      "2024-25 - Ach": 2500,
      "2025-26 - Target": 30000,
      "2025-26 - Ach": 6000,
      "2026-27 - Target": 50000,
      "2026-27 - Ach": 12500
  },
  {
      "State": "Karnataka",
      "2018-19 - Target": 90000,
      "2018-19 - Ach": 50000,
      "2019-20 - Target": 95000,
      "2019-20 - Ach": 55000,
      "2020-21 - Target": 97500,
      "2020-21 - Ach": 57500,
      "2021-22 - Target": 100000,
      "2021-22 - Ach": 58600,
      "2022-23 - Target": 86750,
      "2022-23 - Ach": 42400,
      "2023-24 - Target": 122700,
      "2023-24 - Ach": 41950,
      "2024-25 - Target": 160000,
      "2024-25 - Ach": 75000,
      "2025-26 - Target": 225000,
      "2025-26 - Ach": 125000,
      "2026-27 - Target": 300000,
      "2026-27 - Ach": 175000
  },
  {
      "State": "Kerala",
      "2018-19 - Target": 5000,
      "2018-19 - Ach": 2500,
      "2019-20 - Target": 5000,
      "2019-20 - Ach": 3000,
      "2020-21 - Target": 5000,
      "2020-21 - Ach": 3500,
      "2021-22 - Target": 5000,
      "2021-22 - Ach": 0,
      "2022-23 - Target": 5000,
      "2022-23 - Ach": 0,
      "2023-24 - Target": 500,
      "2023-24 - Ach": 0,
      "2024-25 - Target": 2500,
      "2024-25 - Ach": 1000,
      "2025-26 - Target": 7500,
      "2025-26 - Ach": 2500,
      "2026-27 - Target": 15000,
      "2026-27 - Ach": 7500
  },
  {
      "State": "Odisha",
      "2018-19 - Target": 60000,
      "2018-19 - Ach": 50000,
      "2019-20 - Target": 67500,
      "2019-20 - Ach": 55000,
      "2020-21 - Target": 70000,
      "2020-21 - Ach": 60000,
      "2021-22 - Target": 75000,
      "2021-22 - Ach": 64450,
      "2022-23 - Target": 90000,
      "2022-23 - Ach": 68900,
      "2023-24 - Target": 100000,
      "2023-24 - Ach": 70000,
      "2024-25 - Target": 125000,
      "2024-25 - Ach": 90000,
      "2025-26 - Target": 160000,
      "2025-26 - Ach": 120000,
      "2026-27 - Target": 200000,
      "2026-27 - Ach": 155000
  },
  {
      "State": "Tamil Nadu",
      "2018-19 - Target": 5000,
      "2018-19 - Ach": 0,
      "2019-20 - Target": 5000,
      "2019-20 - Ach": 0,
      "2020-21 - Target": 5000,
      "2020-21 - Ach": 0,
      "2021-22 - Target": 5000,
      "2021-22 - Ach": 0,
      "2022-23 - Target": 5000,
      "2022-23 - Ach": 0,
      "2023-24 - Target": 500,
      "2023-24 - Ach": 0,
      "2024-25 - Target": 2500,
      "2024-25 - Ach": 500,
      "2025-26 - Target": 7500,
      "2025-26 - Ach": 2000,
      "2026-27 - Target": 15000,
      "2026-27 - Ach": 5000
  },
  {
      "State": "Telangana",
      "2018-19 - Target": 350000,
      "2018-19 - Ach": 300000,
      "2019-20 - Target": 375000,
      "2019-20 - Ach": 325000,
      "2020-21 - Target": 400000,
      "2020-21 - Ach": 350000,
      "2021-22 - Target": 405000,
      "2021-22 - Ach": 364300,
      "2022-23 - Target": 3560000,
      "2022-23 - Ach": 1647450,
      "2023-24 - Target": 4000000,
      "2023-24 - Ach": 912000,
      "2024-25 - Target": 6000000,
      "2024-25 - Ach": 2250000,
      "2025-26 - Target": 8500000,
      "2025-26 - Ach": 3500000,
      "2026-27 - Target": 12500000,
      "2026-27 - Ach": 5000000
  },
  {
      "State": "Arunachal Pradesh",
      "2018-19 - Target": 25000,
      "2018-19 - Ach": 12500,
      "2019-20 - Target": 27500,
      "2019-20 - Ach": 15000,
      "2020-21 - Target": 29500,
      "2020-21 - Ach": 15500,
      "2021-22 - Target": 30000,
      "2021-22 - Ach": 16000,
      "2022-23 - Target": 40000,
      "2022-23 - Ach": 22850,
      "2023-24 - Target": 350000,
      "2023-24 - Ach": 85000,
      "2024-25 - Target": 425000,
      "2024-25 - Ach": 125000,
      "2025-26 - Target": 500000,
      "2025-26 - Ach": 175000,
      "2026-27 - Target": 600000,
      "2026-27 - Ach": 250000
  },
  {
      "State": "Assam ",
      "2018-19 - Target": 70000,
      "2018-19 - Ach": 25000,
      "2019-20 - Target": 72500,
      "2019-20 - Ach": 25250,
      "2020-21 - Target": 74500,
      "2020-21 - Ach": 25400,
      "2021-22 - Target": 75000,
      "2021-22 - Ach": 25500,
      "2022-23 - Target": 35000,
      "2022-23 - Ach": 22900,
      "2023-24 - Target": 60000,
      "2023-24 - Ach": 27050,
      "2024-25 - Target": 100000,
      "2024-25 - Ach": 50000,
      "2025-26 - Target": 175000,
      "2025-26 - Ach": 100000,
      "2026-27 - Target": 250000,
      "2026-27 - Ach": 175000
  },
  {
      "State": "Manipur",
      "2018-19 - Target": 120000,
      "2018-19 - Ach": 85000,
      "2019-20 - Target": 122500,
      "2019-20 - Ach": 87500,
      "2020-21 - Target": 124500,
      "2020-21 - Ach": 90000,
      "2021-22 - Target": 125000,
      "2021-22 - Ach": 91350,
      "2022-23 - Target": 150000,
      "2022-23 - Ach": 130150,
      "2023-24 - Target": 175000,
      "2023-24 - Ach": 136400,
      "2024-25 - Target": 210000,
      "2024-25 - Ach": 175000,
      "2025-26 - Target": 250000,
      "2025-26 - Ach": 225000,
      "2026-27 - Target": 325000,
      "2026-27 - Ach": 290000
  },
  {
      "State": "Mizoram",
      "2018-19 - Target": 7500,
      "2018-19 - Ach": 5000,
      "2019-20 - Target": 8750,
      "2019-20 - Ach": 6000,
      "2020-21 - Target": 9500,
      "2020-21 - Ach": 7000,
      "2021-22 - Target": 10000,
      "2021-22 - Ach": 7250,
      "2022-23 - Target": 25000,
      "2022-23 - Ach": 17850,
      "2023-24 - Target": 25000,
      "2023-24 - Ach": 17500,
      "2024-25 - Target": 37500,
      "2024-25 - Ach": 25000,
      "2025-26 - Target": 60000,
      "2025-26 - Ach": 40000,
      "2026-27 - Target": 90000,
      "2026-27 - Ach": 65000
  },
  {
      "State": "Nagaland",
      "2018-19 - Target": 45000,
      "2018-19 - Ach": 27500,
      "2019-20 - Target": 47500,
      "2019-20 - Ach": 28750,
      "2020-21 - Target": 49000,
      "2020-21 - Ach": 29500,
      "2021-22 - Target": 50000,
      "2021-22 - Ach": 30000,
      "2022-23 - Target": 60000,
      "2022-23 - Ach": 43900,
      "2023-24 - Target": 75000,
      "2023-24 - Ach": 51200,
      "2024-25 - Target": 100000,
      "2024-25 - Ach": 75000,
      "2025-26 - Target": 140000,
      "2025-26 - Ach": 110000,
      "2026-27 - Target": 200000,
      "2026-27 - Ach": 160000
  },
  {
      "State": "Tripura",
      "2018-19 - Target": 5000,
      "2018-19 - Ach": 2500,
      "2019-20 - Target": 5000,
      "2019-20 - Ach": 2500,
      "2020-21 - Target": 5000,
      "2020-21 - Ach": 2500,
      "2021-22 - Target": 5000,
      "2021-22 - Ach": 250,
      "2022-23 - Target": 5000,
      "2022-23 - Ach": 0,
      "2023-24 - Target": 5000,
      "2023-24 - Ach": 0,
      "2024-25 - Target": 10000,
      "2024-25 - Ach": 2500,
      "2025-26 - Target": 20000,
      "2025-26 - Ach": 7500,
      "2026-27 - Target": 35000,
      "2026-27 - Ach": 15000
  },
  {
      "State": "Maharashtra",
      "2018-19 - Target": 20000,
      "2018-19 - Ach": 5000,
      "2019-20 - Target": 22500,
      "2019-20 - Ach": 6000,
      "2020-21 - Target": 24500,
      "2020-21 - Ach": 7500,
      "2021-22 - Target": 25000,
      "2021-22 - Ach": 8000,
      "2022-23 - Target": 25000,
      "2022-23 - Ach": 3950,
      "2023-24 - Target": 25000,
      "2023-24 - Ach": 3650,
      "2024-25 - Target": 40000,
      "2024-25 - Ach": 10000,
      "2025-26 - Target": 75000,
      "2025-26 - Ach": 25000,
      "2026-27 - Target": 125000,
      "2026-27 - Ach": 60000
  },
  {
      "State": "Meghalaya",
      "2018-19 - Target": 45000,
      "2018-19 - Ach": 25000,
      "2019-20 - Target": 47500,
      "2019-20 - Ach": 25500,
      "2020-21 - Target": 49000,
      "2020-21 - Ach": 26000,
      "2021-22 - Target": 50000,
      "2021-22 - Ach": 26500,
      "2022-23 - Target": 75000,
      "2022-23 - Ach": 56500,
      "2023-24 - Target": 125000,
      "2023-24 - Ach": 76400,
      "2024-25 - Target": 175000,
      "2024-25 - Ach": 125000,
      "2025-26 - Target": 250000,
      "2025-26 - Ach": 200000,
      "2026-27 - Target": 350000,
      "2026-27 - Ach": 300000
  },
  {
      "State": "Sikkim",
      "2018-19 - Target": 0,
      "2018-19 - Ach": 0,
      "2019-20 - Target": 0,
      "2019-20 - Ach": 0,
      "2020-21 - Target": 0,
      "2020-21 - Ach": 0,
      "2021-22 - Target": 500,
      "2021-22 - Ach": 0,
      "2022-23 - Target": 500,
      "2022-23 - Ach": 0,
      "2023-24 - Target": 250,
      "2023-24 - Ach": 0,
      "2024-25 - Target": 750,
      "2024-25 - Ach": 250,
      "2025-26 - Target": 1250,
      "2025-26 - Ach": 500,
      "2026-27 - Target": 2000,
      "2026-27 - Ach": 1000
  }
];

/**
* Transforms the static raw data into the nested structure 
* required by the chart components.
*/
export const fetchCultivationData = async () => {
  await new Promise(resolve => setTimeout(resolve, 50));

  const years = ["2018-19","2019-20","2020-21","2021-22","2022-23","2023-24","2024-25","2025-26","2026-27"];
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  const processedData = [];

  for (const record of RAW_CULTIVATION_DATA) {
    const stateName = record.State.trim();
    const yearlyData = [];

    for (const yearRange of years) {
      const cultivableKey = `${yearRange} - Target`;
      const actualKey = `${yearRange} - Ach`;
      const totalTarget = record[cultivableKey];
      const totalAch = record[actualKey];

      if (!totalTarget || !totalAch) continue;

      // Seasonal distribution weights (monsoon heavy)
      const seasonWeight = [2,2,3,5,7,10,12,14,10,6,3,2];
      const sumWeights = seasonWeight.reduce((a,b)=>a+b,0);

      const monthlyData = months.map((month,index)=> ({
        month,
        cultivableLand: Math.round((totalTarget * seasonWeight[index]) / sumWeights),
        actualCultivated: Math.round((totalAch * seasonWeight[index]) / sumWeights)
      }));

      yearlyData.push({
        year: yearRange,
        monthlyData
      });
    }

    processedData.push({ state: stateName, yearlyData });
  }

  return processedData;
};
