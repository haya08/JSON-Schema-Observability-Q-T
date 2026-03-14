# Code Review of Initial Data Prototype

## Overview

The prototype in `projects/initial-data` aims to collect ecosystem data related to JSON Schema by analyzing GitHub repositories that use the `json-schema` topic.

The script gathers metadata such as repository creation date, first commit date, repository topics, and first release date.
This data is written into a CSV file and later processed to generate a graph showing ecosystem growth over time.

The approach provides a useful starting point for understanding how the JSON Schema ecosystem has evolved.

---

# What the Code Does Well

### 1. Clear goal and focused scope

The prototype has a clear purpose: identifying repositories related to JSON Schema and analyzing their historical activity.
This provides useful insight into ecosystem growth.

---

### 2. Uses the GitHub API effectively

The project uses the GitHub REST API through the Octokit library to retrieve repository information such as:

* repository creation date
* first commit date
* repository topics
* first release date

Using the official API ensures the data is reliable and consistent.

---

### 3. Handles pagination correctly

GitHub search results are paginated.
The code uses Octokit’s pagination iterator to retrieve repositories across multiple pages, which allows the script to process the entire ecosystem rather than only the first page of results.

---

### 4. Structured data collection

The script organizes the extracted data into rows and writes them to a CSV file.
This makes it possible to analyze the dataset later using external tools.

---

### 5. Error handling for API requests

The code includes try/catch blocks around some API calls, which helps prevent the script from crashing if a specific repository request fails.

---

# Limitations and Issues

### 1. High number of API requests

For each repository, multiple API requests are made:

* fetch repository details
* fetch repository topics
* fetch commits
* fetch releases

This significantly increases the number of API calls required.
For large ecosystems with thousands of repositories, this approach may easily reach GitHub API rate limits.

---

### 2. Inefficient method for retrieving the first commit

The script determines the first commit by requesting the last page of commits through pagination.
For repositories with long commit histories, this can be expensive and slow.

A more efficient approach might involve using alternative GitHub endpoints or metadata if available.

---

### 3. Complex setup requirements

Running the project requires several external tools:

* Node.js
* pnpm
* Python
* csvkit
* gnuplot

In addition, a personal GitHub API token must be manually created and configured.
This makes the setup process more complex for new contributors.

---

### 4. Lack of automation

The data collection process must be executed manually by running the script and processing CSV files through several command-line tools.

This prevents continuous tracking of ecosystem metrics over time.

---

### 5. CSV format limits flexibility

The project outputs data in CSV format. While this is suitable for spreadsheets, it is less flexible for long-term data collection or automated visualization.

Structured formats such as JSON may be more suitable for storing time-series ecosystem metrics.

---

### 6. Visualization pipeline is manual

After generating the CSV file, several additional commands are required to process the data and generate a graph using gnuplot.

This multi-step process increases complexity and makes the workflow harder to reproduce.

---

# Running the code
I followed the steps mentioned in 
```
https://github.com/json-schema-org/ecosystem/blob/main/projects/initial-data/README.md
```
I discovered that i need to create a folder with name **data** that each time i run the code, a .csv file created into it with name has its creation date to make sure we are not overriding on the current data.

# Recommendation

While the current prototype demonstrates useful ideas for collecting ecosystem data, I recommend starting fresh rather than extending the existing implementation.

The main reason is that the current project is designed as a one-time data analysis pipeline, whereas the goal of this project is to build a continuous observability system for the JSON Schema ecosystem. These two goals require very different architectures.

Current Architecture

The current implementation follows a pipeline designed primarily for manual analysis:

GitHub API
    ↓
Node script
    ↓
CSV file
    ↓
csvkit commands
    ↓
gnuplot

This architecture works well for generating a dataset once and producing a static visualization. However, it introduces several limitations when trying to evolve the system into a long-term observability platform as mentioned above.

Instead, a simpler and more extensible architecture can be implemented by starting fresh with a system designed specifically for ecosystem observability.

Data Sources (GitHub API, npm API)
        ↓
Metrics Collectors (Node.js scripts)
        ↓
Time-Series Data Storage (JSON or database)
        ↓
Automated Collection (GitHub Actions)
        ↓
Dashboard & Visualizations

In this architecture:

Metrics collectors periodically gather ecosystem data from APIs.

The collected metrics are stored in a time-series dataset, allowing historical analysis.

Automation (e.g., scheduled workflows) ensures that data is updated regularly.

A dashboard provides clear visualizations of ecosystem trends over time.

Why Starting Fresh is Preferable

Starting fresh allows the system to be designed with observability as the primary goal. This enables:

automated and continuous metric collection

simpler and more maintainable data pipelines

structured time-series storage for ecosystem metrics

easier addition of new metrics in the future

integration with interactive dashboards

While the prototype provides valuable insights into collecting repository data from GitHub, rebuilding the system with a new architecture will result in a more maintainable, extensible, and automation-friendly observability platform for the JSON Schema ecosystem.

---

# What I Would Keep from the Current Approach

Although a fresh architecture is recommended, the current prototype still contains several useful components that can inform the new implementation.

First, the existing integration with the GitHub API using Octokit provides a solid reference for authentication, pagination, and repository search queries. This logic can be reused when implementing new metrics collectors.

Second, the repository processing logic demonstrates a practical approach for collecting multiple metrics from a repository and aggregating them into a single data structure.

Third, the prototype already identifies several useful GitHub API endpoints (such as repository metadata, commits, releases, and topics) that can be leveraged when designing ecosystem metrics.

Finally, the current implementation highlights important edge cases, such as repositories without releases or commits, which should be handled gracefully in the redesigned system.

These elements provide valuable insights and can serve as a reference when building the new observability pipeline.


---
