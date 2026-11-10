import { cookies } from "next/headers";
import AdminLoginForm from "./AdminLoginForm";
import { logoutAction } from "./actions";
import { ADMIN_TOKEN } from "./config";
import { Button } from "@/app/components/Button";
import H1 from "@/app/components/H1";
import P from "@/app/components/P";
import PillCard from "@/app/components/PillCard";

export const dynamic = "force-dynamic";

interface AnalyticsRow {
  id: number;
  created_at: string;
  event_type: string;
  source: string;
  path: string;
  user_agent: string;
}

export default async function AdminPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;

  // Server-side verification
  if (!ADMIN_TOKEN || token !== ADMIN_TOKEN) {
    return <AdminLoginForm />;
  }

  // Authenticated: Fetch real analytics from Supabase
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_KEY;

  let rows: AnalyticsRow[] = [];
  if (url && key) {
    try {
      const res = await fetch(
        `${url}/rest/v1/analytics?select=id,created_at,event_type,source,path,user_agent&order=id.desc&limit=1000`,
        {
          headers: {
            apikey: key,
            Authorization: `Bearer ${key}`,
          },
          cache: "no-store",
        },
      );
      if (res.ok) {
        rows = await res.json();
      }
    } catch (e) {
      console.error("Failed to fetch analytics:", e);
    }
  }

  const views = rows.filter((r) => r.event_type === "view");
  const totalViews = views.length;
  const uniqueViews = new Set(views.map((r) => r.user_agent)).size;

  const appStoreClicks = rows.filter((r) => r.event_type === "click_app_store").length;
  const playStoreClicks = rows.filter((r) => r.event_type === "click_play_store").length;
  const bottomCtaClicks = rows.filter((r) => r.event_type === "click_bottom_cta").length;
  const totalStoreClicks = appStoreClicks + playStoreClicks + bottomCtaClicks;

  const conversionRate =
    uniqueViews > 0
      ? ((totalStoreClicks / uniqueViews) * 100).toFixed(2) + "%"
      : "0.00%";

  return (
    <main className="max-w-5xl mx-auto px-4 py-12 space-y-8 w-full">
      {/* Header with Logout */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-800 pb-6">
        <div>
          <H1 className="text-2xl sm:text-3xl font-extrabold">Conversion Telemetry</H1>
          <P colour="muted" size="sm">
            Authenticated Admin Dashboard • Live funnel statistics
          </P>
        </div>
        <form action={logoutAction}>
          <Button variant="secondary" className="h-9 px-4 text-xs font-semibold">
            Log Out
          </Button>
        </form>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <PillCard className="p-5 bg-[#212121] border border-zinc-800">
          <span className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">
            Conversion Rate
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#BDCEFF] mt-2">
            {conversionRate}
          </div>
          <p className="text-[11px] text-zinc-500 mt-1">Store Clicks / Unique Views</p>
        </PillCard>

        <PillCard className="p-5 bg-[#212121] border border-zinc-800">
          <span className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">
            Unique Views
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
            {uniqueViews}
          </div>
          <p className="text-[11px] text-zinc-500 mt-1">{totalViews} total views</p>
        </PillCard>

        <PillCard className="p-5 bg-[#212121] border border-zinc-800">
          <span className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">
            Store Clicks
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#FFF2C0] mt-2">
            {totalStoreClicks}
          </div>
          <p className="text-[11px] text-zinc-500 mt-1">iOS + Android + Bottom</p>
        </PillCard>

        <PillCard className="p-5 bg-[#212121] border border-zinc-800">
          <span className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">
            Store Breakdown
          </span>
          <div className="text-xs font-semibold text-zinc-300 mt-2 space-y-1">
            <div className="flex justify-between">
              <span className="text-zinc-400">App Store:</span>
              <span className="text-white font-bold">{appStoreClicks}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Google Play:</span>
              <span className="text-white font-bold">{playStoreClicks}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Bottom CTA:</span>
              <span className="text-white font-bold">{bottomCtaClicks}</span>
            </div>
          </div>
        </PillCard>
      </div>

      {/* Recent Activity Table */}
      <div className="space-y-3">
        <h2 className="text-lg font-bold text-white">Recent Activity Log</h2>
        <div className="overflow-x-auto rounded-2xl border border-zinc-800 bg-[#1a1a1a]">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#212121] text-zinc-400 border-b border-zinc-800">
              <tr>
                <th className="p-3">Time</th>
                <th className="p-3">Event</th>
                <th className="p-3">Source</th>
                <th className="p-3">Path</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 font-mono text-zinc-300">
              {rows.slice(0, 50).map((row) => (
                <tr key={row.id} className="hover:bg-zinc-800/30">
                  <td className="p-3 text-zinc-400 whitespace-nowrap">
                    {new Date(row.created_at).toLocaleString()}
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        row.event_type.startsWith("click_")
                          ? "bg-emerald-950/80 text-emerald-300 border border-emerald-800"
                          : "bg-zinc-800 text-zinc-300"
                      }`}
                    >
                      {row.event_type}
                    </span>
                  </td>
                  <td className="p-3 text-zinc-400">{row.source || "-"}</td>
                  <td className="p-3 text-zinc-400">{row.path || "/"}</td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-6 text-center text-zinc-500">
                    No analytics events found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
