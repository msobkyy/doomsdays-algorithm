import React, { useState } from "react";
import cookies from "js-cookie";

const DoomsContext = React.createContext({
  DoomsData: () => {},
});

const lang = cookies.get("i18next");

let monthsObject = {
  January: [1, 3],
  February: [2, 28],
  March: [3, 14],
  April: [4, 4],
  May: [5, 9],
  June: [6, 6],
  July: [7, 11],
  August: [8, 8],
  September: [9, 5],
  October: [10, 10],
  November: [11, 7],
  December: [12, 12],
};
const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const daysObj = {
  1: "Saturday",
  2: "Sunday",
  3: "Monday",
  4: "Tuesday",
  5: "Wednesday",
  6: "Thursday",
  7: "Friday",
};

const doomsDayCen = {
  0: 4,
  100: 2,
  200: 7,
  300: 5,
};
const getcenlist = (year) => {
  const key = year % 400;
  const cenlist = [
    daysObj[doomsDayCen[(key + 300) % 400]],
    daysObj[doomsDayCen[key]],
    daysObj[doomsDayCen[(key + 100) % 400]],
    daysObj[doomsDayCen[(key + 200) % 400]],
  ];

  return cenlist;
};

// Make counter list

let counterDaysar = [];

const daysCountr = (num, doom, doomdaynum, month, year) => {
  counterDaysar = [];

  if (num > doom) {
    for (let i = doom; i <= num; i++) {
      if (num - i >= 7) {
        const data = [i, month, year, daysObj[doomdaynum]];
        counterDaysar.push(data);
        i += 6;
        continue;
      } else {
        if (doomdaynum === 8) {
          doomdaynum = 1;
        }
        const data = [i, month, year, daysObj[doomdaynum]];
        counterDaysar.push(data);
        doomdaynum++;
      }
    }
  } else if (num < doom) {
    for (let i = doom; i >= num; i--) {
      if (i - num >= 7) {
        const data = [i, month, year, daysObj[doomdaynum]];
        counterDaysar.push(data);
        i -= 6;
        continue;
      } else {
        if (doomdaynum === 0) {
          doomdaynum = 7;
        }
        const data = [i, month, year, daysObj[doomdaynum]];
        counterDaysar.push(data);
        doomdaynum--;
      }
    }
  } else {
    const data = [doom, month, year, daysObj[doomdaynum]];
    counterDaysar.push(data);
  }
};

// Counter to get final day
const counterLastDay = (start, counter, back) => {
  let g = start;
  if (!back) {
    for (let i = 0; i < counter; i++) {
      g++;
      if (g > 7) {
        g = 1;
      }
    }
    return g;
  } else {
    for (let i = 0; i < counter; i++) {
      g--;
      if (g < 1) {
        g = 7;
      }
    }
    return g;
  }
};

