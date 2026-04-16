/* **************************************************************************** 
                          Custom GSAP js start 
****************************************************************************  */

var tl = gsap.timeline();
gsap.registerPlugin(ScrollTrigger, SplitText);

// **************************** Nav Menu js Start ****************************
// let mm = gsap.matchMedia();

// mm.add("(min-width: 992px)", () => {
//   gsap.from('.nav-menu__item', {
//     opacity: 0,
//     duration: .4,
//     y: -20,
//     stagger: .12,
//   });
// });
// **************************** Nav Menu js End ****************************

// **************************** Smooth Scroll js Start ****************************
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin);
if ($("#smooth-wrapper").length && $("#smooth-content").length) {
  ScrollSmoother.create({
    smooth: 2.35,
    effects: true,
    smoothTouch: 0.15,
    ignoreMobileResize: true,
  });
}
// **************************** Smooth Scroll js End ****************************

// **************************** Preloader js Start ****************************
if ($(".preloader").length) {
  const tl = gsap.timeline();
  tl.from(".preloader .block", {
    scaleX: 0,
    duration: 0.8,
    ease: "power1.in",
    delay: 2,
    stagger: 0.04,
  })
    .to(".preloader", {
      yPercent: -100,
      duration: 0.6,
      ease: "power2.inOut",
      onComplete: () => {
        gsap.set(".preloader", { display: "none" });
      },
    })
    .from(
      ".hero-section.four",
      {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.2",
    );
}
// **************************** Preloader js End ****************************

// **************************** Custom Cursor Js Start ****************************
var body = document.body;
var cursor = document.querySelector(".cursor");
var dot = document.querySelector(".dot");
var cursorSmalls = document.querySelectorAll(".cursor-small");
var cursorBigs = document.querySelectorAll(".cursor-big");

// Move cursor
body.addEventListener("mousemove", function (event) {
  gsap.to(cursor, {
    x: event.x,
    y: event.y,
    duration: 1.5,
    delay: 0.1,
    visibility: "visible",
    ease: "expo.out",
  });

  gsap.to(dot, {
    x: event.x,
    y: event.y,
    duration: 1,
    visibility: "visible",
    ease: "expo.out",
  });
});

// Small Cursor
cursorSmalls.forEach((cursorSmall) => {
  cursorSmall.addEventListener("mouseenter", function () {
    gsap.to(dot, {
      scale: 8,
      backgroundColor: "#fff",
    });
    gsap.to(cursor, {
      opacity: 0,
      visibility: "hidden",
    });
  });

  cursorSmall.addEventListener("mouseleave", function () {
    gsap.to(dot, {
      scale: 1,
      backgroundColor: "#fff",
    });
    gsap.to(cursor, {
      opacity: 1,
      visibility: "visible",
    });
  });
});

// Big Cursor
cursorBigs.forEach((cursorBig) => {
  cursorBig.addEventListener("mouseenter", function () {
    gsap.to(dot, {
      scale: 30,
      backgroundColor: "#fff",
    });
    gsap.to(cursor, {
      opacity: 0,
      visibility: "hidden",
    });
  });

  cursorBig.addEventListener("mouseleave", function () {
    gsap.to(dot, {
      scale: 1,
      backgroundColor: "#fff",
    });
    gsap.to(cursor, {
      opacity: 1,
      visibility: "visible",
    });
  });
});

// 🔥 NEW: Hide cursor on a, button hover
document.querySelectorAll("a, button").forEach((el) => {
  el.addEventListener("mouseenter", function () {
    gsap.to([cursor, dot], {
      scale: 0,
      duration: 0.3,
      ease: "power2.out",
    });
  });

  el.addEventListener("mouseleave", function () {
    gsap.to([cursor, dot], {
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  });
});
// **************************** Custom Cursor Js End ****************************

// **************************** Mobile Menu js Start ****************************
var mmm = gsap.matchMedia();
var mtl = gsap.timeline({ paused: true });

const toggleMobileMenu = document.querySelector(".toggle-mobileMenu");
const closeButton = document.querySelector(".close-button");
const mobileSideOverlay = document.querySelector(".side-overlay");

mmm.add("(max-width: 991px)", () => {
  mtl.to(".side-overlay", {
    opacity: 1,
    visibility: "visible",
    duration: 0.15,
  });

  mtl.to(".mobile-menu", {
    x: 0,
    delay: 0.2,
    duration: 0.2,
  });

  mtl.from(".nav-menu__item", {
    opacity: 0,
    duration: 0.2,
    y: -60,
    stagger: 0.08,
  });

  toggleMobileMenu.addEventListener("click", function () {
    mtl.play();
    document.body.style.overflow = "hidden";
  });

  closeButton.addEventListener("click", function () {
    mtl.reverse();
    document.body.style.overflow = "";
  });

  mobileSideOverlay.addEventListener("click", function () {
    mtl.reverse();
    document.body.style.overflow = "";
  });
});
// **************************** Mobile Menu js End ****************************

// **************************** Custom Split text Js Start ****************************
if ($(".splitTextStyleOne").length) {
  let staggerAmount = 0.05,
    translateXValue = 0,
    delayValue = 0.3,
    animatedTextElements = document.querySelectorAll(".splitTextStyleOne");

  animatedTextElements.forEach((element) => {
    let animationSplitText = new SplitText(element, { type: "chars, words" });
    gsap.from(animationSplitText.words, {
      duration: 0.6,
      delay: delayValue,
      y: 20,
      autoAlpha: 0,
      stagger: staggerAmount,
      scrollTrigger: { trigger: element, start: "top 85%" },
    });
  });
}
// **************************** Custom Split text Js End ****************************

// **************************** Position Aware button hover js start ****************************
class Button {
  constructor(buttonElement) {
    this.block = buttonElement;
    this.init();
    this.initEvents();
  }

  init() {
    const el = gsap.utils.selector(this.block);

    this.DOM = {
      button: this.block,
      flair: el(".button__flair"),
    };

    this.xSet = gsap.quickSetter(this.DOM.flair, "xPercent");
    this.ySet = gsap.quickSetter(this.DOM.flair, "yPercent");
  }

  getXY(e) {
    const { left, top, width, height } =
      this.DOM.button.getBoundingClientRect();

    const xTransformer = gsap.utils.pipe(
      gsap.utils.mapRange(0, width, 0, 100),
      gsap.utils.clamp(0, 100),
    );

    const yTransformer = gsap.utils.pipe(
      gsap.utils.mapRange(0, height, 0, 100),
      gsap.utils.clamp(0, 100),
    );

    return {
      x: xTransformer(e.clientX - left),
      y: yTransformer(e.clientY - top),
    };
  }

  initEvents() {
    this.DOM.button.addEventListener("mouseenter", (e) => {
      const { x, y } = this.getXY(e);

      this.xSet(x);
      this.ySet(y);

      gsap.to(this.DOM.flair, {
        scale: 1,
        duration: 0.9,
        ease: "power2.out",
      });
    });

    this.DOM.button.addEventListener("mouseleave", (e) => {
      const { x, y } = this.getXY(e);

      gsap.killTweensOf(this.DOM.flair);

      gsap.to(this.DOM.flair, {
        xPercent: x > 90 ? x + 20 : x < 10 ? x - 20 : x,
        yPercent: y > 90 ? y + 20 : y < 10 ? y - 20 : y,
        scale: 0,
        duration: 0.9,
        ease: "power2.out",
      });
    });

    this.DOM.button.addEventListener("mousemove", (e) => {
      const { x, y } = this.getXY(e);

      gsap.to(this.DOM.flair, {
        xPercent: x,
        yPercent: y,
        duration: 0.9,
        ease: "power2",
      });
    });
  }
}

const buttonElements = document.querySelectorAll('[data-block="button"]');

buttonElements.forEach((buttonElement) => {
  new Button(buttonElement);
});
// **************************** Position Aware button hover js End ****************************

// **************************** split Reveal js Start ****************************
if ($(".split-reveal").length) {
  let revealContainers = document.querySelectorAll(".split-reveal");

  revealContainers.forEach((container) => {
    let splitElement = container.querySelector(".split-reveal-element");

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        toggleActions: "play none none none",
      },
    });

    tl.set(container, {
      autoAlpha: 1,
    });

    tl.from(container, {
      duration: 1,
      xPercent: -100,
      ease: Power2.out,
    });

    tl.from(splitElement, {
      duration: 1,
      xPercent: 100,
      scale: 1,
      delay: -1,
      ease: Power2.out,
    });
  });
}
// **************************** split Reveal js End ****************************

