import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
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
import {
  User,
  Bell,
  CreditCard,
  Users,
  Shield,
  Trash2,
  Plus,
  Mail,
  Lock,
} from "lucide-react";

interface SettingsTabsProps {
  activeTab?: string;
}

const SettingsTabs = ({ activeTab = "profile" }: SettingsTabsProps) => {
  const [currentTab, setCurrentTab] = useState(activeTab);

  return (
    <div className="w-full p-6 bg-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-gray-500 mt-2">
          Manage your account settings and preferences
        </p>
      </div>

      <Tabs
        defaultValue={currentTab}
        onValueChange={setCurrentTab}
        className="w-full"
      >
        <TabsList className="grid grid-cols-5 gap-4 mb-8 w-full max-w-4xl">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User size={16} />
            <span>Profile</span>
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users size={16} />
            <span>Users</span>
          </TabsTrigger>
          <TabsTrigger value="billing" className="flex items-center gap-2">
            <CreditCard size={16} />
            <span>Billing</span>
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="flex items-center gap-2"
          >
            <Bell size={16} />
            <span>Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield size={16} />
            <span>Security</span>
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6 max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your institution profile information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=institution" />
                  <AvatarFallback>IN</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <h3 className="font-medium">Institution Logo</h3>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Change
                    </Button>
                    <Button variant="outline" size="sm">
                      Remove
                    </Button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="institutionName">Institution Name</Label>
                  <Input
                    id="institutionName"
                    defaultValue="University of Example"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="institutionType">Institution Type</Label>
                  <Select defaultValue="university">
                    <SelectTrigger id="institutionType">
                      <SelectValue placeholder="Select institution type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="university">University</SelectItem>
                      <SelectItem value="lawFirm">Law Firm</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue="admin@example.edu"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" defaultValue="(555) 123-4567" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    type="url"
                    defaultValue="https://example.edu"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Select defaultValue="us">
                    <SelectTrigger id="country">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="au">Australia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" defaultValue="123 Campus Drive" />
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" defaultValue="Exampleville" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State/Province</Label>
                  <Input id="state" defaultValue="CA" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip">Zip/Postal Code</Label>
                  <Input id="zip" defaultValue="90210" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Users Tab */}
        <TabsContent value="users" className="space-y-6 max-w-4xl">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>User Management</CardTitle>
                <CardDescription>
                  Manage users who have access to your institution's account
                </CardDescription>
              </div>
              <Button className="flex items-center gap-2">
                <Plus size={16} />
                <span>Add User</span>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* User List */}
                <div className="rounded-md border">
                  <div className="p-4 border-b bg-muted/50">
                    <div className="grid grid-cols-5 font-medium text-sm">
                      <div>Name</div>
                      <div>Email</div>
                      <div>Role</div>
                      <div>Status</div>
                      <div className="text-right">Actions</div>
                    </div>
                  </div>

                  {/* User Items */}
                  {[
                    {
                      name: "John Smith",
                      email: "john.smith@example.edu",
                      role: "Admin",
                      status: "Active",
                    },
                    {
                      name: "Sarah Johnson",
                      email: "sarah.j@example.edu",
                      role: "Evaluator",
                      status: "Active",
                    },
                    {
                      name: "Michael Chen",
                      email: "m.chen@example.edu",
                      role: "Viewer",
                      status: "Pending",
                    },
                  ].map((user, index) => (
                    <div key={index} className="p-4 border-b last:border-0">
                      <div className="grid grid-cols-5 items-center">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
                            />
                            <AvatarFallback>
                              {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span>{user.name}</span>
                        </div>
                        <div>{user.email}</div>
                        <div>
                          <Badge
                            variant={
                              user.role === "Admin"
                                ? "default"
                                : user.role === "Evaluator"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {user.role}
                          </Badge>
                        </div>
                        <div>
                          <Badge
                            variant={
                              user.status === "Active" ? "secondary" : "outline"
                            }
                          >
                            {user.status}
                          </Badge>
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="destructive" size="sm">
                                <Trash2 size={14} />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Are you sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This will remove {user.name} from your
                                  institution's account. This action cannot be
                                  undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction className="bg-destructive text-destructive-foreground">
                                  Delete User
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing Tab */}
        <TabsContent value="billing" className="space-y-6 max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle>Subscription Plan</CardTitle>
              <CardDescription>
                Manage your subscription and billing information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-lg border p-4 bg-muted/20">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-lg">Professional Plan</h3>
                    <p className="text-muted-foreground">
                      $199/month, billed monthly
                    </p>
                  </div>
                  <Badge>Current Plan</Badge>
                </div>
                <Separator className="my-4" />
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Evaluations per month</span>
                    <span className="font-medium">100</span>
                  </div>
                  <div className="flex justify-between">
                    <span>User accounts</span>
                    <span className="font-medium">10</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Storage</span>
                    <span className="font-medium">50GB</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Priority support</span>
                    <span className="font-medium">Yes</span>
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button variant="outline">Change Plan</Button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Payment Method</h3>
                <div className="rounded-lg border p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-muted rounded-md p-2">
                      <CreditCard size={20} />
                    </div>
                    <div>
                      <p className="font-medium">Visa ending in 4242</p>
                      <p className="text-sm text-muted-foreground">
                        Expires 12/2025
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Update
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Billing History</h3>
                <div className="rounded-md border">
                  <div className="p-3 border-b bg-muted/50">
                    <div className="grid grid-cols-4 font-medium text-sm">
                      <div>Date</div>
                      <div>Description</div>
                      <div>Amount</div>
                      <div className="text-right">Receipt</div>
                    </div>
                  </div>

                  {[
                    {
                      date: "May 1, 2023",
                      description: "Professional Plan",
                      amount: "$199.00",
                    },
                    {
                      date: "Apr 1, 2023",
                      description: "Professional Plan",
                      amount: "$199.00",
                    },
                    {
                      date: "Mar 1, 2023",
                      description: "Professional Plan",
                      amount: "$199.00",
                    },
                  ].map((invoice, index) => (
                    <div key={index} className="p-3 border-b last:border-0">
                      <div className="grid grid-cols-4 items-center">
                        <div>{invoice.date}</div>
                        <div>{invoice.description}</div>
                        <div>{invoice.amount}</div>
                        <div className="text-right">
                          <Button
                            variant="link"
                            size="sm"
                            className="h-auto p-0"
                          >
                            Download
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6 max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Manage how you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Email Notifications</h3>

                {[
                  {
                    id: "new-evaluation",
                    title: "New evaluation requests",
                    description:
                      "When a new credential evaluation is requested",
                  },
                  {
                    id: "completed-evaluation",
                    title: "Completed evaluations",
                    description:
                      "When an evaluation is completed and ready for review",
                  },
                  {
                    id: "document-upload",
                    title: "Document uploads",
                    description:
                      "When new documents are uploaded to a student profile",
                  },
                  {
                    id: "user-activity",
                    title: "User activity",
                    description:
                      "When users in your institution perform significant actions",
                  },
                  {
                    id: "system-updates",
                    title: "System updates",
                    description:
                      "Important updates about the OpenEval platform",
                  },
                ].map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between py-3 border-b last:border-0"
                  >
                    <div>
                      <h4 className="font-medium">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                    <Switch
                      id={item.id}
                      defaultChecked={item.id !== "user-activity"}
                    />
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notification Delivery</h3>

                <div className="space-y-2">
                  <Label htmlFor="digest">Email Digest</Label>
                  <Select defaultValue="daily">
                    <SelectTrigger id="digest">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Immediate</SelectItem>
                      <SelectItem value="daily">Daily Digest</SelectItem>
                      <SelectItem value="weekly">Weekly Digest</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">
                    How often you want to receive notification emails
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline">Reset to Defaults</Button>
              <Button>Save Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6 max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Manage your account security and authentication methods
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Change Password</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <div className="relative">
                      <Input id="current-password" type="password" />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                      >
                        <Eye size={16} />
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <div className="relative">
                      <Input id="new-password" type="password" />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                      >
                        <Eye size={16} />
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">
                      Confirm New Password
                    </Label>
                    <div className="relative">
                      <Input id="confirm-password" type="password" />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                      >
                        <Eye size={16} />
                      </Button>
                    </div>
                  </div>
                  <Button className="mt-2">Update Password</Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">
                  Two-Factor Authentication
                </h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Authenticator App</p>
                    <p className="text-sm text-muted-foreground">
                      Use an authenticator app to generate one-time codes
                    </p>
                  </div>
                  <Button variant="outline">Setup</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">SMS Authentication</p>
                    <p className="text-sm text-muted-foreground">
                      Receive a code via SMS to verify your identity
                    </p>
                  </div>
                  <Button variant="outline">Setup</Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Session Management</h3>
                <div className="rounded-md border">
                  <div className="p-3 border-b bg-muted/50">
                    <div className="grid grid-cols-4 font-medium text-sm">
                      <div>Device</div>
                      <div>Location</div>
                      <div>Last Active</div>
                      <div className="text-right">Action</div>
                    </div>
                  </div>

                  {[
                    {
                      device: "Chrome on Windows",
                      location: "New York, USA",
                      lastActive: "Now (Current session)",
                    },
                    {
                      device: "Safari on macOS",
                      location: "Boston, USA",
                      lastActive: "Yesterday at 2:45 PM",
                    },
                    {
                      device: "Mobile App on iPhone",
                      location: "Chicago, USA",
                      lastActive: "May 12, 2023 at 10:30 AM",
                    },
                  ].map((session, index) => (
                    <div key={index} className="p-3 border-b last:border-0">
                      <div className="grid grid-cols-4 items-center">
                        <div>{session.device}</div>
                        <div>{session.location}</div>
                        <div>{session.lastActive}</div>
                        <div className="text-right">
                          {index === 0 ? (
                            <Badge variant="outline" className="ml-auto">
                              Current
                            </Badge>
                          ) : (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            >
                              Sign Out
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full">
                  Sign Out All Other Sessions
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsTabs;

// Missing Eye component from lucide-react
const Eye = ({ size = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);
