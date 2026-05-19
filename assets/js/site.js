const githubUser = "cosmaadrian";
const repoCache = new Map();
const citationCache = new Map();

document.addEventListener("DOMContentLoaded", () => {
  hydrateGitHubMetrics();
  hydrateCitationMetrics();
});

async function hydrateGitHubMetrics() {
  const repoNodes = [...document.querySelectorAll("[data-github-repo]")];
  const starTotalNode = document.querySelector("[data-profile-total-stars]");
  const repoCountNode = document.querySelector("[data-profile-repo-count]");

  if (!repoNodes.length && !starTotalNode && !repoCountNode) {
    return;
  }

  try {
    const response = await fetch(
      `https://api.github.com/users/${githubUser}/repos?per_page=100`,
      { headers: { Accept: "application/vnd.github+json" } }
    );

    if (!response.ok) {
      throw new Error(`GitHub request failed: ${response.status}`);
    }

    const repos = await response.json();
    const totalStars = repos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0);

    repos.forEach((repo) => {
      repoCache.set(repo.full_name.toLowerCase(), repo.stargazers_count || 0);
    });

    if (starTotalNode) {
      starTotalNode.textContent = formatNumber(totalStars);
    }

    if (repoCountNode) {
      repoCountNode.textContent = formatNumber(repos.length);
    }

    await Promise.all(repoNodes.map(updateRepoNode));
  } catch (error) {
    if (starTotalNode) {
      starTotalNode.textContent = "Unavailable";
    }
    if (repoCountNode) {
      repoCountNode.textContent = "Unavailable";
    }
    repoNodes.forEach((node) => {
      node.textContent = fallbackRepoLabel(node);
    });
  }
}

async function updateRepoNode(node) {
  const repoName = node.dataset.githubRepo;
  if (!repoName) {
    return;
  }

  const normalized = repoName.toLowerCase();

  if (repoCache.has(normalized)) {
    node.textContent = `${formatNumber(repoCache.get(normalized))} stars`;
    return;
  }

  try {
    const response = await fetch(`https://api.github.com/repos/${repoName}`, {
      headers: { Accept: "application/vnd.github+json" },
    });

    if (!response.ok) {
      throw new Error(`Repository request failed: ${response.status}`);
    }

    const repo = await response.json();
    const stars = repo.stargazers_count || 0;
    repoCache.set(normalized, stars);
    node.textContent = `${formatNumber(stars)} stars`;
  } catch (error) {
    node.textContent = fallbackRepoLabel(node);
  }
}

async function hydrateCitationMetrics() {
  const nodes = [...document.querySelectorAll("[data-citation-title]")];
  const totalNode = document.querySelector("[data-citation-total]");

  if (!nodes.length) {
    return;
  }

  const counts = await Promise.all(nodes.map(updateCitationNode));

  if (totalNode) {
    const numericCounts = counts.filter((value) => typeof value === "number");

    if (!numericCounts.length) {
      totalNode.textContent = "Citation total unavailable";
      return;
    }

    const total = numericCounts.reduce((sum, value) => sum + value, 0);
    totalNode.textContent = `${formatNumber(total)} total citations`;
  }
}

async function updateCitationNode(node) {
  const title = node.dataset.citationTitle;
  const year = Number(node.dataset.citationYear || 0);

  if (!title) {
    return;
  }

  try {
    let countPromise = citationCache.get(title);

    if (!countPromise) {
      countPromise = fetchCitationCount(title, year);
      citationCache.set(title, countPromise);
    }

    const count = await countPromise;

    if (typeof count === "number") {
      node.textContent = `${formatNumber(count)} citations`;
      return count;
    }

    node.textContent = "Citations unavailable";
    return null;
  } catch (error) {
    node.textContent = "Citations unavailable";
    return null;
  }
}

async function fetchCitationCount(title, year) {
  const response = await fetch(
    `https://api.openalex.org/works?search=${encodeURIComponent(title)}&per-page=5`
  );

  if (!response.ok) {
    throw new Error(`OpenAlex request failed: ${response.status}`);
  }

  const payload = await response.json();
  const results = Array.isArray(payload.results) ? payload.results : [];
  const expected = normalizeTitle(title);

  const bestMatch =
    results.find((work) => normalizeTitle(work.display_name) === expected) ||
    results.find((work) => {
      const workYear = Number(work.publication_year || 0);
      return workYear && year && Math.abs(workYear - year) <= 1;
    }) ||
    results[0];

  return bestMatch ? bestMatch.cited_by_count || 0 : null;
}

function normalizeTitle(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function fallbackRepoLabel(node) {
  return node.tagName === "A" ? "Code" : "Stars unavailable";
}

function formatNumber(value) {
  return new Intl.NumberFormat("en-US").format(value);
}
