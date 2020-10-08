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

  const [playing, setPlaying] = React.useState(false);
  React.useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing]);

  const toggle = React.useCallback(
    () => setPlaying((oldPlaying) => !oldPlaying),
    [],
  );

  const [options, setOptions] = React.useState(initialOptions);
  React.useEffect(() => {
    Object.entries(options).forEach(([key, value]) => {
      audio[key] = value;
    });
  }, [options]);

  return [toggle, setOptions];
}

export default useAudio;
