var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Scroll progress bar
var progressBar = document.getElementById('progress');
function updateProgress() {
  var doc = document.documentElement;
  var scrollTop = doc.scrollTop || document.body.scrollTop;
  var scrollHeight = (doc.scrollHeight || document.body.scrollHeight) - doc.clientHeight;
  var pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
  if (progressBar) progressBar.style.width = pct + '%';
}

// Timeline fill
var timelineFill = document.getElementById('timelineFill');
var timelineTrack = document.querySelector('.timeline-track');
function updateTimelineFill() {
  if (!timelineFill || !timelineTrack) return;
  var rect = timelineTrack.getBoundingClientRect();
  var vh = window.innerHeight;
  var total = rect.height;
  var progressPx = (vh * 0.75) - rect.top;
  progressPx = Math.max(0, Math.min(progressPx, total));
  var pct = total > 0 ? (progressPx / total) * 100 : 0;
  timelineFill.style.height = pct + '%';
}

// Hero parallax (skipped entirely under reduced motion)
var heroBg = document.getElementById('heroBg');
function updateParallax() {
  if (!heroBg || reducedMotion) return;
  var y = window.scrollY;
  heroBg.style.transform = 'translateY(' + (y * 0.25) + 'px)';
}

// Floating quick-jump button visibility
var quickNow = document.getElementById('quickNow');
var hero = document.querySelector('.hero');
function updateQuickNow() {
  if (!quickNow || !hero) return;
  var heroBottom = hero.getBoundingClientRect().bottom;
  if (heroBottom < 0) {
    quickNow.classList.add('visible');
  } else {
    quickNow.classList.remove('visible');
  }
}

// Assembly animation (scroll-scrubbed exploded parts)
var assemblyWrap = document.querySelector('.assembly-wrap');
var assemblyParts = [];
var assemblyCaption = document.getElementById('assemblyCaption');

if (assemblyWrap && !reducedMotion) {
  assemblyParts = Array.prototype.slice.call(assemblyWrap.querySelectorAll('.part')).map(function (el) {
    var ex = el.getAttribute('data-ex').split(',').map(Number);
    return { el: el, dx: ex[0], dy: ex[1], rot: ex[2] };
  });
}

function updateAssembly() {
  if (!assemblyWrap || reducedMotion || !assemblyParts.length) return;
  var rect = assemblyWrap.getBoundingClientRect();
  var vh = window.innerHeight;
  var total = rect.height - vh;
  var p = total > 0 ? (-rect.top) / total : 0;
  p = Math.max(0, Math.min(1, p));
  var inv = 1 - p;
  assemblyParts.forEach(function (part) {
    part.el.style.transform = 'translate(' + (part.dx * inv) + 'px,' + (part.dy * inv) + 'px) rotate(' + (part.rot * inv) + 'deg)';
  });
  if (assemblyCaption) assemblyCaption.style.opacity = p > 0.82 ? 1 : 0;
}

var ticking = false;
function onScroll() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(function () {
    updateProgress();
    updateTimelineFill();
    updateParallax();
    updateQuickNow();
    updateAssembly();
    ticking = false;
  });
}

window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', function () {
  updateTimelineFill();
  updateQuickNow();
});

updateProgress();
updateTimelineFill();
updateQuickNow();
updateAssembly();

// Scroll-reveal
var revealEls = document.querySelectorAll('.reveal, .chapter');
if ('IntersectionObserver' in window && revealEls.length) {
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2, rootMargin: '0px 0px -60px 0px' });

  revealEls.forEach(function (el) { observer.observe(el); });
} else {
  revealEls.forEach(function (el) { el.classList.add('in-view'); });
}
