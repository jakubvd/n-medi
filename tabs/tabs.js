<script>
// HOW IT WORKS – sequential GSAP line animation with active state
document.addEventListener("DOMContentLoaded", () => {
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    console.warn("GSAP + ScrollTrigger required");
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const trigger = document.querySelector(".how_top_content");
  if (!trigger) return;

  // Tab wrappers and lines
  const tabs = [
    document.querySelector(".how_tab_link_1"),
    document.querySelector(".how_tab_link_2"),
    document.querySelector(".how_tab_link_3"),
  ];
  const lines = [
    document.querySelector(".how_tab_link_1_line"),
    document.querySelector(".how_tab_link_2_line"),
    document.querySelector(".how_tab_link_3_line"),
  ];

  if (tabs.includes(null) || lines.includes(null)) return;

  const lineDuration = 5;     // grow time in seconds
  const fadeDuration = 0.2;   // fade-out time
  const activeTime = lineDuration + fadeDuration;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: trigger,
      start: "bottom 80%", // bottom of trigger is 20% above viewport bottom
      once: true,
    }
  });

  // Sequential animation logic
  lines.forEach((line, i) => {
    const tab = tabs[i];
    const isLast = i === lines.length - 1;

    // When animation starts → add is-active
    tl.add(() => tab.classList.add("is-active"));

    // Animate line fill
    tl.to(line, {
      width: "100%",
      duration: lineDuration,
      ease: "none",
    });

    // Fade out the line if not the last
    if (!isLast) {
      tl.to(line, {
        opacity: 0,
        duration: fadeDuration,
        ease: "power1.out"
      }, ">");
    }

    // Remove active class after full duration (except last)
    if (!isLast) {
      tl.add(() => tab.classList.remove("is-active"));
    }
  });
});
</script>