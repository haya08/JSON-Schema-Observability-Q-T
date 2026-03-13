async function fetchGitHubTopicStarsCount(topic){
    const url = `https://api.github.com/search/repositories?q=topic:${topic}`;
    
    try {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`GitHub API error: ${res.status}`);
        }

        const data = await res.json();

        //! calculate the total number of stars for the json schema topic across all repos
        const totalStars = data.items.reduce((acc, item) => acc + item.stargazers_count, 0);

        return totalStars;

    } catch (error) {
        console.error("Failed to fetch GitHub repos:", error);
        return null;
    }
}

module.exports = fetchGitHubTopicStarsCount;