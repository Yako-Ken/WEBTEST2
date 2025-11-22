"use client";

import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../app/components/ui/avatar";
import { Button } from "../app/components/ui/button";
import Link from "next/link";
import useLogout from "../app/hooks/useLogout";

interface UserType {
  name?: string;
  email?: string;
  image?: { secure_url?: string; publicId?: string };
}

const User = ({ user }: { user?: UserType | null }) => {
  const logout = useLogout();
  const [open, setOpen] = useState(false);

  if (!user) {
    return (
      <Avatar className="cursor-pointer !w-12 !h-12 relative rounded-full">
        <AvatarFallback>
          <Link href="/login">Login</Link>
        </AvatarFallback>
      </Avatar>
    );
  }

  return (
    <div className="relative">
      {/* الضغط على الأفاتار يفتح/يغلق الـ content */}
      <button
        onClick={() => setOpen((p) => !p)}
        className="focus:outline-none"
      >
        <Avatar className="cursor-pointer ring-1 !w-10 !h-10 rounded-full">
          <AvatarImage
            className="scale-125"
            src={user.image?.secure_url || "/avatarDefault.jpg"}
            alt={user.name || "User"}
          />
          <AvatarFallback>{user.name?.[0] || "U"}</AvatarFallback>
        </Avatar>
      </button>

      {/* نفس محتوى HoverCard يظهر أسفل الأفاتار */}
      {open && (
        <div className="absolute top-14 right-0 w-[250px] bg-white border rounded-lg shadow-2xl z-50 p-4 space-y-4">
          <h4 className="text-sm font-semibold">{user.name || "User"}</h4>
          <p className="text-sm text-gray-600">{user.email || "No Email"}</p>
          <Link href="/dashboard">
            <Button className="w-full">Dashboard</Button>
          </Link>
          <Button onClick={logout} variant="outline" className="w-full">
            Log out
          </Button>
        </div>
      )}
    </div>
  );
};

export default User;