# Profile site

My personal profile site for the 5COM2002 module. It is written by hand in HTML, CSS and JavaScript with no frameworks, libraries or templates, and it has been developed to meet WCAG 2.2 level AA.

## Pages

- `index.html` - About me
- `interests.html` - Technical interests
- `portfolio.html` - Portfolio, with a Quick view pop-up for each project
- `project.html` - Project details (holding page)
- `contact.html` - Contact form with client-side validation only

## Running it

Open `index.html` in a browser, or from this folder run:

```
python3 -m http.server 8080
```

and go to http://localhost:8080/.

## Accessibility and testing

The site was tested twice with the WAVE browser extension. The screenshots and summary tables are in `docs/wave/midway/` (commit 88d79bc) and `docs/wave/final/` (commit 82e78e4). The final test reports zero errors, zero contrast errors and zero alerts on every page.

## Techniques used

Everything is within what was covered in the practical sessions: semantic HTML landmarks, a skip link, CSS custom properties and grid, and small plain JavaScript modules for the current-page marker, the dialog and the form validation. The dialog manages focus itself (focus moves in, Tab stays inside, Escape closes, focus returns to the opening button) because the native `dialog` element was not covered in the sessions and I wanted the behaviour to be explicit in my own code.

## Way of working

Each page or fix was done on its own branch and merged through a pull request. GitHub issues track the work.
