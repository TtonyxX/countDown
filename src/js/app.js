var satDates = ["November 2, 2019 7:50:00", "December 7, 2019 7:50:00", "March 14, 2020 7:50:00", "May 2, 2020 7:50:00", "June 6, 2020 7:50:00"];
var actDates = ["December 14, 2019 7:50:00", "Feb 8, 2020 7:50:00", "Apr 4, 2020 7:50:00", "June 13, 2020 7:50:00", "July 18, 2020 7:50:00"];
var selectedTest = "SAT";
var dates = satDates;
var currentIndex = 0;
var countDownDate;

if(localStorage.test == "act") {
  dates = actDates;
  selectedTest = "ACT";
  $("#switch").prop('checked', false); 
  $('#switch').data('checked', "1");
}

if(localStorage.currentIndex != null) {
  currentIndex = localStorage.currentIndex;
}

function countDown() {
  countDownDate = new Date(dates[currentIndex]);
  startTimer("clock", countDownDate);
  $("#header").html(dates[currentIndex].split(" ")[0] + " " + selectedTest);

  // Get todays date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // If the count down is over
  if (distance < 0) {
    dates.shift();
    countDownDate = new Date(dates[0]).getTime();
    stopTimer();
    countDown();
  }
}

window.onload = () => {
  countDown();
};

function right() {
  if (currentIndex + 1 < dates.length) {
    currentIndex++;
    localStorage.currentIndex = currentIndex;
    $("#header").html(dates[currentIndex].split(" ")[0] + " " + selectedTest);
    stopTimer();
    countDown();
  }
}

function left() {
  if (currentIndex - 1 >= 0) {
    currentIndex--;
    localStorage.currentIndex = currentIndex;
    $("#header").html(dates[currentIndex].split(" ")[0] + " " + selectedTest);
    stopTimer();
    countDown();
  }
}

$('#switch').change(function() {
  if ($('#switch').data('checked') == "1") {
    $('#switch').data('checked', "0");
    localStorage.test = "sat";
    selectedTest = "SAT";
    dates = satDates;
    currentIndex = 0;
    stopTimer();
    countDown();
  } else {
    $('#switch').data('checked', "1");
    localStorage.test = "act";
    selectedTest = "ACT";
    dates = actDates;
    currentIndex = 0;
    stopTimer();
    countDown();
  }
});

$("#settings-btn").click(function() {
  $("#settings-background").show();
  animateCSS("#settings-background", "fadeIn");
});

$("#exit-settings").click(function () {
  animateCSS("#settings-background", "fadeOut", function() {
      $("#settings-background").hide();
  })
});

function animateCSS(element, animationName, callback) {
  const node = document.querySelector(element)
  node.classList.add('animated', animationName)

  function handleAnimationEnd() {
      node.classList.remove('animated', animationName)
      node.removeEventListener('animationend', handleAnimationEnd)

      if (typeof callback === 'function') callback()
  }

  node.addEventListener('animationend', handleAnimationEnd)
}
