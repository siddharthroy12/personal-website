import { notFound } from "next/navigation";
import { Header } from "./header";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

type Props = {
  params: {
    slug: string;
  };
};
import { RepoDetails, getAllProjects, getRepoDetails } from "../page";

export async function generateStaticParams(): Promise<Props["params"][]> {
  return (await getAllProjects()).map((p: RepoDetails) => ({
    slug: p.slug,
  }));
}

export default async function PostPage({ params }: Props) {
  let project;
  try {
    project = await getRepoDetails(params.slug);
  } catch (e) {
    notFound();
  }

  return (
    <div className="bg-zinc-50 min-h-screen">
      <Header project={project} />

      <article className="px-4 py-12 mx-auto prose prose-zinc prose-quoteless">
        <ReactMarkdown
          children={project.readme}
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
        />
        ,
      </article>
    </div>
  );
}
