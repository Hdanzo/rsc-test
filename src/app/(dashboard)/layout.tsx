export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center items-center p-24">
      <div className="flex flex-col max-w-5xl w-full">{children}</div>
    </div>
  );
}
