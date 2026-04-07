"use client";

import React, { useState } from "react";
import { User, CreditCard, Bell, AlertTriangle, Upload, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { signOut } from "@/lib/auth-client";

interface SettingsClientProps {
  user: {
    id: string;
    name: string;
    email: string;
    image?: string | null;
    plan: string;
    validationsUsed: number;
  };
}

export default function SettingsClient({ user }: SettingsClientProps) {
  const [activeTab, setActiveTab] = useState("profile");
  const [notifications, setNotifications] = useState({
    validationReports: true,
    productUpdates: true,
    marketingEmails: false,
  });

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "billing", label: "Billing", icon: CreditCard },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "danger", label: "Danger Zone", icon: AlertTriangle },
  ];

  const validationLimit = user.plan === 'pro' ? Infinity : 5;
  const usagePercentage = user.plan === 'pro' ? 0 : (user.validationsUsed / validationLimit) * 100;

  return (
    <div className="flex-1 overflow-y-auto bg-white text-black">
      {/* Header */}
      <div className="border-b border-neutral-100 px-6 py-8 md:px-8 md:py-10">
        <h1 className="text-[18px] font-semibold text-black mb-2">Settings</h1>
        <p className="text-neutral-500 text-[14px]">
          Manage your account, billing, and system preferences.
        </p>
      </div>

      <div className="flex flex-col md:flex-row min-h-[calc(100vh-160px)]">
        {/* Sidebar */}
        <div className="w-full md:w-64 border-r border-neutral-100 p-6 space-y-2">
          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                   key={tab.id}
                   onClick={() => setActiveTab(tab.id)}
                   className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                     activeTab === tab.id
                       ? "bg-neutral-100 text-black"
                       : "text-neutral-500 hover:text-black hover:bg-neutral-50"
                   }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
          
          <div className="pt-4 mt-4 border-t border-neutral-100 md:hidden">
             <Button 
               variant="ghost" 
               className="w-full justify-start text-neutral-500 hover:text-rose-500 hover:bg-rose-50"
               onClick={() => signOut()}
             >
                <LogOut className="w-4 h-4 mr-3" />
                Sign Out
             </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 md:p-8 max-w-4xl">
          {activeTab === "profile" && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="mb-8">
                <h2 className="text-[18px] font-semibold text-black mb-2">Profile</h2>
                <p className="text-neutral-500 text-[14px]">
                  Update your personal information and avatar.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 md:p-8 border border-neutral-100 shadow-sm">
                {/* Avatar Section */}
                <div className="flex flex-col sm:flex-row items-center gap-6 mb-8 pb-8 border-b border-neutral-100 text-center sm:text-left">
                  <Avatar className="w-20 h-20 border border-neutral-100 shrink-0">
                    {user.image ? <AvatarImage src={user.image} /> : null}
                    <AvatarFallback className="bg-neutral-100 text-neutral-400 text-xl font-bold">
                       {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                    <Button
                       variant="outline"
                       size="sm"
                       className="bg-white border-neutral-200 text-black hover:bg-neutral-50 rounded-[6px] w-full sm:w-auto"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Change Avatar
                    </Button>
                    <Button
                       variant="ghost"
                       size="sm"
                       className="text-neutral-400 hover:text-black hover:bg-neutral-50 rounded-[6px] w-full sm:w-auto"
                    >
                      Remove
                    </Button>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="text-neutral-400 mb-2 block font-bold uppercase text-[10px]">
                      Full Name
                    </Label>
                    <Input
                       id="name"
                       defaultValue={user.name}
                       className="bg-white border-neutral-200 text-black rounded-[6px] h-11 focus-visible:ring-black/5"
                    />
                  </div>
 
                  <div>
                    <Label htmlFor="email" className="text-neutral-400 mb-2 block font-bold uppercase text-[10px]">
                      Email Address
                    </Label>
                    <Input
                       id="email"
                       type="email"
                       defaultValue={user.email}
                       className="bg-white border-neutral-200 text-black rounded-[6px] h-11 focus-visible:ring-black/5"
                    />
                  </div>
 
                  <div className="flex justify-end pt-4">
                    <Button className="bg-black hover:bg-neutral-800 text-white px-8 rounded-[6px] font-bold uppercase text-xs h-11 w-full sm:w-auto">
                      Save Changes
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "billing" && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="mb-8">
                <h2 className="text-[18px] font-semibold text-black mb-2">Billing & Usage</h2>
                <p className="text-neutral-500 text-[14px]">
                  Manage your subscription plan and view usage limits.
                </p>
              </div>

              <div className="space-y-6">
                {/* Current Plan */}
                <div className="bg-white rounded-xl p-6 border border-neutral-100 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <h3 className="text-[16px] font-medium uppercase text-black/90">{user.plan} Plan</h3>
                      <Badge className="bg-black text-white hover:bg-black rounded-full px-3">
                        Active
                      </Badge>
                    </div>
                    <Button
                       variant="outline"
                       size="sm"
                       className="bg-white border-neutral-200 text-black hover:bg-neutral-50 rounded-[6px] w-full sm:w-auto"
                    >
                      Manage Plan
                    </Button>
                  </div>
                  <p className="text-neutral-500 text-[14px]">
                    {user.plan === 'pro' ? 'Unlimited validations per month.' : 'Up to 5 validations per month.'}
                  </p>
                </div>

                {/* Usage */}
                <div className="bg-white rounded-xl p-6 border border-neutral-100 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[10px] font-bold uppercase text-neutral-400">Monthly Validations Used</h3>
                    <span className="text-black font-bold text-sm">
                       {user.validationsUsed} / {user.plan === 'pro' ? '∞' : validationLimit}
                    </span>
                  </div>
                  <Progress value={user.plan === 'pro' ? 100 : usagePercentage} className="h-2 mb-3 bg-neutral-100" />
                  <p className="text-neutral-500 text-[12px] leading-relaxed">
                    {user.plan === 'pro' 
                      ? 'You have unlimited usage on the Pro plan.' 
                      : `You have ${validationLimit - user.validationsUsed} validations left this month.`}
                  </p>
                </div>

                {/* Upgrade Card (Only show if not Pro) */}
                {user.plan !== 'pro' && (
                  <div className="bg-neutral-50 rounded-xl p-6 border border-neutral-100 overflow-hidden relative group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity hidden sm:block text-black">
                       <CreditCard className="w-24 h-24" />
                    </div>
                    <div className="flex flex-col sm:flex-row items-start justify-between gap-8 relative z-10">
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-2xl">🚀</span>
                          <h3 className="text-[18px] font-semibold text-black">Upgrade to Lifetime</h3>
                        </div>
                        <p className="text-neutral-500 text-[14px] mb-4 max-w-md leading-relaxed">
                          Get unlimited AI validations forever with a single payment. No monthly fees, no limits.
                        </p>
                        <p className="text-black text-[18px] font-bold">$49</p>
                      </div>
                      <Button className="bg-black hover:bg-neutral-800 text-white px-6 rounded-[6px] font-bold shadow-lg shadow-black/5 w-full sm:w-auto">
                        Upgrade Now
                      </Button>
                    </div>
                  </div>
                )}

                {/* Cancel Link */}
                <div className="pt-4">
                   <button className="text-zinc-600 hover:text-zinc-400 text-xs underline underline-offset-4 transition-colors">
                     Cancel Subscription
                   </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="mb-8">
                <h2 className="text-[18px] font-semibold text-black mb-2">Notifications</h2>
                <p className="text-neutral-500 text-[14px]">
                  Choose what updates you want to receive.
                </p>
              </div>

              <div className="bg-[#0D0D0D] rounded-xl p-8 border border-zinc-800 shadow-sm">
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-6 border-b border-zinc-800">
                    <div>
                      <h3 className="font-bold text-white mb-1 ">Validation Reports</h3>
                      <p className="text-zinc-500 text-sm">
                        Receive an email when your AI report is ready.
                      </p>
                    </div>
                    <Switch
                      checked={notifications.validationReports}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, validationReports: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between pb-6 border-b border-zinc-800">
                    <div>
                      <h3 className="font-bold text-white mb-1 ">Product Updates</h3>
                      <p className="text-zinc-500 text-sm">
                        News about the latest features and improvements.
                      </p>
                    </div>
                    <Switch
                      checked={notifications.productUpdates}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, productUpdates: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-white mb-1 ">Marketing Emails</h3>
                      <p className="text-zinc-500 text-sm">
                        Tips, tricks, and promotional offers.
                      </p>
                    </div>
                    <Switch
                      checked={notifications.marketingEmails}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, marketingEmails: checked })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "danger" && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="mb-8">
                <h2 className="text-[18px] font-semibold text-rose-500 mb-2">Danger Zone</h2>
                <p className="text-neutral-500 text-[14px]">
                  Irreversible and destructive actions.
                </p>
              </div>

              <div className="bg-rose-50 rounded-xl p-8 border border-rose-100 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="text-center md:text-left">
                    <h3 className="font-semibold text-black mb-1">Delete Account</h3>
                    <p className="text-rose-500/60 text-[14px] max-w-sm mx-auto md:mx-0">
                      Permanently delete your account, your subscription, and all past validations. This cannot be undone.
                    </p>
                  </div>
                  <Button
                    variant="destructive"
                    className="bg-rose-600 hover:bg-rose-700 text-white rounded-[6px] px-6 font-bold uppercase text-xs h-11 w-full md:w-auto shadow-lg shadow-rose-500/10"
                  >
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Delete Account
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
