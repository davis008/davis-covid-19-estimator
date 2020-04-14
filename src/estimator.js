/* eslint-disable linebreak-style */
/* eslint-disable max-len */
const covid19ImpactEstimator = (data) => {
  const {
    region,
    periodType,
    timeToElapse,
    reportedCases,
    totalHospitalBeds
  } = data;
  const { avgDailyIncomeInUSD, avgDailyIncomePopulation } = region;

  const impact = {};
  const severeImpact = {};

  impact.currentlyInfected = reportedCases * 10;
  severeImpact.currentlyInfected = reportedCases * 50;

  let numberOfDays;
  if (periodType.toLowerCase() === 'days') {
    numberOfDays = timeToElapse;
  } else if (periodType.toLowerCase() === 'weeks') {
    numberOfDays = timeToElapse * 7;
  } else if (periodType.toLowerCase() === 'months') {
    numberOfDays = timeToElapse * 30;
  }


  const multiplier = Math.floor(numberOfDays / 3);


  impact.currentlyInfected = reportedCases * 10;
  impact.infectionsByRequestedTime = impact.currentlyInfected * (2 ** multiplier);

  severeImpact.currentlyInfected = reportedCases * 50;
  severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * (2 ** multiplier);


  impact.severeCasesByRequestedTime = Math.floor(0.15 * impact.infectionsByRequestedTime);
  severeImpact.severeCasesByRequestedTime = Math.floor(0.15 * severeImpact.infectionsByRequestedTime);

  const availableBeds = Math.ceil(0.35 * totalHospitalBeds);

  impact.hospitalBedsByRequestedTime = availableBeds - impact.severeCasesByRequestedTime;
  severeImpact.hospitalBedsByRequestedTime = availableBeds - severeImpact.severeCasesByRequestedTime;


  impact.casesForICUByRequestedTime = Math.floor(0.05 * impact.infectionsByRequestedTime);
  impact.casesForVentilatorsByRequestedTime = Math.floor(0.02 * impact.infectionsByRequestedTime);
  impact.dollarsInFlight = Math.floor((impact.infectionsByRequestedTime * avgDailyIncomePopulation * avgDailyIncomeInUSD) / numberOfDays);

  severeImpact.casesForICUByRequestedTime = Math.floor(0.05 * severeImpact.infectionsByRequestedTime);
  severeImpact.casesForVentilatorsByRequestedTime = Math.floor(0.02 * severeImpact.infectionsByRequestedTime);
  severeImpact.dollarsInFlight = Math.floor((severeImpact.infectionsByRequestedTime * avgDailyIncomePopulation * avgDailyIncomeInUSD) / numberOfDays);

  return { data, impact, severeImpact };
};
export default covid19ImpactEstimator;
