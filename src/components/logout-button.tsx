'use client';

import { Button } from "@/components/ui/button";

export function LogoutButton() {
  const handleLogout = async () => {
    try {
      if(!process.env.NEXT_PUBLIC_API_URL) {
        throw new Error('NEXT_PUBLIC_API_URL is not defined');
      }
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`,
        {
          method: "POST",
          credentials: 'include', // 确保发送 cookies
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      window.location.href = "/";
    } catch (error) {
      console.error('Logout failed:', error);
      // 即使出错也重定向到首页
      window.location.href = "/";
    }
  };

  return (
    <Button
      variant="ghost"
      onClick={handleLogout}
    >
      Logout
    </Button>
  );
}