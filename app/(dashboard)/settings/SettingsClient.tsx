"use client";

import React, { useState, useRef, useEffect } from "react";
import { User, CreditCard, Bell, AlertTriangle, Upload, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { signOut } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from 'next/navigation';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("profile");
  const [notifications, setNotifications] = useState({
    validationReports: true,
    productUpdates: true,
    marketingEmails: false,
  });
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  
  const [avatarUrl, setAvatarUrl] = useState(user.image);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem('mock_avatar_url');
    if (stored) setAvatarUrl(stored);
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image must be less than 5MB");
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setAvatarUrl(base64String);
        localStorage.setItem('mock_avatar_url', base64String);
        window.dispatchEvent(new Event('avatar-updated'));
        toast.success("Avatar updated! Make sure to save your changes.");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveAvatar = () => {
    setAvatarUrl(null);
    localStorage.removeItem('mock_avatar_url');
    window.dispatchEvent(new Event('avatar-updated'));
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    toast.loading("Permanently deleting account...", { id: "delete-account" });
    
    // Simulate API delay for deletion
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast.dismiss("delete-account");
    toast.success("Account successfully deleted.");
    router.push('/');
  };

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
                   className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-black focus-visible:outline-none ${
                     activeTab === tab.id
                       ? "bg-neutral-100 text-black shadow-sm"
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
               className="w-full justify-start text-neutral-500 hover:text-rose-500 hover:bg-rose-50 focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:outline-none"
               onClick={async () => {
                 toast.loading("Logging out...", { id: "logout" });
                 await signOut({
                   fetchOptions: {
                     onSuccess: () => {
                       toast.success("Logged out successfully", { id: "logout" });
                       router.push('/');
                     },
                     onError: (ctx) => {
                       toast.error(ctx.error.message || "Failed to log out", { id: "logout" });
                     }
                   }
                 });
               }}
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
                    {avatarUrl ? <AvatarImage src={avatarUrl} className="object-cover" /> : null}
                    <AvatarFallback className="bg-neutral-100 text-neutral-400 text-xl font-bold">
                       {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      ref={fileInputRef} 
                      onChange={handleImageUpload} 
                    />
                    <Button
                       onClick={() => fileInputRef.current?.click()}
                       variant="outline"
                       size="sm"
                       className="bg-white border-neutral-200 text-black hover:bg-neutral-50 rounded-md w-full sm:w-auto"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Change Avatar
                    </Button>
                    <Button
                       onClick={handleRemoveAvatar}
                       variant="ghost"
                       size="sm"
                       className="text-neutral-400 hover:text-rose-500 hover:bg-rose-50 rounded-md w-full sm:w-auto transition-colors"
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
                       autoComplete="name"
                       className="bg-white border-neutral-200 text-black rounded-md h-11 transition-all focus-visible:ring-2 focus-visible:ring-black focus-visible:border-black"
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
                       autoComplete="email"
                       spellCheck={false}
                       className="bg-white border-neutral-200 text-black rounded-md h-11 transition-all focus-visible:ring-2 focus-visible:ring-black focus-visible:border-black"
                    />
                  </div>
 
                  <div className="flex justify-end pt-4">
                    <Button onClick={() => toast.success("Profile saved successfully!")} className="bg-black hover:bg-neutral-800 text-white px-8 rounded-md font-bold uppercase text-xs h-11 w-full sm:w-auto transition-colors">
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
                       className="bg-white border-neutral-200 text-black hover:bg-neutral-50 rounded-md w-full sm:w-auto"
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
                      <Button className="bg-black hover:bg-neutral-800 text-white px-6 rounded-md font-bold shadow-lg shadow-black/5 w-full sm:w-auto">
                        Upgrade Now
                      </Button>
                    </div>
                  </div>
                )}

                {/* Cancel Link */}
                <div className="pt-4">
                   <button className="text-zinc-600 hover:text-zinc-400 text-[13px] font-medium transition-colors focus-visible:ring-2 focus-visible:ring-black focus-visible:outline-none rounded-md px-2 py-1 -ml-2">
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

              <div className="bg-neutral-50 rounded-xl p-8 border border-neutral-100 shadow-sm">
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-6 border-b border-neutral-100">
                    <div>
                      <Label htmlFor="noti-validation" className="font-bold text-black mb-1 block cursor-pointer">Validation Reports</Label>
                      <p className="text-neutral-500 text-sm">
                        Receive an email when your AI report is ready.
                      </p>
                    </div>
                    <Switch
                      id="noti-validation"
                      checked={notifications.validationReports}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, validationReports: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between pb-6 border-b border-neutral-100">
                    <div>
                      <Label htmlFor="noti-product" className="font-bold text-black mb-1 block cursor-pointer">Product Updates</Label>
                      <p className="text-neutral-500 text-sm">
                        News about the latest features and improvements.
                      </p>
                    </div>
                    <Switch
                      id="noti-product"
                      checked={notifications.productUpdates}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, productUpdates: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="noti-marketing" className="font-bold text-black mb-1 block cursor-pointer">Marketing Emails</Label>
                      <p className="text-neutral-500 text-sm">
                        Tips, tricks, and promotional offers.
                      </p>
                    </div>
                    <Switch
                      id="noti-marketing"
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
                  
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="destructive"
                        className="bg-rose-600 hover:bg-rose-700 text-white rounded-md px-6 font-bold uppercase text-xs h-11 w-full md:w-auto shadow-lg shadow-rose-500/10 focus-visible:ring-2 focus-visible:ring-rose-500"
                      >
                        <AlertTriangle className="w-4 h-4 mr-2" />
                        Delete Account
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-white border-neutral-100">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="flex items-center gap-2 text-rose-600">
                          <AlertTriangle className="w-5 h-5" />
                          Absolute Destructive Action
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-neutral-500 pt-2 pb-4 text-sm leading-relaxed">
                          You are about to permanently delete your account, including your 
                          <span className="font-bold text-black"> {user.plan} </span> 
                          subscription and all <span className="font-bold text-black">{user.validationsUsed}</span> past validations forever. 
                          This action cannot be undone. Please type <span className="font-bold text-black bg-neutral-100 px-1 py-0.5 rounded">DELETE</span> to confirm.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      
                      <div className="py-2">
                        <Input 
                          placeholder="Type DELETE to confirm" 
                          value={deleteConfirmation}
                          onChange={(e) => setDeleteConfirmation(e.target.value)}
                          className="bg-neutral-50 border-neutral-200 text-black font-medium h-11"
                        />
                      </div>

                      <AlertDialogFooter className="mt-6 border-t border-neutral-100 pt-4">
                        <AlertDialogCancel 
                          className="bg-white border-neutral-200 text-black hover:bg-neutral-50 font-semibold"
                          onClick={() => setDeleteConfirmation("")}
                        >
                          Cancel
                        </AlertDialogCancel>
                        <Button
                          variant="destructive"
                          onClick={handleDeleteAccount}
                          disabled={deleteConfirmation !== "DELETE" || isDeleting}
                          className="bg-rose-600 hover:bg-rose-700 text-white font-bold disabled:opacity-50 transition-all"
                        >
                          {isDeleting ? "Deleting..." : "Permanently Delete"}
                        </Button>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
