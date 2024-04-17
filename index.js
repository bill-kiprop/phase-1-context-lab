
function createEmployeeRecord(employeeInfo) {
    return {
        firstName: employeeInfo[0],
        familyName: employeeInfo[1],
        title: employeeInfo[2],
        payPerHour: employeeInfo[3],
        timeInEvents: [],
        timeOutEvents: [],
        createTimeInEvent,
        createTimeOutEvent,
        hoursWorkedOnDate,
        wagesEarnedOnDate,
        allWagesFor
    };
}


function createEmployeeRecords(employeesData) {
    return employeesData.map(createEmployeeRecord);
}


function createTimeInEvent(timeStamp) {
    const [date, hour] = timeStamp.split(' ');
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    });
    return this;
}


function createTimeOutEvent(timeStamp) {
    const [date, hour] = timeStamp.split(' ');
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    });
    return this;
}


function hoursWorkedOnDate(date) {
    const timeIn = this.timeInEvents.find(event => event.date === date);
    const timeOut = this.timeOutEvents.find(event => event.date === date);
    const hoursWorked = (timeOut.hour - timeIn.hour) / 100;
    return hoursWorked;
}

function wagesEarnedOnDate(date) {
    const hoursWorked = this.hoursWorkedOnDate(date);
    const payOwed = hoursWorked * this.payPerHour;
    return payOwed;
}


function allWagesFor() {
    const allDates = this.timeInEvents.map(event => event.date);
    const totalWages = allDates.reduce((total, date) => total + this.wagesEarnedOnDate(date), 0);
    return totalWages;
}


function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(employee => employee.firstName === firstName);
}

function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((totalPayroll, employeeRecord) => totalPayroll + employeeRecord.allWagesFor(), 0);
}
