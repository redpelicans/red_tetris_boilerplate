import React from "react";
import TetrisTheme from "assets/music/Tetris_theme.ogg";
import TetrisGameOverTheme from "assets/music/Tetris_game_over.ogg";

const AudioTheme = React.memo(({ alive, speedRate }) => {
  const audioRef = React.useRef(null);

  React.useEffect(() => {
    if (alive) {
      audioRef.current.src = TetrisTheme;
      audioRef.current.volume = 0.2;
      audioRef.current.loop = true;
      audioRef.current.play();
    } else {
      audioRef.current.loop = false;
      audioRef.current.src = TetrisGameOverTheme;
      audioRef.current.playbackRate = 1.0;
      audioRef.current.volume = 1.0;
      audioRef.current.play();
    }

    return () => {
      audioRef.current.src = null;
    };
  }, [alive]);

  React.useEffect(() => {
    audioRef.current.playbackRate = speedRate;
  }, [speedRate]);

  return <audio ref={audioRef} />;
});

export default AudioTheme;
