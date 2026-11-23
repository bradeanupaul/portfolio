export default function Loading() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center band-off" role="status">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-pulse rounded-full border-2 border-copper border-t-transparent" />
        <p className="font-mono-label text-slate">Se încarcă</p>
      </div>
    </div>
  );
}
