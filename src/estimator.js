/* eslint-disable linebreak-style */
/* eslint-disable max-len */
const covid19ImpactEstimator = (data) => {
  // explicitly defining the data we need
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

  const multiplier = Math.trunc(numberOfDays / 3);

  impact.infectionsByRequestedTime = impact.currentlyInfected * 2 ** multiplier;

  severeImpact.infectionsByRequestedTime =
    severeImpact.currentlyInfected * 2 ** multiplier;

  impact.severeCasesByRequestedTime = Math.trunc(
    0.15 * impact.infectionsByRequestedTime
  );
  severeImpact.severeCasesByRequestedTime = Math.trunc(
    0.15 * severeImpact.infectionsByRequestedTime
  );

  const availableBeds = Math.trunc(0.35 * totalHospitalBeds);

  impact.hospitalBedsByRequestedTime =
    availableBeds - impact.severeCasesByRequestedTime;

  severeImpact.hospitalBedsByRequestedTime =
    availableBeds - severeImpact.severeCasesByRequestedTime;

  impact.casesForICUByRequestedTime = Math.trunc(
    0.05 * impact.infectionsByRequestedTime
  );
  severeImpact.casesForICUByRequestedTime = Math.trunc(
    0.05 * severeImpact.infectionsByRequestedTime
  );

  impact.casesForVentilatorsByRequestedTime = Math.trunc(
    0.02 * impact.infectionsByRequestedTime
  );

  severeImpact.casesForVentilatorsByRequestedTime = Math.trunc(
    0.02 * severeImpact.infectionsByRequestedTime
  );

  impact.dollarsInFlight = Math.trunc(
    (impact.infectionsByRequestedTime *
      avgDailyIncomePopulation *
      avgDailyIncomeInUSD) /
      numberOfDays
  );

  severeImpact.dollarsInFlight = Math.floor(
    (severeImpact.infectionsByRequestedTime *
      avgDailyIncomePopulation *
      avgDailyIncomeInUSD) /
      numberOfDays
  );

  return { data, impact, severeImpact };
};

export default covid19ImpactEstimator;
