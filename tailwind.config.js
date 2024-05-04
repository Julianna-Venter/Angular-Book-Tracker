const { or } = require("ajv/dist/compile/codegen");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        "light-grey": "#b4b4b4",
        grey: "#23272B",
        green: "#508165",
        "dark-orange": "#f2b181",
        "light-orange": "#f4c199",
        "background-white": "#f7f6f6",
        blue: "#577490",
        "light-blue": "#7494a4",
        "blue-grey": "#c8ced5",
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
