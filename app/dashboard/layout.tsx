import Titlebar from "@/components/title-bar/Titlebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Titlebar />
      {children}
    </>
  );
}
