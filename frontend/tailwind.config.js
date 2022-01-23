module.exports = {
  mode: 'jit',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      'raleway': ['Raleway', 'sans-serif'],
      'cizel': ['Cinzel', 'serif'],
      'cormorant': ['cormorant', 'serif']
    }
  },
  plugins: [],
}
