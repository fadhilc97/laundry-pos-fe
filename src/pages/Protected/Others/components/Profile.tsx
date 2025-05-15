export default function Profile() {
  return (
    <section className="p-4 flex justify-between items-center bg-secondary">
      <article>
        <h1 className="text-xl">Demo Owner</h1>
        <p className="text-sm text-muted-foreground">demo.owner@example.com</p>
      </article>
      <div className="border-2 border-primary rounded-full">
        <img
          src="/img/default.png"
          alt="Profile Picture"
          width={40}
          className="rounded-full"
        />
      </div>
    </section>
  );
}
