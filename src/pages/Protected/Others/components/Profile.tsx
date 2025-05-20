import { useGetMyProfile } from "@/hooks";

export default function Profile() {
  const getMyProfile = useGetMyProfile();
  const profile = getMyProfile.data?.data.data;

  return (
    <section className="p-4 flex justify-between items-center bg-secondary">
      <article>
        <h1 className="text-xl">{profile?.name}</h1>
        <p className="text-sm text-muted-foreground">{profile?.email}</p>
      </article>
      <div className="border-2 border-primary rounded-full">
        <img
          src={profile?.imageUrl || "/img/default.png"}
          alt="Profile Picture"
          width={40}
          className="rounded-full"
        />
      </div>
    </section>
  );
}
