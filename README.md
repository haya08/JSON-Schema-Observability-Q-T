# JSON Schema Ecosystem Metrics

## Overview

This project provides a simple **observability proof-of-concept for the JSON Schema ecosystem**.

It collects ecosystem metrics from public APIs such as GitHub and npm and stores them in a structured JSON file over time.
The goal is to track how the ecosystem evolves week by week.

The metrics are automatically updated using **GitHub Actions** on a weekly schedule.

This project was created as part of a qualification task for the JSON Schema ecosystem observability project.

---

# What This Project Tracks

Currently the project collects the following metrics:

### 1. npm Downloads

Weekly downloads for popular JSON Schema related packages from npm.

Examples:

* ajv
* typia

This metric helps understand **how widely JSON Schema tooling is used in the JavaScript ecosystem**.

---

### 2. GitHub Repository Count

The number of repositories tagged with the topic:

```
json-schema
```

Data source: GitHub Search API.

This metric indicates **how large the ecosystem is and how many projects are built around JSON Schema**.

---

### 3. New GitHub Repository Count

The number of new repositories tagged with the topic:

```
json-schema
```

Data source: GitHub Search API.

This metric indicates **the ecosystem growth**.

---

### 4. New GitHub Repository Count

The number of active repositories tagged with the topic:

```
json-schema
```

Data source: GitHub Search API.

This metric indicates **the actual number of repos that uses JSON Schema topic excluding the abandoned ones**.

---

### 5. GitHub Stars

Total/Average number of stars for JSON Schema repositories.

Data source: GitHub Search API.

Stars are a rough signal of **community interest and project popularity**.

---

# Data Format

All collected data is stored in:

```
output/metrics.json
```

The file acts as a **time-series dataset**, where a new record is added every week.

Example:

```json
[
  {
    "date": "2026-03-12",
    "npm_downloads": {
      "ajv": 220631931,
      "typia": 211371
    },
    "repo_count": 2414,
    "new_repos": null,
    "total_stars": 325740,
    "avg_stars": "135",
    "active_repos": 28
  }
]
```

Each entry represents the state of the ecosystem at a specific date.

---

# Project Structure

```
src/
  index.js            main script that collects metrics

output/
  metrics.json        stored metrics history

.github/workflows/
  main.yml            GitHub Actions workflow
```

---

# How the Data Is Collected

The script uses public APIs:

### npm API

Used to fetch download counts for npm packages.

Example endpoint:

```
https://api.npmjs.org/downloads/point/last-week/<package>
```

---

### GitHub API

Used to query ecosystem data.

Examples:

Count repositories with topic:

```
https://api.github.com/search/repositories?q=topic:json-schema
```

Fetch repository details:

```
https://api.github.com/repos/<owner>/<repo>
```

---

# Running the Project Locally

### 1. Clone the repository

```
git clone <repo-url>
cd <repo>
```

---

### 2. Install dependencies

```
npm install
```

---

### 3. Run the metrics collector

```
node src/index.js
OR
npm start
```

This will:

1. Fetch ecosystem data from APIs
2. Append a new entry to `metrics.json`
3. Save the updated dataset

---

# Automation with GitHub Actions

The project uses GitHub Actions to automatically collect metrics.

Workflow file:

```
.github/workflows/main.yml
```

The workflow runs:

* every Monday using a cron schedule
* manually using workflow_dispatch

Example schedule:

```
0 0 * * 1
```

This means the script runs **once per week**.

When executed, the workflow:

1. installs dependencies
2. runs the metrics script
3. updates `metrics.json`
4. commits the new data to the repository

---

# Visualization

The collected metrics can be visualized using tools such as:

* Chart.js
* spreadsheets
* dashboards

Example charts include:

* npm download trends
* ecosystem growth
* repository popularity

---

# Challenges Encountered

One challenge was designing a data format that supports **long-term time-series metrics**.

The solution was to store metrics as an array of dated entries, allowing easy historical tracking and visualization.

Another challenge was ensuring the GitHub workflow only commits changes when the dataset is updated.

---

# Future Improvements

## Adding repository snapshot
To be clear, all we have now is just aggregate numbers about all the repos tagged with JSON Schema topic.

**Aggregate numbers alone are misleading**

To understand this lets take a look at this example:

```
{ "date": "2026-03-14", "repo_count": 2414, "total_stars": 325740 }
{ "date": "2026-03-21", "repo_count": 2420, "total_stars": 326100 }
```

Stars went up by 360. Looks healthy. But you have no idea if:

  Those 360 stars all came from one repo going viral while everything else stagnated.
  
  6 new repos were created but 10 others went completely dead.
  
  The top validator (ajv) is actually losing stars while low-quality clones are gaining them.

So we can get this to conclusion : **aggregate numbers hide the story. Per-repo data tells it.**

---

# AI Assistance

AI tools were used for:

* discussing implementation ideas
* refining the data structure
* improving documentation clarity

All code and design decisions were reviewed and understood before inclusion.

---

# License

MIT
