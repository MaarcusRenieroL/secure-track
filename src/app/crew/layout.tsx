import CrewNavbar from "@/app/_components/crew/navbar";

export default function CrewLayout({ children }: {  children: React.ReactNode }) {
  return (
    <>
      <CrewNavbar />
      <div className="m-10">{children}</div>
    </>
  );
}
