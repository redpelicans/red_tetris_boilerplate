import React from "react";

function useAudio(url, initialOptions = {}) {
  const [audio] = React.useState(new Audio(url));

  const toggle = () => {
    let playPromise;

    return {
      play: () => {
        playPromise = audio.play();
      },
      pause: async () => {
        if (playPromise !== undefined) {
          try {
            await playPromise;
            audio.pause();
          } catch (error) {
            console.log("audio error", error);
          }
        }
      },
    };
  };
  const { play, pause } = toggle();

  React.useEffect(
    () =>
      function cleanup() {
        pause();
      },
    [],
  );

  const [options, setOptions] = React.useState(initialOptions);
  React.useEffect(() => {
    Object.entries(options).forEach(([key, value]) => {
      audio[key] = value;
    });
  }, [options]);

  return [play, pause, setOptions];
}

export default useAudio;
