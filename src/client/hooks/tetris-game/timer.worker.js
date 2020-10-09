let intervalTimer = null;

onmessage = function message({ data }) {
  console.log(data);
  switch (data.type) {
    case "SET_TIMER":
      intervalTimer = setInterval(() => {
        postMessage("Tick");
      }, data.delay);
      return;
    case "STOP_TIMER":
      clearInterval(intervalTimer);
      return;
    default:
      return;
  }
};