export const DoomsContextProvider = (props) => {
  const [isIt, setIsIt] = useState(false);
  const [algoData, setAlgoData] = useState([]);
  const [monthsObj, setmonthsObjState] = useState(monthsObject);
  const [enteredData, setEnterdData] = useState([]);
  const [counterDays, setcounterDays] = useState([]);
  const [result, setresult] = useState([]);
  const [darkmode, setdarkmode] = useState(
    localStorage.getItem("darkmode") || "light"
  );

  const [DoomsDayCenu, setDoomsDayCenu] = useState([]);

  const [leapYearRes, setleapYearRes] = useState();
  const [leap, setLeap] = useState(false);

  const darkmodeHandler = () => {
    if (darkmode == "dark") {
      document.body.classList.remove("dark");
      document.body.setAttribute("theme", "light");
      setdarkmode("light");
      localStorage.setItem("darkmode", "light");
    } else if (darkmode == "light") {
      document.body.classList.add("dark");
      document.body.setAttribute("theme", "dark");
      setdarkmode("dark");
      localStorage.setItem("darkmode", "dark");
    }
  };

  const DoomsDataProcess = (enteredDay, enteredMonth, enteredYear) => {
    setEnterdData([enteredDay, enteredMonth, enteredYear]);
    setcounterDays([]);

    // get the year first and last two digits
    let Y1 = enteredYear.slice(0, 2);
    let Y2 = enteredYear.slice(-2);

    // Start by taking the last two digits of the year and divide the number by four.
    // Disregarding any remainder, add the result to the number you began with.
    let yyNoRemain = Math.floor(Y2 / 4);

    let wholeYearNumber = parseInt(yyNoRemain) + parseInt(Y2);

    let wholeYearNumber2 = Math.floor(wholeYearNumber % 7);

    // check if year leap or not

    if (Y2 === "00") {
      setleapYearRes(
        "The year is a century year, the whole number must divisible by 400"
      );
      if (enteredYear % 400 === 0) {
        setLeap(true);
        setmonthsObjState({
          ...monthsObject,
          January: [1, 4],
          February: [2, 29],
        });
      } else {
        setLeap(false);
        setmonthsObjState({
          ...monthsObject,
          January: [1, 3],
          February: [2, 28],
        });
      }
    } else {
      setleapYearRes(
        "The year is not a century year, the last two digits must divisible by 4"
      );
      if (Y2 % 4 === 0 && Y2 !== "00") {
        setLeap(true);
        setmonthsObjState({
          ...monthsObject,
          January: [1, 4],
          February: [2, 29],
        });
      } else {
        setLeap(false);
        setmonthsObjState({
          ...monthsObject,
          January: [1, 3],
          February: [2, 28],
        });
      }
    }

    // get dooms day of century

    let numDoomsDayCen = 0;

    if (enteredYear.length === 4) {
      numDoomsDayCen =
        doomsDayCen[parseInt(Y1 + "00") % 400] + wholeYearNumber2;
    } else if (enteredYear.length === 3) {
      numDoomsDayCen =
        doomsDayCen[parseInt(enteredYear.substring(1, 3) + "00") % 400] +
        wholeYearNumber2;
    } else if (enteredYear.length === 5) {
      numDoomsDayCen =
        doomsDayCen[parseInt(enteredYear.slice(0, 3) + "00") % 400] +
        wholeYearNumber2;
    }

    let Doomsdaynum = numDoomsDayCen > 7 ? numDoomsDayCen % 7 : numDoomsDayCen;
    let getDoomsDayCen = daysObj[Doomsdaynum];
    setDoomsDayCenu([
      parseInt(enteredYear.substring(0, enteredYear.length - 2) + "00"),
      daysObj[numDoomsDayCen - wholeYearNumber2],
      getDoomsDayCen,
    ]);

    // substract the doom day of month and our date
    let getBetweenDays = Math.abs(enteredDay - monthsObj[enteredMonth][1]); // % 7;

    // get final day
    let counterd = 0;

    if (monthsObject[enteredMonth][1] > enteredDay) {
      counterd = counterLastDay(Doomsdaynum, getBetweenDays, true);
    } else {
      counterd = counterLastDay(Doomsdaynum, getBetweenDays, false);
    }
    let finalDayNum = counterd;
    let finalDay = daysObj[finalDayNum];

    let ms = Date.parse(`${enteredMonth} ${enteredDay} ${enteredYear}`);
    const d = new Date(ms);

    daysCountr(
      enteredDay,
      monthsObj[enteredMonth][1],
      Doomsdaynum,
      enteredMonth,
      enteredYear
    );
    setcounterDays(counterDaysar);
    setAlgoData([Y1, Y2, yyNoRemain, wholeYearNumber, wholeYearNumber2]);
    setresult([finalDay, weekday[d.getDay()]]);
    setIsIt(true);
  };

  return (
    <DoomsContext.Provider
      value={{
        enteredData,
        isLeap: leap,
        algoData,
        DoomsDayCenu,
        monthsObj,
        counterDays,
        isIt,
        result,
        daysObj,
        lang,
        cenList: getcenlist(parseInt(algoData[0] + "00")),
        DoomsData: DoomsDataProcess,
        darkmodeHandler,
        darkmode,
      }}
    >
      {props.children}
    </DoomsContext.Provider>
  );
};

export default DoomsContext;
