import Sidebar from "@/components/Sidebar";

export default function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#080b10",
        color: "white",
      }}
    >
      <Sidebar />

      <main style={{ 
        marginLeft: 240,
          padding: 32,
          minHeight: "100vh",
          position: "relative",
          zIndex: 1, 
          width: "100%" 
          }}>
        {children}
      </main>
    </div>
  );
}