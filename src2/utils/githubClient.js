
// async function githubFetch(url) {
//     const res = await fetch(url, {
//         headers: { Authorization: `Bearer ${process.env.MY_GITHUB_TOKEN}` }
//     });

//     const remaining = parseInt(res.headers.get('x-ratelimit-remaining'));
//     const reset = parseInt(res.headers.get('x-ratelimit-reset'));

//     if (remaining < 5) {
//         const waitMs = (reset * 1000) - Date.now() + 1000; // +1s buffer
//         console.log(`Rate limit low, waiting ${Math.ceil(waitMs/1000)}s...`);
//         await new Promise(r => setTimeout(r, waitMs));
//     }

//     if (res.status === 429 || res.status === 403) {
//         // hit the wall anyway — wait and retry
//         const waitMs = (reset * 1000) - Date.now() + 1000;
//         await new Promise(r => setTimeout(r, waitMs));
//         return githubFetch(url); // retry once after waiting
//     }

//     return res;
// }


async function githubFetch(url, options = {}) {
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.MY_GITHUB_TOKEN}`
        },
        ...options
    });

    const remaining = parseInt(res.headers.get('x-ratelimit-remaining'));
    const reset = parseInt(res.headers.get('x-ratelimit-reset'));

    if (remaining < 5) {
        const waitMs = (reset * 1000) - Date.now() + 1000;
        await new Promise(r => setTimeout(r, waitMs));
    }

    return res;
}

// async function fetchWithRetry(url, retries = 3) {
//     for (let attempt = 1; attempt <= retries; attempt++) {
//         try {
//             const res = await githubFetch(url);
//             if (res.ok) return res;
//             throw new Error(`HTTP ${res.status}`);
//         } catch (err) {
//             if (attempt === retries) throw err;
//             const waitMs = 1000 * Math.pow(2, attempt); // 2s, 4s, 8s
//             console.log(`Attempt ${attempt} failed, retrying in ${waitMs/1000}s...`);
//             await new Promise(r => setTimeout(r, waitMs));
//         }
//     }
// }

async function fetchWithRetry(url, options = {}, retries = 3) {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const res = await githubFetch(url, options);

            if (res.ok) return res;

            throw new Error(`HTTP ${res.status}`);
        } catch (err) {
            if (attempt === retries) throw err;

            const waitMs = 1000 * Math.pow(2, attempt);
            console.log(`Attempt ${attempt} failed, retrying in ${waitMs/1000}s...`);

            await new Promise(r => setTimeout(r, waitMs));
        }
    }
}

module.exports = fetchWithRetry;