import Head from 'next/head';
import fs from "fs";
import matter from "gray-matter";
import Link from "next/link";
import Image from 'next/image';

export default function Blog({ posts }) {
  return (
    <>
      <Head>
        <title>
        Blog | Somhako
        </title>
        <meta
        name="description"
        content="Make your job search easier with trackable resumes and enhanced applications."
        />
      </Head>
      <main className="py-12">
        <div className="container">
          <h1 className="font-bold text-center text-2xl mb-6">
          Our Blog
          </h1>
          <p className="mb-8 text-center text-[#646464]">
          We use an agile approach to test assumptions and connect with the needs of your audience early and often.
          </p>
          <div className="flex flex-wrap justify-center">
            {posts.map((post, index) => {
              const { slug, frontmatter } = post;
              const { title, author, category, date, excerpt, bannerImage, tags } = frontmatter;
              return (
                <div className="w-full md:max-w-[50%] lg:max-w-[calc(100%/3)] p-3" key={index}>
                  <article className="rounded-xl bg-white shadow-normal overflow-hidden border border-teal-400">
                      <Link href={`/marketplace/posts/${slug}`} className="block">
                        <Image src={bannerImage} alt="Somhako" width={600} height={400} />
                      </Link>
                      <div className="p-6">
                        <h2 className="mb-2 font-bold">
                          <Link href={`/marketplace/posts/${slug}`}>
                            {title}
                          </Link>
                        </h2>
                        <p className="mb-5 text-[12px] text-[#646464] font-light">
                          {excerpt}
                        </p>
                        <div className="flex justify-between items-center flex-wrap">
                          <div className="flex items-center">
                            <Image src={bannerImage} alt="Somhako" width={40} height={40} className="w-[40px] h-[40px] rounded-full object-cover mr-3" />
                            <div>
                              <p className="font-semibold text-[12px] leading-none">{author}</p>
                              <span className="text-[10px] text-gray-500 dark:text-gray-400">{date}</span>
                            </div>
                          </div>
                          <Link href={`/marketplace/posts/${slug}`} className="my-2 border border-[#6D27F9] rounded-full py-1.5 px-4 text-[12px] hover:bg-gradient-to-r hover:from-[#A382E5] hover:to-[#60C3E2] hover:text-white">
                            Read more
                            <i className="fa-solid fa-angles-right ml-2"></i>
                          </Link>
                        </div>
                      </div>
                  </article>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
}

//Generating the Static Props for the Blog Page
export async function getStaticProps() {
  // get list of files from the posts folder
  const files = fs.readdirSync("posts");

  // get frontmatter & slug from each post
  const posts = files.map((fileName) => {
    const slug = fileName.replace(".md", "");
    const readFile = fs.readFileSync(`posts/${fileName}`, "utf-8");
    const { data: frontmatter } = matter(readFile);

    return {
      slug,
      frontmatter,
    };
  });

  // Return the pages static props
  return {
    props: {
      posts,
    },
  };
}
