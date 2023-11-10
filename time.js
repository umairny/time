const fs = require("fs");

function generateTimeSlots(startDate, endDate, times) {
    const timeSlots = {};
    const currentDate = new Date(startDate);
    const lastDate = new Date(endDate);

    //create the list between start and end date through while loop
    while (currentDate <= lastDate) {
        //get the current formatted date
        const formattedDate = currentDate.toISOString().slice(0, 10);
        //new array for random numbers
        const newTime = [];
        //copy the times array
        const timesCopy = [...times];
        //random size of array 4 to 10
        const elm = Math.floor(Math.random() * 10);
        //create the new array with random size and numbers
        for (let i = 0; i < elm; i++) {
            const randomIndex = Math.floor(Math.random() * timesCopy.length);
            newTime.push(timesCopy.splice(randomIndex, 1)[0]);
        }
        //sorted the random array
        newTime.sort();
        // push the times to object
        timeSlots[formattedDate] = newTime;
        //set date and increase the date
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return timeSlots;
}

//Function to save the time sloth to a JSON file
function saveTimeSlotsToFile(timeSlotsObj) {
    fs.writeFileSync("data.json", JSON.stringify(timeSlotsObj));
    console.log("Time slots saved to data.json", timeSlotsObj);
}

//new date object
const date = new Date();
//Today's date
const startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate())
    .toJSON()
    .slice(0, 10);
//Date 3 months from today
const endDate = new Date(
    date.getFullYear(),
    date.getMonth() + 2,
    date.getDate()
)
    .toJSON()
    .slice(0, 10);
//full time string
const times = [
    "1:00 PM",
    "1:30 PM",
    "2:00 PM",
    "2:30 PM",
    "3:00 PM",
    "3:30 PM",
    "4:00 PM",
    "4:30 PM",
    "5:00 PM",
    "5:30 PM",
    "6:00 PM",
    "6:30 PM",
    "7:00 PM",
    "7:30 PM",
    "8:00 PM",
    "8:30 PM",
    "9:00 PM",
    "9:30 PM",
];

//daily update the json file
function DailyUpdate() {
    //final object
    const timeSlotsObj = generateTimeSlots(startDate, endDate, times);
    //console.log(timeSlotsObj);
    saveTimeSlotsToFile(timeSlotsObj);
}

//Schedule the daily update
const data = require("./data.json");

if (startDate !== Object.keys(data)[0]) {
    DailyUpdate();
}
