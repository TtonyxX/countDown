var timeInterval;

const updateTimer = deadline => {
  // calculates time left until deadline
  const time = deadline - new Date();
  return {
    days: Math.floor(time / (1000 * 60 * 60 * 24)),
    hours: Math.floor((time / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((time / (1000 * 60)) % 60),
    seconds: Math.floor((time / 1000) % 60),
    total: time
  };
};

const animateClock = span => {
  // animation lasts for 0.5 seconds
  span.className = "turn";
  setTimeout(() => {
    span.className = "";
  }, 500);
};

const startTimer = (id, deadline) => {
  // calls updateTimer every second
  timeInterval = setInterval(() => {
    const clock = document.getElementById(id);
    let timer = updateTimer(deadline);

    clock.innerHTML =
      "<span>" +
      timer.days +
      "</span>" +
      "<span>" +
      timer.hours +
      "</span>" +
      "<span>" +
      timer.minutes +
      "</span>" +
      "<span>" +
      timer.seconds +
      "</span>";

    const spans = clock.getElementsByTagName("span");
    animateClock(spans[3]);
    if (timer.seconds == 59) animateClock(spans[2]);
    if (timer.minutes == 59 && timer.seconds == 59) animateClock(spans[1]);
    if (timer.minutes == 23 && timer.minutes == 59 && timer.seconds == 59)
      animateClock(spans[0]);

    // check if deadline has passed
    if (timer.total < 1) {
      clearInterval(timeInterval);
      clock.innerHTML =
        "<span>0</span><span>0</span><span>0</span><span>0</span>";
    }
  }, 1000);
};

const stopTimer = () => {
  clearInterval(timeInterval);
};

window.onload = () => {
  const deadline = new Date("December 23, 2018 13:00:00");
  startTimer("clock", deadline);
};
