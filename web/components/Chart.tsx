export function Chart({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="card p-3 text-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="w-full h-auto rounded-lg" />
    </div>
  );
}

export function ChartGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid md:grid-cols-2 gap-4">{children}</div>;
}
