/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                terracotta: "#E2725B",
                sage: "#A2C2A1",
                sand: "#D6A25E",
                espresso: "#1C1A19",
                cream: "#F7F4EF",
            },
        },
    },
    plugins: [],
};
