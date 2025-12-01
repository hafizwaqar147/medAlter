/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{html,ts,js}"],
  theme: {
    extend: {
      colors: {
        medalter: {
          green: "#7BCFA9",
          teal: "#52A39A",
          brown: "#8A6F53",
          cream: "#F4EFE6",
          violet: "#7A75FF",
          dark: "#111827"
        }
      },
      backgroundImage: {
        "aura-radial":
          "radial-gradient(circle at 20% 20%, rgba(123,207,169,0.35), transparent 60%), radial-gradient(circle at 80% 40%, rgba(122,117,255,0.35), transparent 65%), radial-gradient(circle at 50% 90%, rgba(138,111,83,0.25), transparent 60%)",
        "botanical-gradient":
          "linear-gradient(135deg, #F4EFE6 0%, #7BCFA9 40%, #52A39A 100%)"
      },
      keyframes: {
        gentlePulse: {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.03)", opacity: "0.9" }
        },
        floatSlow: {
          "0%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
          "100%": { transform: "translateY(0px)" }
        },
        rotateOrganic: {
          "0%": { transform: "rotate(0deg)" },
          "50%": { transform: "rotate(3deg)" },
          "100%": { transform: "rotate(0deg)" }
        },
        shimmerGlow: {
          "0%": { boxShadow: "0 0 0 0 rgba(122,117,255,0.0)" },
          "50%": { boxShadow: "0 0 40px 0 rgba(122,117,255,0.5)" },
          "100%": { boxShadow: "0 0 0 0 rgba(122,117,255,0.0)" }
        }
      },
      animation: {
        gentlePulse: "gentlePulse 4s ease-in-out infinite",
        floatSlow: "floatSlow 8s ease-in-out infinite",
        rotateOrganic: "rotateOrganic 12s ease-in-out infinite",
        shimmerGlow: "shimmerGlow 5s ease-in-out infinite"
      },
      boxShadow: {
        "aura-soft": "0 18px 60px rgba(17, 24, 39, 0.28)",
        "glow-violet": "0 0 30px rgba(122,117,255,0.6)"
      }
    }
  },
  plugins: []
};