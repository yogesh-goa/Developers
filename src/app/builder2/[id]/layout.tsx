import { ReactFlowProvider } from "@xyflow/react";

export default function BuilderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactFlowProvider>
          {children}
    </ReactFlowProvider>    
  );
}