// **************************** Text Reveal js Start ****************************
function tp_scrollBg($wrap) {
  $wrap = $wrap || jQuery("body");
  $wrap.find(".text-reveal").each(function () {
    var $el = jQuery(this);
    var tpSplit = new SplitText($el[0], { type: "words, chars" });
    jQuery(tpSplit.words).children().first().addClass("tp-first-char");
    gsap.fromTo(
      tpSplit.chars,
      {
        position: "relative",
        display: "inline-block",
        opacity: 0.2,
        x: -5,
      },
      {
        opacity: 1,
        x: 0,
        stagger: 0.1,
        scrollTrigger: {
          trigger: $el[0],
          toggleActions: "play pause reverse pause",
          start: "top 70%",
          end: "top 40%",
          scrub: 0.7,
        },
      },
    );
  });
}
window.addEventListener("DOMContentLoaded", function () {
  tp_scrollBg();
});
// **************************** Text Reveal js End ****************************

// **************************** Title Animation js start ****************************
if (document.querySelector(".animated-title")) {
  gsap.set(".animated-title", {
    opacity: 0,
  });
  gsap.to(".animated-title", {
    opacity: 1,
    duration: 1,
    ease: "power1.out",
    scrollTrigger: {
      trigger: ".animated-title",
      start: "top 80%",
      toggleActions: "play none none none",
      once: true,
    },
    onComplete: runAnimation,
  });
  function runAnimation() {
    const mySplitText = new SplitText(".animated-title", {
      type: "words,chars",
    });
    const chars = mySplitText.chars;
    const cta = gsap.timeline({ repeat: -1, delay: 0.5 });
    cta.to(chars, {
      duration: 0.5,
      scaleY: 0.6,
      ease: "power1.out",
      stagger: 0.04,
      transformOrigin: "center bottom",
    });
    cta.to(
      chars,
      {
        yPercent: -20,
        ease: "elastic.out(1, 0.3)",
        stagger: 0.03,
        duration: 0.8,
      },
      0.5,
    );
    cta.to(
      chars,
      {
        scaleY: 1,
        ease: "elastic.out(1, 0.3)",
        stagger: 0.03,
        duration: 1.5,
      },
      0.5,
    );
    cta.to(
      chars,
      {
        onStart: () => {
          chars.forEach((char) => char.classList.add("char-animated"));
        },
      },
      0.5,
    );
    cta.to(
      chars,
      {
        yPercent: 0,
        ease: "back.out(1.7)",
        stagger: 0.03,
        duration: 0.8,
      },
      0.7,
    );
    cta.to(chars, {
      onStart: () => {
        chars.forEach((char) => char.classList.remove("char-animated"));
      },
    });
  }
}
// **************************** Title Animation js End ****************************

