import { signOut } from "@/utils/auth/action";
import { Button } from "@/components/ui/button";
import { createSupabaseServerClient } from "@/utils/supabase/server";
import { User, Mail, LogOut } from "lucide-react";

export default async function Dashboard() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <div>No user found</div>;
  }

  return (
    <div className=" bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <Button
              onClick={signOut}
              variant="outline"
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>

          <div className="border-t pt-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              User Information
            </h2>

            <div className="flex items-center space-x-4 mb-4">
              {/* Avatar */}
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                {user.user_metadata?.avatar_url ? (
                  <img
                    src={user.user_metadata.avatar_url}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-primary text-white flex items-center justify-center text-xl font-semibold">
                    {user.user_metadata?.full_name?.charAt(0) ||
                      user.email?.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>

              {/* User Details */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <span className="font-medium text-gray-900">
                    {user.user_metadata?.full_name || "No name provided"}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600">{user.email}</span>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">User ID:</span>
                <p className="text-gray-600 break-all">{user.id}</p>
              </div>

              <div>
                <span className="font-medium text-gray-700">Provider:</span>
                <p className="text-gray-600">
                  {user.app_metadata?.provider || "Unknown"}
                </p>
              </div>

              <div>
                <span className="font-medium text-gray-700">
                  Email Verified:
                </span>
                <p className="text-gray-600">
                  {user.email_confirmed_at ? "Yes" : "No"}
                </p>
              </div>

              <div>
                <span className="font-medium text-gray-700">Last Sign In:</span>
                <p className="text-gray-600">
                  {user.last_sign_in_at
                    ? new Date(user.last_sign_in_at).toLocaleDateString()
                    : "Unknown"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
