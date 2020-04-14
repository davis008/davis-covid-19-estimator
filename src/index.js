/* eslint-disable */
const submit = document.getElementById('submit');


submit.onclick = function () {
    // static data set for testing
    const regionNameStat = dataset.regionName;
    const regionAvgAgeStat = dataset.regionAvgAge;
    const regionAvgDailyIncomeInUSDStat = dataset.regionAvgDailyIncomeInUSD;
    const regionAvgDailyIncomePopulationStat = regionAvgDailyIncomePopulation;
    const periodTypeStat = dataset.periodType;
    const timeToElapseStat = dataset.timeToElapse;
    const reportedCasesStat = dataset.reportedCases;
    const populationStat = document.dataset.population;
    const totalHospitalBedsStat = dataset.totalHospitalBeds;
};

// dynamic data
const regionName = document.getElementById('regionName').value;
const regionAvgAge = document.getElementById('regionAvgAge').value;
const regionAvgDailyIncomeInUSD = document.getElementById('regionAvgDailyIncomeInUSD').value;
const regionAvgDailyIncomePopulation = document.getElementById('regionAvgDailyIncomePopulation').value;
const periodType = document.getElementById('periodType').value;
const timeToElapse = document.getElementById('timeToElapse').value;
const reportedCases = document.getElementById('reportedCases').value;
const population = document.getElementById('population').value;
const totalHospitalBeds = document.getElementById('totalHospitalBeds').value;