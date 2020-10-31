/*
 ** GRID
 */

export const FREE = 0;
export const CURRENT_PIECE = 1;
export const SHADOW_PIECE = 2;
export const BLOCKED_PIECE = 3;

/*
 ** SCORING
 */

export const COMBO_SCORE = {
  1: 100,
  2: 300,
  3: 500,
  4: 800,
};

export const COMBO_TEXT = {
  1: "Row !",
  2: "Double !",
  3: "Triple !",
  4: "Tetris !",
};

/*
 ** MOVES
 */

export const KEYBOARD_ACTIONS = [
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowUp",
  "Space",
];
export const MOVE_LEFT = -1;
export const MOVE_RIGHT = 1;

/*
 ** TIMERS
 */

export const INTERVAL_MS = 1500;
export const DEFAULT_REPEAT_TIMEOUT = 5;
