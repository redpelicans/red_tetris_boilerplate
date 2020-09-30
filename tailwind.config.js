const plugin = require("tailwindcss/plugin");

module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
  },
  purge: [],
  theme: {
    extend: {
      width: {
        "1/10": "10%",
        "1/11": "9.09090909%",
        "1/13": "7.69230769%",
        "1/14": "7.14285714%",
        "1/15": "6.66666667%",
        "1/16": "6.25%",
        "1/17": "5.88235294%",
        "1/18": "5.55555555%",
        "1/19": "5.26315789%",
        "1/20": "5%",
      },
      colors: {
        black: "#13151a",
        green: {
          50: "#F2FAF2",
          100: "#E6F5E6",
          200: "#BFE5BF",
          300: "#99D599",
          400: "#4DB64D",
          500: "#009600",
          600: "#008700",
          700: "#005A00",
          800: "#004400",
          900: "#002D00",
        },
        red: {
          50: "#FDF2F2",
          100: "#FCE6E6",
          200: "#F7BFBF",
          300: "#F39999",
          400: "#E94D4D",
          500: "#E00000",
          600: "#CA0000",
          700: "#860000",
          800: "#650000",
          900: "#430000",
        },
        yellow: {
          50: "#FFFDF2",
          100: "#FFFCE6",
          200: "#FFF7BF",
          300: "#FFF199",
          400: "#FFE74D",
          500: "#FFDD00",
          600: "#E6C700",
          700: "#998500",
          800: "#736300",
          900: "#4D4200",
        },
        purple: {
          50: "#FAF2FA",
          100: "#F5E6F5",
          200: "#E6BFE6",
          300: "#D699D6",
          400: "#B84DB8",
          500: "#990099",
          600: "#8A008A",
          700: "#5C005C",
          800: "#450045",
          900: "#2E002E",
        },
        cyan: {
          50: "#F2FFFC",
          100: "#E6FFFA",
          200: "#BFFFF2",
          300: "#99FFEB",
          400: "#4DFFDB",
          500: "#00FFCC",
          600: "#00E6B8",
          700: "#00997A",
          800: "#00735C",
          900: "#004D3D",
        },
        orange: {
          50: "#FFFAF5",
          100: "#FFF5EB",
          200: "#FFE6CC",
          300: "#FFD6AD",
          400: "#FFB870",
          500: "#FF9933",
          600: "#E68A2E",
          700: "#995C1F",
          800: "#734517",
          900: "#4D2E0F",
        },
        blue: {
          50: "#F2F7FA",
          100: "#E6F0F5",
          200: "#BFD9E6",
          300: "#99C2D6",
          400: "#4D94B8",
          500: "#006699",
          600: "#005C8A",
          700: "#003D5C",
          800: "#002E45",
          900: "#001F2E",
        },
        grey: {
          50: "#FCFCFC",
          100: "#F8F8FA",
          200: "#EEEEF2",
          300: "#E3E4EA",
          400: "#CECFDB",
          500: "#B9BBCB",
          600: "#A7A8B7",
          700: "#6F707A",
          800: "#53545B",
          900: "#38383D",
        },
        success: "#009600",
        error: "#E00000",
        disabled: "#CECFDB",
      },
    },
  },
  variants: {
    backgroundColor: ["responsive", "hover", "focus", "active", "disabled"],
    textColor: ["responsive", "hover", "focus", "group-hover"],
  },
  plugins: [
    plugin(({ addUtilities }) => {
      const newUtilities = [setAnimationDurations(10)];

      addUtilities(newUtilities);
    }),
  ],
};

function setAnimationDurations(maxDurationInSeconds) {
  const animationDurations = {};

  for (let i = 1; i <= maxDurationInSeconds; i++) {
    const key = `.animation-duration-${i}`;
    const value = {
      "animation-duration": `${i}s`,
    };
    animationDurations[key] = value;
  }

  return animationDurations;
}
