export interface RenderOptions {
  columns: number;
  avatarSize: number;
  maxCount: number;
  includeBots: boolean;
  exclude: string[];
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  default_branch: string;
  private: boolean;
  html_url: string;
}

export interface GitHubContributor {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
  type: string;
}