// **************************** Text hover animation js End ****************************
const headings = document.querySelectorAll(".text-hover-animation-scale");
headings.forEach((heading) => {
  const textNodes = [];

  heading.childNodes.forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      node.textContent.split(" ").forEach((word, index, array) => {
        const wordSpan = document.createElement("span");
        wordSpan.classList.add("top-word-span");
        word.split("").forEach((letter) => {
          const letterSpan = document.createElement("span");
          letterSpan.classList.add("top-text-span");
          letterSpan.textContent = letter;
          wordSpan.appendChild(letterSpan);
        });
        textNodes.push(wordSpan);
        if (index < array.length - 1) {
          textNodes.push(document.createTextNode(" "));
        }
      });
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      textNodes.push(node.cloneNode(true));
    }
  });

  heading.innerHTML = "";
  textNodes.forEach((node) => heading.appendChild(node));

  const letters = heading.querySelectorAll(".top-text-span");
  letters.forEach((letter) => {
    $(letter).on("mouseenter", () => {
      gsap.to(letter, {
        scaleY: 1.3,
        y: "-14%",
        duration: 0.2,
        ease: "sine",
      });
    });

    $(letter).on("mouseleave", () => {
      gsap.to(letter, {
        scaleY: 1,
        y: "0%",
        duration: 0.2,
        ease: "sine",
      });
    });
  });
});
// **************************** Text hover animation js End ****************************

