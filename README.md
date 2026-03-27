# JSON Schema Ecosystem Observability

An automated observability system for analyzing the health, growth, and evolution of the JSON Schema ecosystem over time.

---

## 🚀 Overview

This project provides a data-driven observability platform for the JSON Schema ecosystem.

It collects, processes, and analyzes repository and package data to generate meaningful insights about ecosystem activity, health, and trends. The system is designed as a modular and extensible pipeline, allowing continuous addition of new metrics and analytics as the ecosystem evolves.

---

## 🧠 Why This Project Matters

Currently, there is limited visibility into the overall state of the JSON Schema ecosystem.

This project helps to:

- Identify actively maintained vs stale repositories  
- Track ecosystem growth and adoption trends  
- Highlight areas that may need support or attention  
- Provide a data-driven view of ecosystem health  

By transforming raw data into actionable insights, the system enables better decision-making for maintainers and contributors.

---

## Running the Project Locally

### 1. Clone the repository

```
HTTPS: https://github.com/haya08/JSON-Schema-Observability-Q-T.git
SSH: https://github.com/haya08/JSON-Schema-Observability-Q-T.git

cd JSON-Schema-Observability-Q-T
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

---

## 🏗️ System Architecture

Data Sources → Collection → Processing → Snapshots → Analytics → Dashboard

---

### Flow:

1. Fetch data from GitHub (GraphQL) and npm APIs  
2. Normalize and process data  
3. Compute metrics  
4. Store periodic snapshots  
5. Compare historical data  
6. Generate insights  
7. Render dashboard  

---

## ⚙️ Features

- Automated data collection using GitHub GraphQL API  
- Snapshot-based historical tracking  
- Modular and extensible metrics system  
- Ecosystem health and activity analysis  
- Trend and growth detection  
- Interactive dashboard visualization  
- Automated workflow using GitHub Actions  

---

## 📊 Metrics & Insights

The system supports multiple categories of metrics, including:

- **Activity & Maintenance Signals**  
  (e.g., active vs inactive repositories)

- **Popularity & Adoption Indicators**  
  (e.g., stars, forks, ecosystem growth patterns)

- **Ecosystem Health Classification**  
  (based on combined signals)

- **Trend & Growth Analysis**  
  (tracking changes between snapshots)

The architecture is designed to support adding new metrics and insights without major changes to the system.

---

## 🔄 Workflow

1. Fetch ecosystem data from APIs  
2. Normalize and clean data  
3. Compute repository-level metrics  
4. Store snapshots (JSON)  
5. Compare with previous snapshots  
6. Generate insights (trends, activity, health)  
7. Display results in dashboard  

---

## 🤖 Automation

The system is fully automated using GitHub Actions.

- Runs on a scheduled basis (weekly)  
- Collects, processes, and stores new snapshots  
- Keeps the dataset continuously updated  

---

## 📁 Project Structure

```
src/
├── collectors/ # Data fetching (GraphQL, npm)
├── processing/ # Metrics computation
├── storage/ # Snapshot saving
├── analytics/ # Trend & insights logic

output/
├── snapshots/ # Stored historical data

```

---

## 🧪 Design Decisions

- **GraphQL over REST**  
  Reduces number of API requests and improves efficiency  

- **Snapshot-based architecture**  
  Enables historical tracking and trend analysis  

- **Modular processing pipeline**  
  Allows adding new metrics without restructuring the system  

- **Automation-first approach**  
  Ensures continuous data updates without manual effort  

---

## ⚠️ Limitations

- Metrics are currently based on a subset of repositories  
- Ecosystem-wide insights are approximations  
- Advanced signals (e.g., dependencies, contributor graphs) are not yet included  

---

## 🚀 Future Work

- Add more advanced ecosystem metrics  
- Improve accuracy of ecosystem-wide insights  
- Introduce dependency and relationship analysis  
- Enhance dashboard interactivity and filtering  
- Expand data sources beyond GitHub and npm  

---


# AI Assistance

AI tools were used for:

* discussing implementation ideas
* refining the data structure
* improving documentation clarity

All code and design decisions were reviewed and understood before inclusion.

---
