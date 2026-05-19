---
title: CV
---

<section class="page-intro">
  <p class="eyebrow">CV</p>
  <h1>Formal CV slot.</h1>
  <p>
    The PDF version of my CV will be added here shortly. Until then, this page
    highlights the core background most relevant for research hiring.
  </p>
</section>

<section class="two-column-grid">
  <div class="text-card">
    <h2>Current profile</h2>
    <p>{{ site.data.profile.headline }}</p>
    <p>{{ site.data.profile.availability }}</p>
    <div class="cta-row">
      <a class="button-secondary" href="mailto:{{ site.author.email }}">Email</a>
      <a class="button-secondary" href="{{ site.data.profile.linkedin_url }}">LinkedIn</a>
      <a class="button-secondary" href="{{ site.data.profile.github_url }}">GitHub</a>
    </div>
  </div>

  <div class="text-card">
    <h2>Research emphasis</h2>
    <ul class="timeline-list">
      {% for item in site.data.profile.focus %}
        <li>{{ item }}</li>
      {% endfor %}
    </ul>
  </div>
</section>

<section class="timeline">
  {% for role in site.data.experience %}
    <article class="timeline-item">
      <p class="timeline-period">{{ role.period }}</p>
      <h2>{{ role.title }}</h2>
      <p class="timeline-org">{{ role.organization }} | {{ role.location }}</p>
      <p>{{ role.summary }}</p>
    </article>
  {% endfor %}
</section>
