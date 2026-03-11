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

# Recommendation

I recommend starting fresh rather than building directly on this prototype.

While the existing code demonstrates useful ideas for collecting ecosystem data, the current architecture is tightly coupled to a manual workflow involving CSV processing and external tools.

Starting fresh would make it easier to design a simpler pipeline focused on automated metric collection, structured storage (such as JSON), and automated visualization.

However, the general idea of collecting repository metadata using the GitHub API is still valuable and can inform the design of a new implementation.

---

# What I Would Keep from the Current Approach

Even if starting fresh, several ideas from the prototype are worth preserving:

* Using GitHub topics to identify ecosystem repositories
* Collecting metadata such as repository creation date
* Using the GitHub API as the primary data source
* Tracking ecosystem growth over time

These concepts provide a solid foundation for building a more automated observability system.

---
