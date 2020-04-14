const covid19ImpactEstimator = (data) => {
  const normalisedDurationInput = (periodType, timeToElapse) => {
    switch (periodType) {
      case 'weeks':
        return timeToElapse * 7;
      case 'months':
        return timeToElapse * 30;
      default:
        return timeToElapse;
    }
  };

  const days = normalisedDurationInput(data.timeToElapse, data.periodType);
  const bedAvailability = Math.trunc(data.totalHospitalBeds * 0.35);

  const impactData = {
    currentlyInfected: reportedCases * 10,
    infectionsByRequestedTime: Math.trunc(
      impactData.currentlyInfected * 2 ** (days / 3)
    ),
    severeCasesByRequestedTime: Math.trunc(
      0.15 * impactData.infectionsByRequestedTime
    ),
    hospitalBedsByRequestedTime: Math.trunc(
      impactData.severeCasesByRequestedTime - bedAvailability
    ),
    casesForICUByRequestedTime: 0.05 * impactData.infectionsByRequestedTime,
    casesForVentilatorsByRequestedTime:
      0.02 * impactData.infectionsByRequestedTime,
    dollarsInFlight:
      impactData.InfectionsByRequestedTime *
      data.region.avgDailyIncomeInUSD *
      days
  };
  const severeImpactData = {
    currentlyInfected: data.reportedCases * 50,
    infectionsByRequestedTime: Math.trunc(
      severeImpactData.currentlyInfected * 2 ** (days / 3)
    ),
    severeCasesByRequestedTime: Math.trunc(
      0.15 * severeImpactData.infectionsByRequestedTime
    ),
    hospitalBedsByRequestedTime: Math.trunc(
      severeImpactData.severeCasesByRequestedTime - bedAvailability
    ),
    casesForICUByRequestedTime:
      0.05 * severeImpactData.infectionsByRequestedTime,
    casesForVentilatorsByRequestedTime:
      0.02 * severeImpactData.infectionsByRequestedTime,
    dollarsInFlight:
      severeImpactData.infectionsByRequestedTime *
      data.region.avgDailyIncomeInUSD *
      days
  };
  return {
    data,
    impact: impactData,
    severeImpact: severeImpactData
  };
};

export default covid19ImpactEstimator;
