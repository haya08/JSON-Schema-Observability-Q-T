async function fetchWithRetry(url, retries = 3) {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const res = await fetch(url);

            if (res.ok) return res;

            throw new Error(`HTTP ${res.status}`);
        } catch (err) {
            if (attempt === retries) throw err;

            const waitMs = 1000 * Math.pow(2, attempt);
            console.log(`[NPM] Retry ${attempt} in ${waitMs / 1000}s`);
            await new Promise(r => setTimeout(r, waitMs));
        }
    }
}

module.exports = fetchWithRetry;