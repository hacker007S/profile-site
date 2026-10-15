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

// Quick view pop-up on the portfolio page.
(function quickView() {
  var modal = document.getElementById("modal");
  if (!modal) {
    return;
  }
  var backdrop = document.getElementById("modal-backdrop");
  var closeButton = document.getElementById("modal-close");
  var title = document.getElementById("modal-title");
  var body = document.getElementById("modal-body");
  var link = document.getElementById("modal-link");
  var opener = null;

  var projects = {
    p1: {
      title: "Student timetable app",
      text: "Enter your modules and the app draws a weekly grid, warning you about clashes. Built with HTML, CSS and JavaScript, with the data stored in the browser.",
      href: "project.html#timetable"
    },
    p2: {
      title: "Bus arrivals data analysis",
      text: "A Python notebook that cleaned a month of open bus data and charted which routes were most often late. Group project; I did the data cleaning and the charts.",
      href: "project.html#bus-data"
    },
    p3: {
      title: "Password strength checker",
      text: "A command-line Python tool that scores a password and explains each point lost, including a check against a list of breached passwords.",
      href: "project.html#password"
    }
  };

  function focusable() {
    return modal.querySelectorAll("a[href], button:not([disabled])");
  }

  function open(id, button) {
    var p = projects[id];
    if (!p) {
      return;
    }
    opener = button;
    title.textContent = p.title;
    body.innerHTML = "";
    var para = document.createElement("p");
    para.textContent = p.text;
    body.appendChild(para);
    link.setAttribute("href", p.href);
    backdrop.hidden = false;
    modal.hidden = false;
    closeButton.focus();
    document.addEventListener("keydown", onKey);
  }

  function close() {
    modal.hidden = true;
    backdrop.hidden = true;
    document.removeEventListener("keydown", onKey);
    if (opener) {
      opener.focus();
    }
  }

  // Escape closes the pop-up; Tab stays inside it while it is open.
  function onKey(event) {
    if (event.key === "Escape") {
      close();
      return;
    }
    if (event.key === "Tab") {
      var items = focusable();
      var first = items[0];
      var last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  }

  var buttons = document.querySelectorAll(".quick-view");
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function (event) {
      open(event.currentTarget.getAttribute("data-project"), event.currentTarget);
    });
  }
  closeButton.addEventListener("click", close);
  backdrop.addEventListener("click", close);
})();

// Contact form validation. Client side only; nothing is sent anywhere.
(function contactForm() {
  var form = document.getElementById("contact-form");
  if (!form) {
    return;
  }
  var status = document.getElementById("form-status");

  function setError(id, message) {
    var input = document.getElementById(id);
    var error = document.getElementById(id + "-error");
    error.textContent = message;
    input.parentNode.classList.toggle("invalid", message !== "");
    input.setAttribute("aria-invalid", message === "" ? "false" : "true");
  }

  function validEmail(value) {
    // Simple check: something, an @, something, a dot, something.
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var name = form.name.value.trim();
    var email = form.email.value.trim();
    var message = form.message.value.trim();
    var firstBad = null;

    setError("name", "");
    setError("email", "");
    setError("message", "");

    if (name === "") {
      setError("name", "Please enter your name.");
      firstBad = firstBad || form.name;
    }
    if (email === "") {
      setError("email", "Please enter your email address.");
      firstBad = firstBad || form.email;
    } else if (!validEmail(email)) {
      setError("email", "That does not look like an email address. Check it and try again.");
      firstBad = firstBad || form.email;
    }
    if (message === "") {
      setError("message", "Please enter a message or question.");
      firstBad = firstBad || form.message;
    }

    if (firstBad) {
      status.className = "status failed";
      status.textContent = "The form was not sent. Please correct the highlighted fields.";
      firstBad.focus();
      return;
    }

    status.className = "status";
    status.textContent = "Thank you, " + name + ". Your message has been received and I will reply to " + email + ".";
    form.reset();
  });
})();
