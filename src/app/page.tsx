import { db } from "@/db";

export default async function Home() {
  const items = await db.query.testing.findMany();
  console.log(items);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {items.map((item) => (
        <div key={item.name}>{item.name}</div>
      ))}
    </main>
  );
}
