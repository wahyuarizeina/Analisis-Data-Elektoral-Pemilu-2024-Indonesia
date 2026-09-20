type Warna = "merah" | "emas" | "hijau" | "biru";

const border: Record<Warna, string> = {
  merah: "border-l-merah",
  emas: "border-l-emas",
  hijau: "border-l-hijau",
  biru: "border-l-biru",
};
const tag: Record<Warna, string> = {
  merah: "text-merah",
  emas: "text-emas",
  hijau: "text-hijau",
  biru: "text-biru",
};

export function InsightCard({
  tag: label,
  title,
  body,
  warna = "merah",
}: {
  tag: string;
  title: string;
  body: string;
  warna?: Warna;
}) {
  return (
    <div className={`card border-l-4 ${border[warna]} p-4`}>
      <div className={`text-[10px] font-bold uppercase tracking-widest ${tag[warna]}`}>
        {label}
      </div>
      <h3 className="mt-1 mb-1.5 text-base font-semibold text-navy dark:text-slate-100">
        {title}
      </h3>
      <p className="text-sm lead">{body}</p>
    </div>
  );
}
