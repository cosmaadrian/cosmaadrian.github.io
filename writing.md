---
title: Writing
---

<section class="page-intro">
  <p class="eyebrow">Writing</p>
  <h1>Notes, essays, and future posts.</h1>
  <p>
    This section is ready for longer-form writing on research, evaluation,
    multilinguality, and the aesthetics of good scientific work.
  </p>
</section>

{% if site.posts.size > 0 %}
  <section class="news-stack">
    {% for post in site.posts %}
      <article class="news-card">
        <p class="news-context">{{ post.date | date: "%B %-d, %Y" }}</p>
        <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
      </article>
    {% endfor %}
  </section>
{% else %}
  <section class="text-card">
    <h2>Nothing published here yet.</h2>
    <p>The layout is in place, so future essays can drop in without any redesign work.</p>
  </section>
{% endif %}
