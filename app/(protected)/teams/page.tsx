import TeamsCard from "@/app/(protected)/teams/components/teams-card";
import CreateTeamForm from "@/app/(protected)/teams/components/create-team-form";

export default function Teams() {
  return (
    <div className="w-full">
      {/* Two-column responsive layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left side (3/4 width on large screens) */}
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight">Teams</h1>
              <p className="text-muted-foreground">
                Stay connected, manage responsibilities, and keep everyone
                aligned.
              </p>
            </div>
            <CreateTeamForm />
          </div>
          <TeamsCard />
        </div>

        {/* Right side (1/4 width on large screens) */}
        <div className="lg:col-span-1">
          <div className="p-4 rounded-xl border border-border bg-muted/50">
            <h2 className="font-semibold mb-2">Overview</h2>
            <p className="text-sm text-muted-foreground">
              You can place analytics, quick stats, or filters here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
