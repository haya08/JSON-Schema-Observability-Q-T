const fs = require("fs");
const path = require("path");

async function showGrowth(currentCount) {

    try {
        const fileContent = fs.readFileSync(path.join(__dirname, "../output/metrics.json"), "utf-8");
        if (fileContent !== "") {
            const metrics = JSON.parse(fileContent);
            const lastCount = metrics[metrics.length - 1].repo_count;
            const growth = currentCount - lastCount;
            return growth;
        }
        console.log(currentCount);
        
        return currentCount;

    } catch (error) {
        console.error("Failed to show growth:", error);
        return null;
    }
}

module.exports = showGrowth;