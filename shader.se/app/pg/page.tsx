async function PgPage() {
  const posts = ["hello world", "hello shader"];

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <h3 className="text-2xl font-bold mb-4">Pg page</h3>
      <ul className="space-y-2">
        {posts.map((post, index) => (
          <li key={index}>{post}</li>
        ))}
      </ul>
    </main>
  );
}

export default PgPage;