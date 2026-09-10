export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Render children directly — no site navigation, footer, or analytics wrappers.
  // The root layout provides <html> and <body> tags.
  return children;
}
