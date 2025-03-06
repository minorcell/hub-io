import { toast } from "react-toastify";

// 从环境变量获取GitHub Token
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

export const getContributors = async (repoName: string) => {
  try {
    const headers: HeadersInit = {
      Accept: "application/vnd.github.v3+json",
    };

    if (GITHUB_TOKEN) {
      headers["Authorization"] = `token ${GITHUB_TOKEN}`;
    }

    const response = await fetch(
      `https://api.github.com/repos/${repoName}/contributors`,
      {
        headers,
      }
    );

    if (response.status === 404) {
      toast.error("仓库未找到，请输入正确的URL。");
      return [];
    } else if (response.status === 403) {
      const rateLimitReset = response.headers.get("X-RateLimit-Reset");
      const resetTime = rateLimitReset
        ? new Date(parseInt(rateLimitReset) * 1000).toLocaleTimeString()
        : "稍后";
      toast.error(`API请求次数已达上限，请在${resetTime}后重试。`);
      return [];
    } else if (!response.ok) {
      toast.error(`请求失败: ${response.status} ${response.statusText}`);
      return [];
    }

    const data = await response.json();
    if (data.length === 0) {
      toast.warning("该仓库没有贡献者信息。");
    }
    return data;
  } catch (error) {
    console.error("获取贡献者信息时出错:", error);
    toast.error("获取贡献者信息失败，请检查网络连接或稍后重试。");
    return [];
  }
};
