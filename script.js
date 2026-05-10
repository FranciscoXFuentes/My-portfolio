(() => {
  'use strict';
  const PF = window.PF;

  const projectsEl = document.getElementById('projects');
  if (projectsEl && Array.isArray(window.projects)) {
    const data = window.projects;

    if (data.length === 0) {
      projectsEl.innerHTML = `
        <div class="projects__empty">
          No projects yet — add some in <code>projects.js</code>.
        </div>
      `;
    } else {
      projectsEl.innerHTML = data
        .map((p, i) => {
          const num = String(i + 1).padStart(2, '0');
          const detailHref = `project.html?id=${encodeURIComponent(p.slug)}`;
          const fitClass = p.imageFit === 'contain' ? ' project__media--contain' : '';
          const media = p.image
            ? `<img src="${p.image}" alt="${PF.escapeHTML(p.title)} preview" loading="lazy" />`
            : PF.placeholderSVG(i);

          const links = [];
          if (p.demo) {
            links.push(
              `<a class="project__link project__link--primary" href="${p.demo}" target="_blank" rel="noopener" data-magnetic>Live demo →</a>`
            );
          }
          if (p.slides) {
            const cls = p.demo ? 'project__link' : 'project__link project__link--primary';
            links.push(
              `<a class="${cls}" href="${p.slides}" target="_blank" rel="noopener" data-magnetic>View slides ↗</a>`
            );
          }
          if (p.github) {
            links.push(
              `<a class="project__link" href="${p.github}" target="_blank" rel="noopener" data-magnetic>Source ↗</a>`
            );
          }

          return `
            <article class="project" data-reveal role="listitem">
              <div class="project__media${fitClass}">
                <span class="project__index">${num}</span>
                ${media}
              </div>
              <h3 class="project__title">
                <a class="project__title-link" href="${detailHref}">${PF.escapeHTML(p.title)}</a>
                <span class="project__title-arrow" aria-hidden="true">↗</span>
              </h3>
              <p class="project__desc">${PF.escapeHTML(p.description)}</p>
              ${links.length ? `<div class="project__links">${links.join('')}</div>` : ''}
            </article>
          `;
        })
        .join('');
    }
  }

  const skillsEl = document.getElementById('skills-grid');
  if (skillsEl && Array.isArray(window.skills)) {
    skillsEl.innerHTML = window.skills
      .map(
        (s) => `
          <li class="skill" data-reveal>
            <span class="skill__dot" aria-hidden="true"></span>
            <span>${PF.escapeHTML(s)}</span>
          </li>
        `
      )
      .join('');
  }

  PF.initReveals();
})();
