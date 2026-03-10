async function fetchGitHubTopicStarsCount(topic, pkg){
    const url = `https://api.github.com/search/repositories?q=topic:${topic}`;
    
    try {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`GitHub API error: ${res.status}`);
        }

        const data = await res.json();

        const stars = data.items.filter(p => p.name===pkg)[0].stargazers_count;

        // console.log(data.items.filter(p => p.name===pkg)[0].stargazers_count);

        return stars;

    } catch (error) {
        console.error("Failed to fetch GitHub repos:", error);
        return null;
    }
}

module.exports = fetchGitHubTopicStarsCount;