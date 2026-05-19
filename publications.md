---
title: Publications
---

<section class="page-intro">
  <p class="eyebrow">Publications</p>
  <h1>Bibliography driven, citation aware.</h1>
  <p>
    This page is generated from a curated bibliography you can maintain directly.
    Citation badges refresh live from public scholarly metadata, and each paper
    links back to a Google Scholar search for fast verification.
  </p>
  <p>
    Scholar links point to Google Scholar. The live counters use public API data
    because Google Scholar does not expose a stable client-side API for static sites.
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
