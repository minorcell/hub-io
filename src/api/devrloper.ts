export const getContributors = async (repoName: string) => {
    const response = await fetch(`https://api.github.com/repos/${repoName}/contributors`);

    if (!response.ok) {
        throw new Error(`GitHub API request failed: ${response.status}`);
    }
    const data = await response.json();
    return data;
}
