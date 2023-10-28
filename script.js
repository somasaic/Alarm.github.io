// Get references to HTML elements
const timeDisplay = document.getElementById("time");
const hourInput = document.getElementById("hour");
const minuteInput = document.getElementById("minute");
const secondInput = document.getElementById("second");
const ampmSelect = document.getElementById("ampm");
const setAlarmButton = document.getElementById("setAlarm");
const alarmList = document.getElementById("alarmList");

// Function to display the current time
function updateTime() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;
  timeDisplay.textContent = `${formattedHours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} ${ampm}`;
}

// Function to set an alarm
function setAlarm() {
  const hour = parseInt(hourInput.value, 10);
  const minute = parseInt(minuteInput.value, 10);
  const second = parseInt(secondInput.value, 10);
  const ampm = ampmSelect.value;
  
  if (!isNaN(hour) && !isNaN(minute) && !isNaN(second) && (ampm === 'AM' || ampm === 'PM')) {
    const alarmTime = new Date();
    alarmTime.setHours(ampm === 'PM' ? hour + 12 : hour);
    alarmTime.setMinutes(minute);
    alarmTime.setSeconds(second);
    alarmTime.setMilliseconds(0);

    const alarmItem = document.createElement("li");
    alarmItem.textContent = `${hour}:${String(minute).padStart(2, '0')}:${String(second).padStart(2, '0')} ${ampm}`;
    
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      alarmList.removeChild(alarmItem);
    });
    
    alarmItem.appendChild(deleteButton);
    alarmList.appendChild(alarmItem);

    const currentTime = new Date();
    const timeUntilAlarm = alarmTime - currentTime;

    if (timeUntilAlarm > 0) {
      setTimeout(() => {
        alert("Alarm!");
        alarmList.removeChild(alarmItem);
      }, timeUntilAlarm);
    } else {
      alert("Invalid alarm time. Please set a future time.");
      alarmList.removeChild(alarmItem);
    }

  } else {
    alert("Please enter a valid time and AM/PM.");
  }
}

// Update the clock every second
setInterval(updateTime, 1000);

// Set alarm when the "Set Alarm" button is clicked
setAlarmButton.addEventListener("click", setAlarm);

// Initial clock update
updateTime();
