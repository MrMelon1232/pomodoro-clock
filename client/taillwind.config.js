/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                work: "#d87a5d", // terracotta (work)
                short: "#6c9c78", // soft forest green (short break)
                long: "#5d88b4", // calm blue (long break)
                background: "#1e1e1e", // dark neutral background
            },
            fontFamily: {
                sans: ["Inter", "sans-serif"],
            },
        },
    },

    plugins: [],
};
