import Link from "next/link";
import Image from "next/image";
import { db } from "~/server/db";

export const revalidate = 60;

export default async function HomePage() {
  const posts = await db.query.posts.findMany();
  const images = await db.query.images.findMany({
    orderBy: (model, { desc }) => desc(model.id),
  });

  return (
    <main className="flex flex-wrap gap-4 bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      {images.map((image) => (
        <div key={image.id} className="flex w-48 flex-col">
          <img src={image.url ? image.url : image.name} />
          <div>{image.name}</div>
        </div>
      ))}

      {posts.map((post) => (
        <div key={post.id}>{post.name}</div>
      ))}
    </main>
  );
}
