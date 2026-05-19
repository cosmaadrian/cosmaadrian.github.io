---
title: Projects
---

<section class="page-intro">
  <p class="eyebrow">Projects</p>
  <h1>TODO.</h1>
  <p>
    TODO
  </p>
</section>

<section class="project-grid project-grid-full">
  {% for project in site.data.projects %}
    <article class="project-card">
      <p class="project-focus">{{ project.focus }}</p>
      <h2>{{ project.name }}</h2>
      <p>{{ project.summary }}</p>
      <div class="publication-links">
        <a class="text-link" href="https://github.com/{{ project.repo }}">Repository</a>
        <span class="metric-pill" data-github-repo="{{ project.repo }}">Stars loading</span>
      </div>
    </article>
  {% endfor %}
</section>
