//select html elements
const userBirthday = document.getElementById("user-birthday");
const calculateAgeBtn = document.getElementById("calculate-age-btn");
const errorMessage = document.getElementById("error-message");
const datesCard = document.querySelector(".dates-card");

const userBirthdayArray = document.querySelector(".user-birthday").querySelectorAll(".num");
const userAgeArray = document.querySelector(".user-age").querySelectorAll(".num");

//max date user enter -> today date
userBirthday.max = new Date().toISOString().split("T")[0];

//////////////////////////////////////////////////////////

calculateAgeBtn.addEventListener('click', (event) => {
    
    event.preventDefault();

    var birthDate = new Date(userBirthday.value);
    var currentDate = new Date();

    // check if date is invalid || check if birthDate year is greater than currentDate year
    if(!birthDate.getFullYear() || birthDate > currentDate) {
        //show error message
        errorMessage.classList.remove("hidden");
        userBirthday.classList.add("error-border");
        datesCard.classList.add("hidden");
        console.log("Error, Invalid Date");
    } else {
        //remove error message and show dates card
        userBirthday.classList.remove("error-border");
        errorMessage.classList.add("hidden");
        datesCard.classList.remove("hidden");

        //calculate date diff
        var dateDiff = currentDate - birthDate;
        var birthDatePlusoneDay = datePlusOneDay(birthDate);
        
        //convert dateDiff into years, months, days.
        var userAge = convertMilliseconds(dateDiff);

        //show result in dates card
        userBirthdayArray[0].textContent = birthDatePlusoneDay.getFullYear();
        userBirthdayArray[1].textContent = birthDatePlusoneDay.getMonth() + 1;
        userBirthdayArray[2].textContent = birthDatePlusoneDay.getDate();

        userAgeArray[0].textContent = userAge.years;
        userAgeArray[1].textContent = userAge.months;
        userAgeArray[2].textContent = userAge.days;
        
    }

})

//function to add one day to date
function datePlusOneDay(date) {
    const millisecondsInOneDay = 24 * 60 * 60 * 1000;
    const currentTime = date.getTime();
    const newTime = currentTime + millisecondsInOneDay;
    return new Date(newTime);
}

//function to convert milliseconds to years, months, days.
function convertMilliseconds(milliseconds) {
    const millisecondsPerSecond = 1000;
    const millisecondsPerMinute = millisecondsPerSecond * 60;
    const millisecondsPerHour = millisecondsPerMinute * 60;
    const millisecondsPerDay = millisecondsPerHour * 24;
    const millisecondsPerYear = millisecondsPerDay * 365.25;
    const millisecondsPerMonth = millisecondsPerDay * 30.44;

    // Calculate years
    const years = Math.floor(milliseconds / millisecondsPerYear);
    milliseconds -= years * millisecondsPerYear;

    // Calculate months
    const months = Math.floor(milliseconds / millisecondsPerMonth);
    milliseconds -= months * millisecondsPerMonth;

    // Calculate days
    const days = Math.floor(milliseconds / millisecondsPerDay);

    return {
        years: years,
        months: months,
        days: days
    };
}

// // Example usage:
// const milliseconds = 753100395604; // My Birthday in milliseconds - 5/31/2024
// const result = convertMilliseconds(milliseconds);

// console.log(`Years: ${result.years}, Months: ${result.months}, Days: ${result.days}`);