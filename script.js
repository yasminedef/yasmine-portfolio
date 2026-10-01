/* =========================================================
   YASMINE — PORTFOLIO INTERACTIONS
   All the JS in one clean file, organized by feature.
   ========================================================= */


/* =========================================================
   1. MOBILE NAVIGATION
   Toggles the hamburger menu and closes it on link click
   ========================================================= */

const navToggle = document.querySelector('.nav-toggle');
const navLinks  = document.querySelector('.nav-links');

// Open / close menu when hamburger is clicked
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  navToggle.classList.toggle('open');
});

// Close menu when any nav link is clicked (better mobile UX)
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    navToggle.classList.remove('open');
  });
});


/* =========================================================
   2. SCROLL REVEAL ANIMATIONS
   Every section fades in + slides up as it enters the viewport.
   We use IntersectionObserver — a modern, performant browser API.
   ========================================================= */

// First, mark every major section as "reveal-ready"
const revealElements = document.querySelectorAll(
  '.section-header, .about-intro, .about-card, .skill-card, .project-card, .timeline-item, .creative-item, .contact-content'
);

// Add the starting state class (hidden + slightly down)
revealElements.forEach(el => el.classList.add('reveal'));

// Observer: fires when an element enters the viewport
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('reveal-visible');
      // Stop watching once it's revealed (no need to re-animate)
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15,       // fire when 15% of element is visible
  rootMargin: '0px 0px -50px 0px'  // wait until slightly before it fully enters
});

// Start observing each element
revealElements.forEach(el => revealObserver.observe(el));


/* =========================================================
   3. STAGGERED REVEALS
   Cards inside a grid appear one after another (nicer than all at once)
   ========================================================= */

document.querySelectorAll('.about-cards, .skills-grid, .projects-grid, .creative-grid')
  .forEach(grid => {
    const children = grid.children;
    Array.from(children).forEach((child, index) => {
      // Delay each child a bit more than the previous one
      child.style.transitionDelay = `${index * 0.08}s`;
    });
  });


/* =========================================================
   4. ACTIVE NAV LINK ON SCROLL
   Highlights the navbar link of the section currently in view.
   ========================================================= */

const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const activeSectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');

      // Remove active from all links, then add to the matching one
      navAnchors.forEach(a => a.classList.remove('active-link'));
      const currentLink = document.querySelector(`.nav-links a[href="#${id}"]`);
      if (currentLink) currentLink.classList.add('active-link');
    }
  });
}, {
  threshold: 0.4,          // section must be 40% visible to count as "active"
  rootMargin: '-80px 0px -50% 0px'  // account for the fixed navbar
});

sections.forEach(section => activeSectionObserver.observe(section));