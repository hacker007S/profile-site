// Shared script for the profile site. Plain JavaScript, no libraries.

// Mark the link for the current page in the navigation so visitors
// (and screen reader users) can tell where they are.
(function markCurrentPage() {
  var path = window.location.pathname.split("/").pop() || "index.html";
  var links = document.querySelectorAll(".site-nav a");
  for (var i = 0; i < links.length; i++) {
    var href = links[i].getAttribute("href");
    if (href === path) {
      links[i].setAttribute("aria-current", "page");
    }
  }
})();
