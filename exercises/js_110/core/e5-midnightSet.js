/* MIDNIGHT #1
INPUT: {integer} timeInMinutes
OUTPUT: {str} time in 24 hr format
RULES
- midnight is the starting pt
- midnight can be represented by 24 or 0
  - positive input = number of min after midnight
    - positive input adds from 0
  - negative input = number of min before midnight
    - negative input subtracts from 24
- hour and minutes are both 2 digits (padZero)
============================================
GOAL: Given the timeinMinutes with midnight (0|24) as the starting pt, return
the time in a 24 hour format string
DS
- {str} militaryTime
============================================
PROCESS
SET const HOURS_IN_DAY = 24
SET const MINUTES_IN_HOUR = 60
SET const MINUTES_IN_DAY
  CALCULATE MINUTES_IN_DAY = HOURS_IN_DAY * MINUTES_IN_HOUR
GET deltaMinutes within range [0,24]
  CHECK if deltaMinutes > HOURS_IN_DAY
    YES: SET deltaMinutes -= HOURS_IN_DAY
  CHECK if deltaMinutes < 0
    YES: SET deltaMinutes += HOURS_IN_DAY
! EXTRACT the hours from the inputMinutes
  EXTRACT the remaining minutes
  FORMAT string
    PAD numbers less than 10 with a leading 0
    ADD a middle colon between hours and minutes
*/

// LS SOLUTION
const MINUTES_IN_HOUR = 60;
const HOURS_IN_DAY = 24;
const MINUTES_IN_DAY = MINUTES_IN_HOUR * HOURS_IN_DAY;

function timeOfDay(deltaMinutes) {
  deltaMinutes = getMinutesInRange(deltaMinutes);

  let hours = Math.floor(deltaMinutes / MINUTES_IN_HOUR);
  let minutes = deltaMinutes % MINUTES_IN_HOUR;

  hours = addLeadingZeroes(hours);
  minutes = addLeadingZeroes(minutes);

  return `${hours}:${minutes}`;
}
function getMinutesInRange(deltaMinutes) {
  while (deltaMinutes > MINUTES_IN_DAY) {
    deltaMinutes -= MINUTES_IN_DAY;
  }

  while (deltaMinutes < 0) {
    deltaMinutes += MINUTES_IN_DAY;
  }

  return deltaMinutes;
}

function addLeadingZeroes(number) {
  if (number < 10) return `0${number}`;
  return number;
}

// SOLUTION USING DATE
function timeOfDayWithDate(deltaMinutes) {
  let time = new Date();
  time.setHours(0, 0);
  // let dayOfWeek = time.getDay();
  // if (dayOfWeek !== 6) dayOfWeek = 6;

  let hours = Math.floor(deltaMinutes / MINUTES_IN_HOUR);

  if (Math.sign(hours) === -1) hours += 1;
  let minutes = deltaMinutes % MINUTES_IN_HOUR;

  time.setHours(hours);
  time.setMinutes(minutes);

  console.log(time.getHours(), time.getMinutes());

  hours = addLeadingZeroes(time.getHours());
  minutes = addLeadingZeroes(time.getMinutes());
  return `${hours}:${minutes}`;
}

/* MIDNIGHT #2
INPUT: {string} 24 hour notation time
OUTPUT: {int} minutes before or after midnight [0, 1439]
RULES:
- hours can be reprsented by both 0 and 24 (guard clause)
  - if it's 24, change it to 0
GOAL: Write 2 fns before/after midnight that returns deltaMinutes before/after
midnight

=======================
DS
======================
** midnight can be represented as both 00:00 and 24:00. For the before midnight,
it should be represented as 24:00. And after midnight it should be represented
as 00:00

PROCESS (@beforeMidnight)
* @param {string} notationTime
  SET startPoint = 24
  EXTRACT hours
  EXTRACT minutes
  IF hours = 24 => change hours into 0
  CALCULATE the diff from startPoint to currentInput time
    - CONVERT both to same units (minutes)
    - MULTIPLY startPoint * MINUTES_IN_HOUR
    - MULTIPLY inputHour * MINUTES_IN_HOUR + inputMinutes
    - SUBTRACT startPoint(min) - inputTotal(min)
  SET offsetTime = previous calculation
  RETURN offsetTime

PROCESS (@afterMidnight)
* @param {string} notationTime
  EXTRACT hours
  EXTRACT minutes
  IF hours = 24 => SET hours = 0
  CONVERT inputTime into minutes
  - CONVERT hours into minutes (MIN_IN_HOUR * hours)
  - ADD inputMinutes to previousCalculation
  RETURN totalMinutes
*/

function afterMidnight(time) {
  let [hours, minutes] = extractTimeUnits(time);
  if (hours === 24) hours = 0;
  hours *= MINUTES_IN_HOUR;
  return hours + minutes;
}

function beforeMidnight(time) {
  let startPoint = HOURS_IN_DAY * MINUTES_IN_HOUR;
  let [hours, minutes] = extractTimeUnits(time);
  if (hours === 0) hours = 24;
  hours *= MINUTES_IN_HOUR;
  let totalInputMinutes = hours + minutes;
  return startPoint - totalInputMinutes;
}

function extractTimeUnits(timeString) {
  return timeString.split(":").map(Number);
}

console.log(extractTimeUnits("12:34"));

// # TESTS
function testfromMidnight() {
  console.log(afterMidnight("00:00") === 0);
  console.log(beforeMidnight("00:00") === 0);
  console.log(afterMidnight("12:34") === 754);
  console.log(beforeMidnight("12:34") === 686);
  console.log(afterMidnight("24:00") === 0);
  console.log(beforeMidnight("24:00") === 0);
}

function testTimeOfDay() {
  console.log(timeOfDay(0) === "00:00");
  console.log(timeOfDay(-3) === "23:57");
  console.log(timeOfDay(35) === "00:35");
  console.log(timeOfDay(-1437) === "00:03");
  console.log(timeOfDay(3000) === "02:00");
  console.log(timeOfDay(800) === "13:20");
  console.log(timeOfDay(-4231) === "01:29");
}

function testTimeOfDayWithDate() {
  console.log(timeOfDayWithDate(0) === "00:00");
  console.log(timeOfDayWithDate(-3) === "23:57");
  console.log(timeOfDayWithDate(35) === "00:35");
  console.log(timeOfDayWithDate(-1437) === "00:03");
  console.log(timeOfDayWithDate(3000) === "02:00");
  console.log(timeOfDayWithDate(800) === "13:20");
  console.log(timeOfDayWithDate(-4231) === "01:29");
}

testfromMidnight();
