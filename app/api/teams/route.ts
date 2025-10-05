import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/utils/supabase/server";
import { ROLE_DEV, ROLE_DIRECTOR, ROLE_MANAGER } from "@/lib/constant";

/**
 * @endpoint GET /api/teams
 * @description Get all teams information
 */
export async function GET() {}

/**
 * @endpoint POST /api/teams
 * @description Create new team record
 * @param req Team data information
 */
export async function POST(req: NextRequest) {
  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        {
          status: 401,
        }
      );
    }

    const data = await req.json();
    const { name, description } = data;

    if (!name) {
      return NextResponse.json(
        { error: "Team name is required" },
        { status: 400 }
      );
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (profileError) {
      console.error("Error fetching profile", profileError);
      return NextResponse.json(
        { error: "Unable to fetch user profile" },
        {
          status: 500,
        }
      );
    }

    if (
      profile.role !== ROLE_DEV &&
      profile.role !== ROLE_MANAGER &&
      profile.role !== ROLE_DIRECTOR
    ) {
      return NextResponse.json(
        { error: "Only users with right role can create teams" },
        {
          status: 403,
        }
      );
    }

    if (!profile.org_id) {
      return NextResponse.json(
        { error: "User must be associated with an organization" },
        {
          status: 403,
        }
      );
    }

    const { data: teamExists, error: teamExistsError } = await supabase
      .from("teams")
      .select("id")
      .eq("name", name)
      .eq("org_id", profile.org_id)
      .maybeSingle();

    if (teamExistsError) {
      return NextResponse.json(
        { error: "Something went wrong" },
        { status: 500 }
      );
    }

    if (teamExists) {
      return NextResponse.json(
        { error: "Team name already exists" },
        { status: 409 }
      );
    }

    const { data: newTeam, error: newTeamError } = await supabase
      .from("teams")
      .insert({
        org_id: profile.org_id,
        created_by: profile.id,
        name,
        description,
      })
      .select()
      .single();

    if (newTeamError) {
      return NextResponse.json(
        { error: "Error saving the team information" },
        { status: 500 }
      );
    }

    return NextResponse.json(newTeam, { status: 201 });
  } catch (error) {
    console.error("Error creating team:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
