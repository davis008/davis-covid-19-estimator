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

  const multiplier = Math.floor(numberOfDays / 3);
  const impactIRT = impact.currentlyInfected * 2 ** multiplier;
  impact.infectionsByRequestedTime = impactIRT;

  const severeIRT = severeImpact.currentlyInfected * 2 ** multiplier;
  severeImpact.infectionsByRequestedTime = severeIRT;
  const severeCRT = Math.floor(0.15 * impact.infectionsByRequestedTime);
  impact.severeCasesByRequestedTime = severeCRT;

  severeImpact.severeCasesByRequestedTime = Math.floor(0.15 * severeIRT);

  const availableBeds = Math.floor(0.35 * totalHospitalBeds);

  impact.hospitalBedsByRequestedTime = availableBeds - impact.severeCRT;

  severeImpact.hospitalBedsByRequestedTime = availableBeds - severeCRT;

  impact.casesForICUByRequestedTime = Math.floor(0.05 * impactIRT);
  severeImpact.casesForICUByRequestedTime = Math.floor(0.05 * severeIRT);

  impact.casesForVentilatorsByRequestedTime = Math.floor(0.02 * impactIRT);

  const severeIVR = Math.floor(0.02 * severeIRT);

  severeImpact.casesForVentilatorsByRequestedTime = severeIVR;
  const impactDIF = impactIRT * avgDailyIncomePopulation * avgDailyIncomeInUSD;
  const newImpactDIF = impactDIF / numberOfDays;
  impact.dollarsInFlight = Math.floor(newImpactDIF);

  const severeDIF = severeIRT * avgDailyIncomePopulation * avgDailyIncomeInUSD;
  const newsevereDIF = severeDIF / numberOfDays;
  severeImpact.dollarsInFlight = Math.floor(newsevereDIF);
  return { data, impact, severeImpact };
};

export default covid19ImpactEstimator;
