gsap.registerPlugin(ScrollTrigger);

const risteri = document.querySelectorAll("#risteriproces div");

risteri.forEach((element) => {
  let tl = gsap
    .timeline({
      scrollTrigger: {
        trigger: element,
        start: "start 50%",
        end: "+=200px",
        scrub: true,
      },
    })
    .from(element.querySelectorAll("p"), {
      duration: 2,
      opacity: 0,
      ease: "none",
      stagger: 1,
    });
});

const kaffebønner = document.querySelectorAll("#kaffebønner div");

kaffebønner.forEach((element) => {
  let tl = gsap
    .timeline({
      scrollTrigger: {
        trigger: element,
        start: "start 70%",
        end: "+=200px",
        scrub: true,
      },
    })
    .from(element.querySelectorAll("p"), {
      duration: 2,
      opacity: 0,
      ease: "none",
      stagger: 1,
    });
});

const produkter = document.querySelectorAll("#produkter");

produkter.forEach((element) => {
  let tl = gsap
    .timeline({
      scrollTrigger: {
        trigger: element,
        start: "start 85%",
        end: "",
        scrub: true,
      },
    })
    .to(element.querySelectorAll("div"), {
      duration: 2,

      y: -50,
    });
});

// En funktion der pauser videoen når den ikke vises
function playPauseVideo() {
  let videos = document.querySelectorAll("video");
  videos.forEach((video) => {
    // We can only control playback without insteraction if video is mute
    video.muted = true;
    // Play is a promise so we need to check we have it
    let playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.then((_) => {
        let observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.intersectionRatio !== 1 && !video.paused) {
                video.pause();
              } else if (video.paused) {
                video.play();
              }
            });
          },
          { threshold: 0.8 }
        );
        observer.observe(video);
      });
    }
  });
}
// And you would kick this off where appropriate with:
playPauseVideo();

// Billede der bevæger sig lidt i og med man scroller

ScrollTrigger.matchMedia({
  // large
  "(prefers-reduced-motion: no-preference)": function () {
    const paraItems = document.querySelectorAll("[data-parallax]");

    paraItems.forEach((parallax) => {
      const depth = parallax.dataset.speed;
      const movement = -(parallax.offsetHeight * depth);

      gsap.fromTo(
        parallax,
        {
          y: -movement,
        },
        {
          y: movement,
          ease: "none",
          scrollTrigger: {
            trigger: parallax,
            scrub: true,
            //markers: true
          },
        }
      );
    });
  },
});

const highlights = document.querySelectorAll(".text-highlight");

highlights.forEach((highlight) => {
  ScrollTrigger.create({
    trigger: highlight,
    start: "-100px center",
    //markers: true,
    onEnter: () => highlight.classList.add("active"),
    onEnterBack: () => highlight.classList.remove("active"),
  });
});
