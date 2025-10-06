"use client";

import React, { useState, useEffect } from "react";
import { Users, Plus, Calendar, MoreVertical } from "lucide-react";

// Mock data - replace with actual API call
const mockTeams = [
  {
    id: "1",
    name: "Engineering Team",
    description: "Core product development and infrastructure",
    memberCount: 12,
    created_at: "2024-01-15T00:00:00Z",
    updated_at: "2024-03-10T00:00:00Z",
  },
  {
    id: "2",
    name: "Design Team",
    description: "UI/UX design and brand creative",
    memberCount: 6,
    created_at: "2024-02-01T00:00:00Z",
    updated_at: "2024-03-08T00:00:00Z",
  },
  {
    id: "3",
    name: "Marketing Team",
    description: "Growth, content, and community engagement",
    memberCount: 8,
    created_at: "2024-01-20T00:00:00Z",
    updated_at: "2024-03-12T00:00:00Z",
  },
  {
    id: "4",
    name: "Sales Team",
    description: "Customer acquisition and account management",
    memberCount: 15,
    created_at: "2024-02-10T00:00:00Z",
    updated_at: "2024-03-11T00:00:00Z",
  },
  {
    id: "5",
    name: "Support Team",
    description: "Customer success and technical support",
    memberCount: 9,
    created_at: "2024-01-25T00:00:00Z",
    updated_at: "2024-03-09T00:00:00Z",
  },

  {
    id: "6",
    name: "Support Team",
    description: "Customer success and technical support",
    memberCount: 9,
    created_at: "2024-01-25T00:00:00Z",
    updated_at: "2024-03-09T00:00:00Z",
  },

  {
    id: "7",
    name: "Support Team",
    description: "Customer success and technical support",
    memberCount: 9,
    created_at: "2024-01-25T00:00:00Z",
    updated_at: "2024-03-09T00:00:00Z",
  },
  {
    id: "8",
    name: "Sales Team",
    description: "Customer acquisition and account management",
    memberCount: 15,
    created_at: "2024-02-10T00:00:00Z",
    updated_at: "2024-03-11T00:00:00Z",
  },
  {
    id: "9",
    name: "Support Team",
    description: "Customer success and technical support",
    memberCount: 9,
    created_at: "2024-01-25T00:00:00Z",
    updated_at: "2024-03-09T00:00:00Z",
  },

  {
    id: "10",
    name: "Support Team",
    description: "Customer success and technical support",
    memberCount: 9,
    created_at: "2024-01-25T00:00:00Z",
    updated_at: "2024-03-09T00:00:00Z",
  },

  {
    id: "11",
    name: "Support Team",
    description: "Customer success and technical support",
    memberCount: 9,
    created_at: "2024-01-25T00:00:00Z",
    updated_at: "2024-03-09T00:00:00Z",
  },
  {
    id: "12",
    name: "Sales Team",
    description: "Customer acquisition and account management",
    memberCount: 15,
    created_at: "2024-02-10T00:00:00Z",
    updated_at: "2024-03-11T00:00:00Z",
  },
  {
    id: "13",
    name: "Support Team",
    description: "Customer success and technical support",
    memberCount: 9,
    created_at: "2024-01-25T00:00:00Z",
    updated_at: "2024-03-09T00:00:00Z",
  },

  {
    id: "14",
    name: "Support Team",
    description: "Customer success and technical support",
    memberCount: 9,
    created_at: "2024-01-25T00:00:00Z",
    updated_at: "2024-03-09T00:00:00Z",
  },

  {
    id: "15",
    name: "Support Team",
    description: "Customer success and technical support",
    memberCount: 9,
    created_at: "2024-01-25T00:00:00Z",
    updated_at: "2024-03-09T00:00:00Z",
  },
];

export default function TeamsCard() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setTeams(mockTeams);
      setLoading(false);
    }, 500);
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="grid grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border rounded-lg p-6 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {teams.map((team) => (
        <div
          key={team.id}
          className="p-6 border border-border bg-muted/50 rounded-lg"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 text-lg">
                  {team.name}
                </h3>
              </div>
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {team.description}
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Users className="w-4 h-4" />
              <span>{team.memberCount} members</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(team.updated_at)}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
