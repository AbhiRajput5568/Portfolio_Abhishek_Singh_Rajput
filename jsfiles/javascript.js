//all js variable start
let collaps = document.querySelector(".collaps");
let collaps_icon = document.querySelector(".collaps i");
let portfolio_container = document.querySelector(".portfolio");
let collaps_upIcon = document.querySelector(".ri-arrow-up-s-line");

//all js variable end
// loader start

window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");

  setTimeout(() => {
    preloader.style.opacity = "0";
    preloader.style.transition = "opacity 0.6s ease";

    // After fade-out, hide preloader
    setTimeout(() => {
      preloader.style.display = "none";
    }, 1200);
  }, 1400);
});

// loader end
// cursor effect start
const cursor = document.querySelector(".cursor");
let x = 0,
  y = 0;
let targetX = 0,
  targetY = 0;

document.addEventListener("mousemove", (e) => {
  targetX = e.clientX;
  targetY = e.clientY;
});

function animateCursor() {
  x += (targetX - x) * 0.15;
  y += (targetY - y) * 0.15;
  cursor.style.left = x + "px";
  cursor.style.top = y + "px";
  requestAnimationFrame(animateCursor);
}

animateCursor();
// cursor effect end
// side content start
let menu = document.querySelector(".box2 i");
let close = document.querySelector(".close-icon i");
let tl = gsap.timeline({ paused: true });

// Slide in sidebar
tl.to(".side-cont", {
  x: 0,
  duration: 0.4,
  ease: "power3.out",
});

// Animate menu items (links)
tl.from(
  ".side-cont-box ul li",
  {
    x: 100,
    opacity: 0,
    duration: 0.3,
    stagger: 0.1,
    ease: "power2.out",
  },
  "<"
); // run together with sidebar

// Start paused
tl.pause();

// Open sidebar
menu.addEventListener("click", () => {
  tl.play();
});

// Close sidebar
close.addEventListener("click", (e) => {
  e.preventDefault(); // prevent link jump
  tl.reverse();
});

const sidebarLinks = document.querySelectorAll(".side-cont a");

sidebarLinks.forEach((link) => {
  link.addEventListener("click", () => {
    // Optional delay if you want scroll + then close
    setTimeout(() => {
      tl.reverse(); // close sidebar using GSAP
    }, 100); // adjust delay if needed
  });
});

// side content start

//portfolio js start
projData.forEach((p, i) => {
  let card_inner = document.createElement("div");
  card_inner.classList.add("card-inner");

  let card_front = document.createElement("div");
  card_front.classList.add("card-front");

  let card_img = document.createElement("img");
  card_img.src = p.image; // assuming p.image contains the image URL

  let card_back = document.createElement("div");
  card_back.classList.add("card-back");

  let card_proTitle = document.createElement("h1");
  card_proTitle.classList.add("proTitle");
  card_proTitle.textContent = p.title;

  let card_subHeading = document.createElement("h4");
  card_subHeading.textContent = p.subHeading;

  let card_para = document.createElement("p");
  card_para.textContent = p.description;

  let card_button = document.createElement("button");
  card_button.textContent = "View Project";

  // Append structure as needed
  card_front.appendChild(card_img);
  card_back.appendChild(card_proTitle);
  card_back.appendChild(card_subHeading);
  card_back.appendChild(card_para);
  card_back.appendChild(card_button);

  card_inner.appendChild(card_front);
  card_inner.appendChild(card_back);

  let card = document.createElement("div");
  card.classList.add("proj");
  card.appendChild(card_inner);

  document.querySelector(".projectContent").appendChild(card); // change container selector as needed
});

