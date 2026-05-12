
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SignOutButton } from "@clerk/nextjs";
import {
  LogOut,
  BarChart3,
  LayoutDashboard,
  Users,
  Briefcase,
  Upload,
  Brain,
  GitBranch,
  FileText,
  Sparkles,
} from "lucide-react";

const navItems = [
  {
    href: "/dashboard",
    icon: <LayoutDashboard size={16} />,
    label: "Dashboard",
  },
  {
    href: "/jobs",
    icon: <Briefcase size={16} />,
    label: "Jobs",
  },
  {
    href: "/candidates",
    icon: <Users size={16} />,
    label: "Candidates",
  },
  {
    href: "/applications",
    icon: <GitBranch size={16} />,
    label: "Pipeline",
  },
  {
    href: "/resume",
    icon: <Upload size={16} />,
    label: "Upload Resume",
  },
  {
    href: "/resume/list",
    icon: <FileText size={16} />,
    label: "Resume List",
  },
  {
    href: "/ai",
    icon: <Brain size={16} />,
    label: "AI Analyzer",
  },
  {
    href: "/analytics",
    icon: <BarChart3 size={16} />,
    label: "Analytics",
  },
  {
    href: "/match",
    icon: <Sparkles size={16} />,
    label: "AI Match",
  },
];

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div style={{
      width: '220px',
      height: '100vh',
      borderRight: '1px solid #2A2F3E',
      padding: '16px 12px',
      position: 'fixed',
      left: 0,
      top: 0,
      background: '#12151C',
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
      zIndex: 50,
    }}>

      {/* Logo */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 10px',
        marginBottom: '20px',
      }}>
        <div style={{
          width: '8px',
          height: '8px',
          background: '#6C63FF',
          borderRadius: '50%',
          boxShadow: '0 0 8px #6C63FF',
          flexShrink: 0,
        }} />
        <span style={{
          fontSize: '18px',
          fontWeight: '700',
          color: '#E8EAF0',
          letterSpacing: '-0.5px',
        }}>
          TalentHawk
        </span>
        <span style={{
          fontSize: '10px',
          background: 'rgba(108,99,255,0.15)',
          color: '#8B84FF',
          padding: '2px 7px',
          borderRadius: '20px',
          border: '1px solid rgba(108,99,255,0.25)',
          fontWeight: '600',
        }}>
          AI
        </span>
      </div>

      {/* Nav label */}
      <div style={{
        fontSize: '10px',
        fontWeight: '600',
        color: '#555D78',
        letterSpacing: '1px',
        textTransform: 'uppercase',
        padding: '4px 10px',
        marginBottom: '4px',
      }}>
        Recruitment
      </div>

      {/* Nav items */}
      {navItems.map((item) => {
        const isActive = pathname === item.href ||
          (item.href !== '/dashboard' && pathname.startsWith(item.href))

        return (
          <Link
            key={item.href}
            href={item.href}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '9px 10px',
              borderRadius: '10px',
              color: isActive ? '#8B84FF' : '#8B91A8',
              background: isActive ? 'rgba(108,99,255,0.12)' : 'transparent',
              border: isActive
                ? '1px solid rgba(108,99,255,0.2)'
                : '1px solid transparent',
              textDecoration: 'none',
              fontSize: '13px',
              fontWeight: isActive ? '500' : '400',
              transition: 'all 0.15s',
            }}
          >
            <span style={{
              fontSize: '15px',
              width: '18px',
              textAlign: 'center',
              flexShrink: 0,
            }}>
              {item.icon}
            </span>
            {item.label}
          </Link>
        )
      })}
   <a
      href="/analytics"
      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-slate-800"
      >
      Analytics
      </a>

      {/* Bottom section */}
      <div style={{
        marginTop: 'auto',
        padding: '12px 10px',
        borderTop: '1px solid #2A2F3E',
      }}>
        <div style={{
          fontSize: '11px',
          color: '#555D78',
          textAlign: 'center',
        }}>
          TalentHawk v1.0 · AI-Powered ATS
        </div>
      </div>

        <div className="mt-auto border-t border-slate-800 pt-4">
            <a
            href="/settings"
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-slate-800"
            >
            Settings
            </a>

            <a
            href="/support"
            className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-slate-800"
            >
             Helpdesk
            </a>
        <SignOutButton redirectUrl="/sign-in">
        <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition">
        <LogOut size={18} />
        Logout
        </button>
        </SignOutButton>
        </div>

    </div>
  )
}