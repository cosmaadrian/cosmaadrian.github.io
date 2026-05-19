---
title: Publications
---

<section class="page-intro">
  <p class="eyebrow">Publications</p>
  <h1>TODO.</h1>
  <p>
    TODO
  </p>
  <p>
    TODO
  </p>
  <div class="meta-row">
    <span class="meta-chip">{{ site.data.publications | size }} listed publications</span>
    <span class="meta-chip" data-citation-total>Live citation total loading</span>
    <span class="meta-chip">Live citations via public API</span>
    <a class="meta-chip meta-chip-link" href="{{ site.data.profile.scholar_url }}">Scholar profile</a>
  </div>
</section>

<section class="publication-grid publication-grid-full">
  {% for publication in site.data.publications %}
    {% include publication_card.html publication=publication %}
  {% endfor %}
</section>
