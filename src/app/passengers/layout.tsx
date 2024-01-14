import PassengerNavbar from "@/app/_components/passenger/navbar";

export default function PassengerLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PassengerNavbar />
      <div className="m-10">{children}</div>
    </>
  );
}
