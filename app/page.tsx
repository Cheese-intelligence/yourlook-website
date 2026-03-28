import { redirect } from "next/navigation";

export default function Home() {
  async function subscribe(formData: FormData) {
    "use server";

    const email = formData.get("email");

    console.log(email);

    redirect("thank-you");
  }

  return (
    <main className="mx-auto max-w-xl w-full p-5 py-12 space-y-5">
      <div>
        <h1 className="text-2xl font-bold">YourLook</h1>
        <p>Sign up to our mailing list!</p>
      </div>
      <form action={subscribe} className="space-y-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-zinc-300">
            Your Email
          </label>
          <input
            name="email"
            className="flex h-12 w-full rounded-xl border-2 border-zinc-800 bg-transparent px-4 py-2 placeholder:text-zinc-600 focus:border-zinc-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="example@gmail.com"
            type="email"
          />
        </div>
        <button className="w-full rounded-full inline-flex h-10 items-center justify-center bg-linear-to-r from-[#BDCEFF] via-white to-[#FFF2C0] px-4 py-2 text-sm text-black font-bold transition-colors hover:bg-zinc-900/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer">
          Sign up
        </button>
      </form>
    </main>
  );
}
