import React from "react";

function useAudio(url, initialOptions = {}) {
  const [audio] = React.useState(new Audio(url));

  React.useEffect(
    () =>
      function cleanup() {
        audio.pause();
      },
    [],
  );

  const play = () => audio.play();
  const pause = () => audio.pause();

  const [options, setOptions] = React.useState(initialOptions);
  React.useEffect(() => {
    Object.entries(options).forEach(([key, value]) => {
      audio[key] = value;
    });
  }, [options]);

  return [play, pause, setOptions];
}

export default useAudio;
