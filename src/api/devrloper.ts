import { toast } from "react-toastify";

export const getContributors = async (repoName: string) => {
    const response = await fetch(`https://api.github.com/repos/${repoName}/contributors`);

    if (!response.ok) {
        toast.error("Repository not found, please input right url.");
        return [];
    }
    const data = await response.json();
    return data;
}
