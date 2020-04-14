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

  impact.currentlyInfected = reportedCases * 10;
  impact.infectionsByRequestedTime =
    impact.currentlyInfected * 2 ** setsOfThreeDays;

  severeImpact.currentlyInfected = reportedCases * 50;
  severeImpact.infectionsByRequestedTime =
    severeImpact.currentlyInfected * 2 ** setsOfThreeDays;

  impact.severeCasesByRequestedTime = Math.floor(
    0.15 * impact.infectionsByRequestedTime
  );
  severeImpact.severeCasesByRequestedTime = Math.floor(
    0.15 * severeImpact.infectionsByRequestedTime
  );

  const availableBeds = Math.ceil(0.35 * totalHospitalBeds);

  impact.hospitalBedsByRequestedTime =
    availableBeds - impact.severeCasesByRequestedTime;
  severeImpact.hospitalBedsByRequestedTime =
    availableBeds - severeImpact.severeCasesByRequestedTime;

  impact.casesForICUByRequestedTime = Math.floor(
    0.05 * impact.infectionsByRequestedTime
  );
  impact.casesForVentilatorsByRequestedTime = Math.floor(
    0.02 * impact.infectionsByRequestedTime
  );
  impact.dollarsInFlight = Math.floor(
    (impact.infectionsByRequestedTime *
      avgDailyIncomePopulation *
      avgDailyIncomeInUSD) /
      numDays
  );

  severeImpact.casesForICUByRequestedTime = Math.floor(
    0.05 * severeImpact.infectionsByRequestedTime
  );
  severeImpact.casesForVentilatorsByRequestedTime = Math.floor(
    0.02 * severeImpact.infectionsByRequestedTime
  );
  severeImpact.dollarsInFlight = Math.floor(
    (severeImpact.infectionsByRequestedTime *
      avgDailyIncomePopulation *
      avgDailyIncomeInUSD) /
      numDays
  );

  return { data: input, impact, severeImpact };
};

export default covid19ImpactEstimator;
