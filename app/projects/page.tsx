import React from "react";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import { Article } from "./article";

const repos = ["Agrus", "recoded", "Gravity-Sandbox", "TouchTyper"];

export type RepoDetails = {
  title: string;
  slug: string;
  description: string;
  url?: string;
  repository: string;
  readme: string;
};

const username: string = "siddharthroy12";

export async function getRepoDetails(repo: string): Promise<RepoDetails> {
  let response = await fetch(
    `https://api.github.com/repos/${username}/${repo}/readme`
  );
  let responseJson = await response.json();
  const readme = atob(responseJson.content);
  response = await fetch(`https://api.github.com/repos/${username}/${repo}`);
  responseJson = await response.json();

  return {
    title: responseJson.name,
    slug: responseJson.name,
    description: responseJson.description,
    url: responseJson.homepage,
    repository: responseJson.html_url,
    readme,
  };
}

export async function getAllProjects() {
  const list: RepoDetails[] = [];
  for (let i = 0; i < repos.length; i++) {
    list.push(await getRepoDetails(repos[i]));
  }

  return list;
}

export default async function ProjectsPage() {
  const allProjects = await getAllProjects();

  return (
    <div className="relative pb-16">
      <Navigation />
      <div className="px-6 pt-16 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
            Projects
          </h2>
          <p className="mt-4 text-zinc-400">
            Some of the projects are from work and some are on my own time.
          </p>
        </div>
        <div className="w-full h-px bg-zinc-800" />
          <div className="grid  grid-cols-1 gap-4 mx-auto lg:mx-0 md:grid-cols-3">
          <div className="grid grid-cols-1 gap-4">
            {allProjects
              .filter((_, i) => i % 3 === 0)
              .map((project) => (
                <Card key={project.slug}>
                  <Article project={project} />
                </Card>
              ))}
          </div>
          <div className="grid grid-cols-1 gap-4">
            {allProjects
              .filter((_, i) => i % 3 === 1)
              .map((project) => (
                <Card key={project.slug}>
                  <Article project={project} />
                </Card>
              ))}
          </div>
          <div className="grid grid-cols-1 gap-4">
            {allProjects
              .filter((_, i) => i % 3 === 2)
              .map((project) => (
                <Card key={project.slug}>
                  <Article project={project} />
                </Card>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
