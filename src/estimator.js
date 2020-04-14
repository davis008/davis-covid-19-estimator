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
  impactIRT = impact.currentlyInfected * 2 ** multiplier;
  impact.infectionsByRequestedTime = impactIRT;

  severeIRT = severeImpact.currentlyInfected * 2 ** multiplier;
  severeImpact.infectionsByRequestedTime = severeIRT;
  severeCRT = 0.15 * impact.infectionsByRequestedTime;
  impact.severeCasesByRequestedTime = Math.trunc(severeCRT);

  severeImpact.severeCasesByRequestedTime = Math.trunc(0.15 * severeIRT);

  const availableBeds = Math.trunc(0.35 * totalHospitalBeds);

  impact.hospitalBedsByRequestedTime = availableBeds - impact.severeCRT;

  severeImpact.hospitalBedsByRequestedTime = availableBeds - severeCRT;

  impact.casesForICUByRequestedTime = Math.trunc(0.05 * impactIRT);
  severeImpact.casesForICUByRequestedTime = Math.trunc(0.05 * severeIRT);

  impact.casesForVentilatorsByRequestedTime = Math.trunc(0.02 * impactIRT);

  severeIVR = Math.trunc(0.02 * severeIRT);

  severeImpact.casesForVentilatorsByRequestedTime = severeIVR;
  impactDIF = impactIRT * avgDailyIncomePopulation * avgDailyIncomeInUSD;
  newImpactDIF = impactDIF / numberOfDays;
  impact.dollarsInFlight = Math.trunc(newImpactDIF);

  severeDIF = severeIRT * avgDailyIncomePopulation * avgDailyIncomeInUSD;
  newsevereDIF = severeDIF / numberOfDays;
  severeImpact.dollarsInFlight = Math.floor(newsevereDIF);
  return { data, impact, severeImpact };
};

export default covid19ImpactEstimator;
