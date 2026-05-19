---
title: Home
---

<section class="hero-card">
  <div class="hero-copy">
    <p class="eyebrow">TODO | TODO | TODO</p>
    <h1>TODO.</h1>
    <p class="hero-summary">{{ site.data.profile.headline }}</p>
    <p class="hero-summary">{{ site.data.profile.research_statement }}</p>
    <div class="cta-row">
      <a class="button-primary" href="{{ '/publications/' | relative_url }}">View publications</a>
      <a class="button-secondary" href="{{ site.data.profile.scholar_url }}">Google Scholar</a>
      <a class="button-secondary" href="{{ site.data.profile.github_url }}">GitHub</a>
    </div>
    <dl class="hero-stats">
      <div>
        <dt>Publications</dt>
        <dd>{{ site.data.publications | size }}</dd>
      </div>
      <div>
        <dt>GitHub stars</dt>
        <dd data-profile-total-stars>Loading</dd>
      </div>
      <div>
        <dt>Public repos</dt>
        <dd data-profile-repo-count>Loading</dd>
      </div>
    </dl>
    <p class="availability-note">{{ site.data.profile.availability }}</p>
  </div>

  <div class="hero-portrait-wrap">
    <div class="portrait-frame">
      <img src="{{ '/assets/img/profile-photo.png' | relative_url }}" alt="Portrait of Adrian Cosma" class="hero-portrait">
    </div>
    <div class="portrait-caption">
      <span>{{ site.data.profile.location }}</span>
      <span>TODO.</span>
    </div>
  </div>
</section>

<section class="section-block">
  <div class="section-heading">
    <p class="eyebrow">Approach</p>
    <h2>What I optimize for</h2>
  </div>
  <div class="manifesto-grid">
    <article class="text-card">
      <h3>TODO</h3>
      <p>TODO.</p>
    </article>
  </div>
</section>

<section class="section-block">
  <div class="section-heading">
    <p class="eyebrow">Focus</p>
    <h2>Research areas</h2>
  </div>
  <div class="pill-grid">
    {% for item in site.data.profile.focus %}
      <span class="focus-pill">{{ item }}</span>
    {% endfor %}
  </div>
</section>

<section class="section-block">
  <div class="section-heading split-heading">
    <div>
      <p class="eyebrow">Selected work</p>
      <h2>Recent and representative publications</h2>
    </div>
    <a class="text-link" href="{{ '/publications/' | relative_url }}">See full list</a>
  </div>
  <div class="publication-grid">
    {% for publication in site.data.publications %}
      {% if publication.featured %}
        {% include publication_card.html publication=publication compact=true %}
      {% endif %}
    {% endfor %}
  </div>
</section>

<section class="section-block two-column-grid">
  <div>
    <div class="section-heading">
      <p class="eyebrow">Experience</p>
      <h2>Selected background</h2>
    </div>
    <div class="timeline">
      {% for role in site.data.experience %}
        <article class="timeline-item">
          <p class="timeline-period">{{ role.period }}</p>
          <h3>{{ role.title }}</h3>
          <p class="timeline-org">{{ role.organization }} | {{ role.location }}</p>
          <p>{{ role.summary }}</p>
          <ul class="timeline-list">
            {% for point in role.highlights %}
              <li>{{ point }}</li>
            {% endfor %}
          </ul>
        </article>
      {% endfor %}
    </div>
  </div>

  <div>
    <div class="section-heading">
      <p class="eyebrow">News</p>
      <h2>Recent signals</h2>
    </div>
    <p>Curated from publicly visible LinkedIn snippets, with the full profile linked for context.</p>
    <div class="news-stack">
      {% for item in site.data.news %}
        <article class="news-card">
          <p class="news-context">{{ item.context }}</p>
          <h3>{{ item.title }}</h3>
          <p>{{ item.summary }}</p>
          <a class="text-link" href="{{ item.href }}">LinkedIn profile</a>
        </article>
      {% endfor %}
    </div>
  </div>
</section>

<section class="section-block">
  <div class="section-heading split-heading">
    <div>
      <p class="eyebrow">Code</p>
      <h2>Research code and benchmarks</h2>
    </div>
    <a class="text-link" href="{{ '/projects/' | relative_url }}">Browse projects</a>
  </div>
  <div class="project-grid">
    {% for project in site.data.projects limit:4 %}
      <article class="project-card">
        <p class="project-focus">{{ project.focus }}</p>
        <h3>{{ project.name }}</h3>
        <p>{{ project.summary }}</p>
        <div class="publication-links">
          <a class="text-link" href="https://github.com/{{ project.repo }}">Repository</a>
          <span class="metric-pill" data-github-repo="{{ project.repo }}">Stars loading</span>
        </div>
      </article>
    {% endfor %}
  </div>
</section>