// portfolio card hover effect
document.querySelectorAll(".proj").forEach((proj) => {
  let cardInner = proj.querySelector(".card-inner");

  proj.addEventListener("mouseenter", () => {
    gsap.to(cardInner, { rotationY: 180, duration: 0.6, ease: "power2.out" });
  });

  proj.addEventListener("mouseleave", () => {
    gsap.to(cardInner, { rotationY: 0, duration: 0.6, ease: "power2.out" });
  });
});
//icon effect start
function portfolioCollapsIcon() {
  let bounceDown, bounceUp;

  // Wait until everything is loaded
  window.onload = () => {
    // Start initial bounce on down icon
    bounceDown = gsap.to(collaps_icon, {
      y: -10,
      duration: 0.6,
      yoyo: true,
      repeat: -1,
      ease: "power1.inOut",
    });
  };

  // 🔽 Click to collapse
  collaps_icon.addEventListener("click", () => {
    // Stop any existing animations
    gsap.killTweensOf(collaps_icon);
    bounceDown?.kill();

    gsap.killTweensOf(collaps_upIcon);
    bounceUp = gsap.to(collaps_upIcon, {
      y: -10,
      duration: 0.6,
      yoyo: true,
      repeat: -1,
      ease: "power1.inOut",
    });

    // Collapse the content
    gsap.to(collaps, {
      height: 0,
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
      onComplete: () => {
        collaps.style.display = "none";
      },
    });

    // Smoothly animate portfolio height to auto
    portfolio_container.style.height = portfolio_container.offsetHeight + "px";
    void portfolio_container.offsetWidth;
    gsap.to(portfolio_container, {
      height: "auto",
      duration: 0.5,
      ease: "power2.out",
    });
  });

  // 🔼 Click to expand
  collaps_upIcon.addEventListener("click", () => {
    // Stop any existing animations
    gsap.killTweensOf(collaps_upIcon);
    bounceUp?.kill();

    gsap.killTweensOf(collaps_icon);
    bounceDown = gsap.to(collaps_icon, {
      y: -10,
      duration: 0.6,
      yoyo: true,
      repeat: -1,
      ease: "power1.inOut",
    });

    // Expand collaps section
    collaps.style.display = "block";
    gsap.fromTo(
      collaps,
      { height: 0, opacity: 0 },
      {
        height: "240px",
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      }
    );

    // Smoothly animate portfolio height to fixed 700px
    gsap.to(portfolio_container, {
      height: "700px",
      duration: 0.5,
      ease: "power2.out",
    });
  });
}
portfolioCollapsIcon();
//icon effect end
//portfolio js end
//skill js start
skillData.forEach((p, i) => {
  let skill_container = document.querySelector(".skill-container");
  // console.log(p, i);
  const skillBox = document.createElement("div");
  skillBox.classList.add("skill-box");
  const skillBox_img = document.createElement("img");
  skillBox_img.src = p.img;
  const skillBox_h4 = document.createElement("h4");
  skillBox_h4.innerText = p.h4;
  const skillBox_progress = document.createElement("progress");
  skillBox_progress.classList.add("progress");
  skillBox_progress.max = "100";
  skillBox_progress.value = p.progressValue;
  skillBox.appendChild(skillBox_img);
  skillBox.appendChild(skillBox_h4);
  skillBox.appendChild(skillBox_progress);
  skill_container.appendChild(skillBox);
});
//skill js end

//contact us code start
const scriptURL =
  "https://script.google.com/macros/s/AKfycbyE6bC_6KBI9b_jkglak2C1Ed9MLhqN6OGJgl-zBKFpJze37mLcAUdCkCeLzOaGJjaY/exec";
const form = document.forms["contact-form"];

form.addEventListener("submit", (e) => {
  e.preventDefault();

  fetch(scriptURL, {
    method: "POST",
    body: new FormData(form), // ✅ Use FormData, NOT JSON
  })
    .then((response) => {
      alert("Message sent!");
      form.reset();
    })
    .catch((error) => {
      alert("Error sending message!");
      console.error(error);
    });
});

//contact us code end
// https://script.google.com/macros/s/AKfycbzobVxeLZLVpG3cpa6WmqAWYjZHwEsuJwpZp-Pn-UsT75hNR_FmDQ4zgjv8W14utM9v2A/exec

// AKfycbzobVxeLZLVpG3cpa6WmqAWYjZHwEsuJwpZp-Pn-UsT75hNR_FmDQ4zgjv8W14utM9v2A