// const text = document.querySelector(".text");

// gsap.registerPlugin(SplitText);

// const Split = SplitText.create(text, {
//   splitBy: "chars,words",
//   wordsClass: "word",
//   charsClass: "char",
//   mask: "words",
//   autoSplit: true,
//   onSplit: (self) => {
//     self.words.forEach((word) => {
//       // Get all the characters
//       const content = word.innerHTML;
//       word.innerHTML = "";
//       // Add the original characters back in
//       const chars = document.createElement("div");
//       chars.classList.add("before");
//       chars.innerHTML = content;
//       // Duplicate the characters with aria-hidden, so that screen-readers don't read duplicate content
//       const dupe = document.createElement("div");
//       dupe.classList.add("after");
//       dupe.innerHTML = content;

//       word.append(chars, dupe);
//     });
//   }
// });

// **************************** Section to title zoom and item upper js End ****************************
gsap.matchMedia().add("(min-width: 1200px)", () => {
  const portfolioArea = document.querySelector(".sticky-section");
  const portfolioText = document.querySelector(".sticky-section-text");

  if (portfolioArea && portfolioText) {
    // Timeline
    let portfolioline = gsap.timeline({
      scrollTrigger: {
        trigger: portfolioArea,
        start: "top center-=200",
        pin: portfolioText,
        end: "bottom bottom+=10",
        markers: false,
        pinSpacing: false,
        scrub: 1,
      },
    });

    portfolioline.to(portfolioText, { scale: 1.2, duration: 1 });
    portfolioline.to(portfolioText, { scale: 1.2, duration: 1 });
    portfolioline.to(portfolioText, { scale: 1.2, duration: 1 });
    portfolioline.to(portfolioText, { scale: 1.2, duration: 1 });
    portfolioline.to(portfolioText, { scale: 1.2, duration: 1 }, "+=2");

    // Opacity scroll animation
    gsap.to(portfolioText, {
      scrollTrigger: {
        trigger: portfolioArea,
        start: "top center-=100",
        end: "bottom bottom+=10",
        scrub: 1,
      },
      opacity: 0,
    });
  }
});
// **************************** Section to title zoom and item upper js End ****************************

