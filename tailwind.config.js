const { or } = require("ajv/dist/compile/codegen");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        "light-grey": "#8c8c8b",
        grey: "#1b1a19",
        "med-grey": "#4c4c4c",
        "button-color": "#aa343c",
        "muted-red": "#704146",
        "dark-orange": "#f2b181",
        "brown-grey": "#3e3333",
        "light-orange": "#f4c199",
        "background-white": "#f7f6f6",
        blue: "#577490",
        "light-blue": "#7494a4",
        "blue-grey": "#c8ced5",
        green: "#9AAA34",
      },
      boxShadow: {
        "3xl": "0px 0px 5px 0px rgba(0,0,0,0.35)",
        "4xl":
          "-5px -5px 15px 0px rgba(85,102,102,0.05), 5px 5px 15px 0px rgba(129,126,126,0.05)",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"],
  },
};
