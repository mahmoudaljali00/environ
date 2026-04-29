'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  BarChart2, Wrench, FolderOpen, FileText, Users,
  TrendingUp, Eye, MessageSquare, ArrowRight, Activity, Package,
  UsersRound, Building2, MessageSquareQuote,
} from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'
import { formatDistanceToNow } from 'date-fns'

type DashboardData = {
  stats: {
    projectsCount: number
    servicesCount: number
    blogPostsCount: number
    contactsCount: number
    unreadContactsCount: number
    productsCount: number
    teamMembersCount: number
    clientsCount: number
    testimonialsCount: number
  }
  recentContacts: Array<{
    id: string
    name: string
    service: string | null
    status: string
    createdAt: Date
  }>
  projectActivity: Array<{
    month: string
    projects: number
  }>
  serviceDistribution: Array<{
    name: string
    value: number
  }>
}

const quickActions = [
  { label: 'Manage Services', href: '/admin/services', icon: Wrench },
  { label: 'Manage Products', href: '/admin/products', icon: Package },
  { label: 'Manage Projects', href: '/admin/projects', icon: FolderOpen },
  { label: 'Manage Blog', href: '/admin/blog', icon: FileText },
  { label: 'Manage Team', href: '/admin/team', icon: UsersRound },
  { label: 'Manage Clients', href: '/admin/clients', icon: Building2 },
]

export default function DashboardClient({ data }: { data: DashboardData }) {
  const { stats, recentContacts, projectActivity, serviceDistribution } = data

  const statsCards = [
    { 
      label: 'Total Projects', 
      value: stats.projectsCount.toString(), 
      change: 'Published projects', 
      icon: FolderOpen, 
      color: 'text-primary' 
    },
    { 
      label: 'Active Services', 
      value: stats.servicesCount.toString(), 
      change: 'All operational', 
      icon: Wrench, 
      color: 'text-accent' 
    },
    { 
      label: 'Blog Posts', 
      value: stats.blogPostsCount.toString(), 
      change: 'Published posts', 
      icon: FileText, 
      color: 'text-teal-400' 
    },
    { 
      label: 'Messages', 
      value: stats.contactsCount.toString(), 
      change: `${stats.unreadContactsCount} unread`, 
      icon: MessageSquare, 
      color: 'text-primary' 
    },
  ]

  const additionalStats = [
    { label: 'Products', value: stats.productsCount, icon: Package },
    { label: 'Team Members', value: stats.teamMembersCount, icon: UsersRound },
    { label: 'Clients', value: stats.clientsCount, icon: Building2 },
    { label: 'Testimonials', value: stats.testimonialsCount, icon: MessageSquareQuote },
  ]

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Welcome back, Admin</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Activity className="w-3.5 h-3.5 text-primary animate-pulse" />
          System online
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass-card rounded-2xl p-5"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <card.icon className={`w-5 h-5 ${card.color}`} />
              </div>
              <TrendingUp className="w-4 h-4 text-muted-foreground/40" />
            </div>
            <p className="text-2xl font-bold text-foreground">{card.value}</p>
            <p className="text-sm text-muted-foreground mt-0.5">{card.label}</p>
            <p className="text-xs text-primary mt-2">{card.change}</p>
          </motion.div>
        ))}
      </div>

      {/* Additional stats - smaller cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {additionalStats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.05 }}
            className="glass-card rounded-xl p-4 flex items-center gap-3"
          >
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <stat.icon className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-lg font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Project activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-2xl p-5 lg:col-span-2"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-foreground">Project Activity</h3>
            <span className="text-xs text-muted-foreground">Last 12 months</span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={projectActivity}>
              <defs>
                <linearGradient id="tealGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#009d8e" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#009d8e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#6b7280' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#6b7280' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: '#0d1f1e', border: '1px solid rgba(0,157,142,0.2)', borderRadius: '12px', fontSize: '12px' }}
                labelStyle={{ color: '#e5e7eb' }}
                itemStyle={{ color: '#009d8e' }}
              />
              <Area type="monotone" dataKey="projects" stroke="#009d8e" fill="url(#tealGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Service distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="glass-card rounded-2xl p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-foreground">Products by Service</h3>
            <span className="text-xs text-muted-foreground">Count</span>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={serviceDistribution} layout="vertical" margin={{ left: 70, right: 20 }}>
              <XAxis type="number" tick={{ fontSize: 10, fill: '#6b7280' }} axisLine={false} tickLine={false} />
              <YAxis 
                type="category" 
                dataKey="name" 
                tick={{ 
                  fontSize: 10, 
                  fill: '#6b7280', 
                  textAnchor: 'end',
                  style: { lineHeight: '2.8em', letterSpacing: '0.055em' }
                }} 
                axisLine={false} 
                tickLine={false} 
                width={70}
              />
              <Tooltip
                contentStyle={{ background: '#0d1f1e', border: '1px solid rgba(0,157,142,0.2)', borderRadius: '12px', fontSize: '12px' }}
                itemStyle={{ color: '#ebb720' }}
              />
              <Bar dataKey="value" fill="#009d8e" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Recent messages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card rounded-2xl p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-primary" /> Recent Messages
            </h3>
            <Link href="/admin/contacts" className="text-xs text-primary hover:underline">
              View all
            </Link>
          </div>
          <ul className="flex flex-col divide-y divide-border/40">
            {recentContacts.length > 0 ? (
              recentContacts.map((contact) => (
                <li key={contact.id} className="flex items-center justify-between py-3 gap-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${contact.status === 'new' ? 'bg-primary' : 'bg-muted-foreground/30'}`} />
                    <div>
                      <p className={`text-sm font-medium ${contact.status === 'new' ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {contact.name}
                      </p>
                      <p className="text-xs text-muted-foreground">{contact.service || 'General inquiry'}</p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground flex-shrink-0">
                    {formatDistanceToNow(new Date(contact.createdAt), { addSuffix: true })}
                  </span>
                </li>
              ))
            ) : (
              <li className="py-8 text-center text-sm text-muted-foreground">No messages yet</li>
            )}
          </ul>
        </motion.div>

        {/* Quick actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="glass-card rounded-2xl p-5"
        >
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <Eye className="w-4 h-4 text-primary" /> Quick Actions
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className="glass rounded-xl p-4 flex flex-col items-start gap-3 hover:border-primary/40 transition-all hover:bg-primary/5 group"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center group-hover:bg-primary/25 transition-colors">
                  <action.icon className="w-4 h-4 text-primary" />
                </div>
                <div className="flex items-center justify-between w-full">
                  <span className="text-xs font-medium text-foreground">{action.label}</span>
                  <ArrowRight className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