//**************************** clip animation image js Start ****************************
document.addEventListener("DOMContentLoaded", () => {
  const initialClipPaths = [
    "polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)",
    "polygon(33.33% 0%, 33.33% 0%, 33.33% 0%, 33.33% 0%)",
    "polygon(65.66% 0%, 66.66% 0%, 66.66% 0%, 66.66% 0%)",
    "polygon(0% 33.33%, 0% 33.33%, 0% 33.33%, 0% 33.33%)",
    "polygon(33.33% 33.33%, 33.33% 33.33%, 33.33% 33.33%, 33.33% 33.33%)",
    "polygon(65.66% 33.33%, 66.66% 33.33%, 66.66% 33.33%, 66.66% 33.33%)",
    "polygon(0% 66.66%, 0% 66.66%, 0% 66.66%, 0% 66.66%)",
    "polygon(33.33% 66.66%, 33.33% 66.66%, 33.33% 66.66%, 33.33% 66.66%)",
    "polygon(65.66% 66.66%, 66.66% 66.66%, 66.66% 66.66%, 66.66% 66.66%)",
  ];

  const finalClipPaths = [
    "polygon(0% 0%, 34.33% 0%, 34.33% 34.33%, 0% 34.33%)",
    "polygon(32.33% 0%, 66.66% 0%, 66.66% 33.33%, 33.33% 34.33%)",
    "polygon(65.66% 0%, 100% 0%, 100% 33.33%, 65.66% 34.33%)",
    "polygon(0% 33.33%, 33.33% 33.33%, 33.33% 66.66%, 0% 66.66%)",
    "polygon(30.33% 33.33%, 66.66% 33.33%, 66.66% 66.66%, 33.33% 66.66%)",
    "polygon(65.66% 33.33%, 100% 32.33%, 100% 66.66%, 65.66% 66.66%)",
    "polygon(0% 65.66%, 33.33% 66.66%, 33.33% 100%, 0% 100%)",
    "polygon(30.33% 66.66%, 66.66% 65.66%, 66.66% 100%, 33.33% 100%)",
    "polygon(65.66% 66.66%, 100% 65.66%, 100% 100%, 65.66% 100%)",
  ];

  // Create mask divs for each wrapper
  document.querySelectorAll(".clip-animation").forEach((wrapper) => {
    const img = wrapper.querySelector(
      ".clip-animation-img[data-animate='true']",
    );
    if (!img) return;
    const url = img.src;

    // Remove old masks if any (reuse safe)
    wrapper.querySelectorAll(".mask").forEach((m) => m.remove());

    for (let i = 0; i < 9; i++) {
      const mask = document.createElement("div");
      mask.className = `mask mask-${i + 1}`;
      Object.assign(mask.style, {
        backgroundImage: `url(${url})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "absolute",
        inset: "0",
      });
      wrapper.appendChild(mask);
    }
  });

  // Animate masks
  gsap.utils.toArray(".clip-animation").forEach((wrapper) => {
    const masks = wrapper.querySelectorAll(".mask");
    if (!masks.length) return;

    gsap.set(masks, { clipPath: (i) => initialClipPaths[i] });

    const order = [
      [".mask-1"],
      [".mask-2", ".mask-4"],
      [".mask-3", ".mask-5", ".mask-7"],
      [".mask-6", ".mask-8"],
      [".mask-9"],
    ];

    const tl = gsap.timeline({
      scrollTrigger: { trigger: wrapper, start: "top 75%" },
    });

    order.forEach((targets, i) => {
      const validTargets = targets
        .map((c) => wrapper.querySelector(c))
        .filter((el) => el); // filter out nulls

      if (validTargets.length) {
        tl.to(
          validTargets,
          {
            clipPath: (j, el) => finalClipPaths[Array.from(masks).indexOf(el)],
            duration: 1,
            ease: "power4.out",
            stagger: 0.1,
          },
          i * 0.125,
        );
      }
    });
  });
});
//**************************** clip animation image js End ****************************

//**************************** Button text Hover animation js Start ****************************
document.querySelectorAll(".btn .btn-text").forEach((el) => {
  const text = el.textContent.trim();
  el.innerHTML = "";

  const block = document.createElement("div");
  block.classList.add("btn-anim__block");

  [...text].forEach((char) => {
    const span = document.createElement("span");
    span.className = "btn-anim__letter";
    span.textContent = char === " " ? "\u00A0" : char; // Non-breaking space
    block.appendChild(span);
  });

  el.appendChild(block);
  el.appendChild(block.cloneNode(true));
});
//**************************** Button text Hover animation js End ****************************

//**************************** Button text Hover animation js End ****************************
if ($(".custom-fade-animation").length > 0) {
  gsap.utils.toArray(".custom-fade-animation").forEach((item) => {
    let tp_fade_offset = item.getAttribute("data-fade-offset") || 40,
      tp_duration_value = item.getAttribute("data-duration") || 0.75,
      tp_fade_direction = item.getAttribute("data-fade-from") || "bottom",
      tp_onscroll_value = item.getAttribute("data-on-scroll") || 1,
      tp_delay_value = item.getAttribute("data-delay") || 0.15,
      tp_ease_value = item.getAttribute("data-ease") || "power2.out",
      tp_anim_setting = {
        opacity: 0,
        ease: tp_ease_value,
        duration: tp_duration_value,
        delay: tp_delay_value,
        x:
          tp_fade_direction == "left"
            ? -tp_fade_offset
            : tp_fade_direction == "right"
              ? tp_fade_offset
              : 0,
        y:
          tp_fade_direction == "top"
            ? -tp_fade_offset
            : tp_fade_direction == "bottom"
              ? tp_fade_offset
              : 0,
      };
    if (tp_onscroll_value == 1) {
      tp_anim_setting.scrollTrigger = {
        trigger: item,
        start: "top 99%",
      };
    }
    gsap.from(item, tp_anim_setting);
  });
}
//**************************** Button text Hover animation js End ****************************

//**************************** Scale Item animation js Start ****************************
if (document.querySelectorAll(".scale-section-wrapper").length > 0) {
  var tl = gsap.timeline({
    ease: "none",
    scrollTrigger: {
      trigger: ".scale-section-wrapper",
      pin: true,
      pinSpacing: true,
      scrub: 2,
      start: "bottom 100%",
      end: "120%",
    },
  });

  // scale background
  tl.to(".scale-item", {
    scale: 20,
    duration: 4,
    zIndex: 8,
    ease: "power2.in",
  });

  tl.to(
    ".scale-text",
    {
      scale: 20,
      duration: 4,
      zIndex: 8,
      xPercent: -50,
      yPercent: -50,
      autoAlpha: 0, // ✅ hides completely
      ease: "power2.in",
    },
    "<",
  ); // run at same time

  tl.to(".area-bg", {
    backgroundColor: "#000",
  });
}
//**************************** Scale Item animation js End ****************************

//**************************** scale little bit onscroll animation js Start ****************************
if (document.querySelectorAll(".scale-littlebit-onscroll").length > 0) {
  var tl = gsap.timeline({
    ease: "none",
    scrollTrigger: {
      trigger: ".scale-littlebit-onscroll",
      pin: true,
      pinSpacing: true,
      scrub: 2,
      start: "bottom 95%",
      end: "+=400",
    },
  });

  tl.to(".scale-littlebit-onscroll", {
    scale: 1.5,
    duration: 1,
    zIndex: 8,
    ease: "power2.in",
  });
}
//**************************** scale little bit onscroll animation js End ****************************

//**************************** Card Item animation js End ****************************
// mmm.add("(min-width: 1200px)", () => {
//   if ($(".item-animation-wrapper").length) {
//     const sections = document.querySelectorAll(".item-animation-wrapper");

//     sections.forEach((section) => {
//       const item1 = $("#item1").get(0);
//       const item2 = $("#item2").get(0);
//       const item3 = $("#item3").get(0);

//       gsap.set(item1, { x: "90%", duration: 10, backgroundColor: "#EEF3F4" });
//       gsap.set(item2, { x: "10%", duration: 10, backgroundColor: "#EEF3F4" });
//       gsap.set(item3, { x: "-70%", duration: 10, backgroundColor: "#EEF3F4" });
//       gsap.set(item4, { x: "-140%", duration: 10, backgroundColor: "#EEF3F4" });

//       let tlll = gsap.timeline({
//         scrollTrigger: {
//           trigger: section,
//           pin: true,
//           start: "top 130px",
//           end: "bottom 150%",
//           scrub: 2,
//           pinSpacing: false,
//           markers: false,
//           transition: '3s'
//         },
//       });

//       tlll
//         .to(item1, { x: "0%", duration: 4, backgroundColor: "transparent" }, 0)
//         .to(item2, { x: "0%", duration: 4, backgroundColor: "transparent" }, 0)
//         .to(item3, { x: "0%", duration: 4, backgroundColor: "transparent" }, 0)
//         .to(item4, { x: "0%", duration: 4, backgroundColor: "transparent" }, 0);
//     });
//   }
// });

document.addEventListener("DOMContentLoaded", function () {
  if (window.innerWidth > 1200) {
    const wrappers = document.querySelectorAll(".card-animation-wrapper");

    wrappers.forEach((wrapper) => {
      const items = wrapper.querySelectorAll(".card-animation");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper, // ✅ each section individually
          start: "top 60%",
          toggleActions: "play none none reverse",
          markers: false,
        },
        defaults: {
          ease: "power2.out",
          duration: 1,
        },
      });

      tl.from(items[0], {
        xPercent: 100,
        rotate: 8,
      }).from(
        items[1],
        {
          xPercent: 30,
          rotate: 4.13,
        },
        "<",
      );

      // check if items exist (important for promo section)
      if (items[2]) {
        tl.from(
          items[2],
          {
            xPercent: -30,
            rotate: -6.42,
          },
          "<",
        );
      }

      if (items[3]) {
        tl.from(
          items[3],
          {
            xPercent: -100,
            rotate: -8.15,
          },
          "<",
        );
      }
    });
  }
});
//**************************** Card Item animation js End ****************************

/* **************************************************************************** 
                          Custom GSAP js start 
****************************************************************************  */
