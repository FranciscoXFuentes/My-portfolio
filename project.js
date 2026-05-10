(() => {
  'use strict';
  const PF = window.PF;
  const data = Array.isArray(window.projects) ? window.projects : [];

  const root = document.getElementById('project-detail');
  if (!root) return;

  const id = new URLSearchParams(window.location.search).get('id');
  const idx = data.findIndex((p) => p.slug === id);
  const project = idx >= 0 ? data[idx] : null;

  if (!project) {
    document.title = 'Not found — Francisco Fuentes';
    root.innerHTML = `
      <section class="detail__hero detail__hero--404">
        <a href="index.html#work" class="detail__back" data-reveal>← Back to work</a>
        <p class="eyebrow" data-reveal>
          <span class="eyebrow__bullet" aria-hidden="true"></span>
          Error 404
        </p>
        <h1 class="detail__title" data-reveal>
          Project<br/>not <em>found</em>.
        </h1>
        <p class="detail__tagline" data-reveal>
          The project you're looking for doesn't exist
          ${id ? `(no project with id <code>${PF.escapeHTML(id)}</code>)` : ''}
          — head back to the full list.
        </p>
        <div class="detail__actions" data-reveal>
          <a class="project__link project__link--primary" href="index.html#work">
            View all projects →
          </a>
        </div>
      </section>
    `;
    PF.initReveals(root);
    return;
  }

  document.title = `${project.title} — Francisco Fuentes`;

  const num = String(idx + 1).padStart(2, '0');
  const next = data.length > 1 ? data[(idx + 1) % data.length] : null;

  const meta = [];
  if (project.year)
    meta.push(`<li><span>Year</span><strong>${PF.escapeHTML(project.year)}</strong></li>`);
  if (project.role)
    meta.push(`<li><span>Role</span><strong>${PF.escapeHTML(project.role)}</strong></li>`);

  const actions = [];
  if (project.demo) {
    actions.push(
      `<a class="project__link project__link--primary" href="${project.demo}" target="_blank" rel="noopener" data-magnetic>Live demo →</a>`
    );
  }
  if (project.slides) {
    const cls = project.demo ? 'project__link' : 'project__link project__link--primary';
    actions.push(
      `<a class="${cls}" href="${project.slides}" target="_blank" rel="noopener" data-magnetic>View slides ↗</a>`
    );
  }
  if (project.github) {
    actions.push(
      `<a class="project__link" href="${project.github}" target="_blank" rel="noopener" data-magnetic>Source ↗</a>`
    );
  }

  const fitClass = project.imageFit === 'contain' ? ' detail__cover--contain' : '';
  const cover = project.image
    ? `<img src="${project.image}" alt="${PF.escapeHTML(project.title)} cover" />`
    : PF.placeholderSVG(idx);

  const longHTML = (project.longDescription || [])
    .map((p) => `<p>${PF.escapeHTML(p)}</p>`)
    .join('');

  const techHTML = (project.tech || []).length
    ? `<ul class="detail__tech" aria-label="Tech used">
        ${project.tech.map((t) => `<li>${PF.escapeHTML(t)}</li>`).join('')}
      </ul>`
    : '';

  const galleryHTML = (project.gallery || []).length
    ? `<section class="detail__gallery" data-reveal>
        ${project.gallery
          .map(
            (src) =>
              `<img src="${src}" alt="${PF.escapeHTML(project.title)} screenshot" loading="lazy" />`
          )
          .join('')}
      </section>`
    : '';

  const nextHTML = next
    ? `<section class="detail__next" data-reveal>
        <a href="project.html?id=${encodeURIComponent(next.slug)}">
          <span class="detail__next-label">Next project</span>
          <strong class="detail__next-title">${PF.escapeHTML(next.title)} →</strong>
        </a>
      </section>`
    : '';

  root.innerHTML = `
    <section class="detail__hero">
      <a href="index.html#work" class="detail__back" data-reveal>← Back to work</a>
      <p class="eyebrow" data-reveal>
        <span class="eyebrow__bullet" aria-hidden="true"></span>
        ${num} &mdash; Project
      </p>
      <h1 class="detail__title" data-reveal>
        ${PF.escapeHTML(project.title)}<span class="accent">.</span>
      </h1>
      <p class="detail__tagline" data-reveal>${PF.escapeHTML(project.description)}</p>
      ${meta.length ? `<ul class="detail__meta" data-reveal>${meta.join('')}</ul>` : ''}
      ${actions.length ? `<div class="detail__actions" data-reveal>${actions.join('')}</div>` : ''}
    </section>

    <div class="detail__cover${fitClass}" data-reveal>
      ${cover}
    </div>

    <section class="detail__body" data-reveal>
      ${longHTML}
      ${techHTML}
    </section>

    ${galleryHTML}
    ${nextHTML}
  `;

  PF.initReveals(root);
})();
