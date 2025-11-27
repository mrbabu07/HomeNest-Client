
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark"], // DaisyUI-এর built-in
  },
};