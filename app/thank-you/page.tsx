export default function ThankYou() {
  return (
    <main className="mx-auto max-w-xl w-full p-5 py-12 space-y-5">
      <div>
        <h1 className="text-2xl font-bold">Thank You!</h1>
        <p>We will keep you updated!</p>
      </div>
      <button className="w-full rounded-full inline-flex h-10 items-center justify-center bg-linear-to-r from-[#BDCEFF] via-white to-[#FFF2C0] px-4 py-2 text-sm text-black font-bold transition-colors hover:bg-zinc-900/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer">
        Share with friends!
      </button>
    </main>
  );
}
