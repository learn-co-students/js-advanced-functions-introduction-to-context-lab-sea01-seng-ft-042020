function createEmployeeRecord(employee) {
    let [firstName, familyName, title,payPerHour] = employee
    return {firstName: firstName,
        familyName:familyName,
        title: title,
        payPerHour: payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employees) {
    return employees.map(createEmployeeRecord)
}

function createTimeInEvent(employeeRecord, dateTime) {
    let [date, time] = dateTime.split(" ")
    let timeEvent = {
        type: "TimeIn",
        hour: parseInt(time),
        date: date
    }
    employeeRecord.timeInEvents.push(timeEvent)
    return employeeRecord
}

function createTimeOutEvent(employeeRecord, dateTime) {
    let [date, time] = dateTime.split(" ")
    let timeEvent = {
        type: "TimeOut",
        hour: parseInt(time),
        date: date
    }
    employeeRecord.timeOutEvents.push(timeEvent)
    return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, date) {
    let timeIn = employeeRecord.timeInEvents.find(function(event) {return event.date === date}).hour
    let timeOut = employeeRecord.timeOutEvents.find(function(event) {return event.date === date}).hour
    return (timeOut - timeIn)/100
}

function wagesEarnedOnDate(employeeRecord, date) {
    return hoursWorkedOnDate(employeeRecord, date) * employeeRecord.payPerHour
}

function allWagesFor(employeeRecord){
    return employeeRecord.timeInEvents.reduce(function(total, event) {return total + wagesEarnedOnDate(employeeRecord, event.date)},0)
}

function findEmployeeByFirstName(employeeRecords, firstName) {
    return employeeRecords.find(function(employeeRecord) {return employeeRecord.firstName === firstName})
}

function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce(function(total, employeeRecord) {return total + allWagesFor(employeeRecord)},0)
}