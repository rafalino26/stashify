"use client";

import { useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import api from "@/app/services/api";
import EditModal from "../EditModal";

type ProfileData = {
  fullname: string;
  username: string;
  email: string;
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [editingField, setEditingField] = useState<keyof ProfileData | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/profile", { withCredentials: true });
        setProfile(res.data);
      } catch (err) {
        console.error("Gagal ambil data profile", err);
      }
    };

    fetchProfile();
  }, []);

  const handleUpdateField = async (field: keyof ProfileData, value: string) => {
    try {
      await api.patch("/profile/", { [field]: value }, { withCredentials: true });
      setProfile((prev) => (prev ? { ...prev, [field]: value } : prev));
      setEditingField(null);
    } catch (err) {
      console.error("Gagal update field", err);
    }
  };

  return (
    <div className="bg-gradient-to-br flex items-center justify-center mt-16">
      <div className="w-full max-w-2xl bg-white p-8 rounded-3xl shadow-xl border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Your Profile
        </h1>

        {profile && (
          <div className="space-y-6">
            {/* Fullname */}
            <FieldDisplay
              label="Full Name"
              value={profile.fullname}
              onEdit={() => setEditingField("fullname")}
            />

            {/* Username */}
            <FieldDisplay
              label="Username / Company Name"
              value={profile.username}
              onEdit={() => setEditingField("username")}
            />

            {/* Email */}
            <FieldDisplay
              label="Email"
              value={profile.email}
              onEdit={() => setEditingField("email")}
            />
          </div>
        )}

        {editingField && (
          <EditModal
            field={editingField}
            currentValue={profile?.[editingField] || ""}
            onClose={() => setEditingField(null)}
            onSave={(value) => handleUpdateField(editingField, value)}
          />
        )}
      </div>
    </div>
  );
}

function FieldDisplay({
  label,
  value,
  onEdit,
}: {
  label: string;
  value: string;
  onEdit: () => void;
}) {
  return (
    <div className="flex items-center justify-between border-b pb-3">
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-base font-medium text-gray-800">{value}</p>
      </div>
      <button onClick={onEdit} className="text-gray-500 hover:text-blue-500">
        <Pencil className="w-5 h-5" />
      </button>
    </div>
  );
}
