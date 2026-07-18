// Scroll progress bar
var progressBar = document.getElementById('progress');

function updateProgress() {
  var doc = document.documentElement;
  var scrollTop = doc.scrollTop || document.body.scrollTop;
  var scrollHeight = (doc.scrollHeight || document.body.scrollHeight) - doc.clientHeight;
  var pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
  if (progressBar) progressBar.style.width = pct + '%';
}

window.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

// Scroll-reveal
var revealEls = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window && revealEls.length) {
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(function (el) { observer.observe(el); });
} else {
  revealEls.forEach(function (el) { el.classList.add('in-view'); });
}
