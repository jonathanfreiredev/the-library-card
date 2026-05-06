export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="flex flex-1 flex-col p-6">{children}</main>;
}
