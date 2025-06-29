import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Settings as SettingsIcon, 
  Database, 
  Wifi, 
  Shield,
  Palette,
  Globe,
  Server,
  Image
} from "lucide-react";
import BannerSettings from "./BannerSettings";
import SiteSettings from "./SiteSettings";

const Settings = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <SettingsIcon className="h-6 w-6 text-gray-600" />
        <h2 className="text-2xl font-bold text-gray-900">Pengaturan Sistem</h2>
      </div>

      <Tabs defaultValue="site" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="site" className="flex items-center space-x-2">
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline">Situs</span>
          </TabsTrigger>
          <TabsTrigger value="banner" className="flex items-center space-x-2">
            <Image className="h-4 w-4" />
            <span className="hidden sm:inline">Banner</span>
          </TabsTrigger>
          <TabsTrigger value="system" className="flex items-center space-x-2">
            <Database className="h-4 w-4" />
            <span className="hidden sm:inline">Sistem</span>
          </TabsTrigger>
          <TabsTrigger value="voucher" className="flex items-center space-x-2">
            <Palette className="h-4 w-4" />
            <span className="hidden sm:inline">Voucher</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center space-x-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Keamanan</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="site" className="space-y-6">
          <SiteSettings />
        </TabsContent>

        <TabsContent value="banner" className="space-y-6">
          <BannerSettings />
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Database Configuration */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="h-5 w-5 text-blue-600" />
                  <span>Konfigurasi Database</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>MySQL Host</Label>
                  <Input placeholder="localhost" defaultValue="localhost" />
                </div>
                <div className="space-y-2">
                  <Label>Database Name</Label>
                  <Input placeholder="radius" defaultValue="radius" />
                </div>
                <div className="space-y-2">
                  <Label>Username</Label>
                  <Input placeholder="radius_user" defaultValue="radius_user" />
                </div>
                <div className="space-y-2">
                  <Label>Password</Label>
                  <Input type="password" placeholder="••••••••" />
                </div>
                <div className="flex items-center justify-between pt-2">
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Connected
                  </Badge>
                  <Button size="sm">Test Connection</Button>
                </div>
              </CardContent>
            </Card>

            {/* FreeRADIUS Configuration */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Server className="h-5 w-5 text-purple-600" />
                  <span>Konfigurasi FreeRADIUS</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>RADIUS Server IP</Label>
                  <Input placeholder="127.0.0.1" defaultValue="127.0.0.1" />
                </div>
                <div className="space-y-2">
                  <Label>Auth Port</Label>
                  <Input placeholder="1812" defaultValue="1812" />
                </div>
                <div className="space-y-2">
                  <Label>Accounting Port</Label>
                  <Input placeholder="1813" defaultValue="1813" />
                </div>
                <div className="space-y-2">
                  <Label>Shared Secret</Label>
                  <Input type="password" placeholder="shared_secret" />
                </div>
                <div className="flex items-center justify-between pt-2">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    Active
                  </Badge>
                  <Button size="sm">Test RADIUS</Button>
                </div>
              </CardContent>
            </Card>

            {/* MikroTik Configuration */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Wifi className="h-5 w-5 text-orange-600" />
                  <span>Konfigurasi MikroTik</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Router IP</Label>
                  <Input placeholder="192.168.1.1" defaultValue="192.168.1.1" />
                </div>
                <div className="space-y-2">
                  <Label>API Port</Label>
                  <Input placeholder="8728" defaultValue="8728" />
                </div>
                <div className="space-y-2">
                  <Label>Username</Label>
                  <Input placeholder="admin" defaultValue="admin" />
                </div>
                <div className="space-y-2">
                  <Label>Password</Label>
                  <Input type="password" placeholder="••••••••" />
                </div>
                <div className="flex items-center justify-between pt-2">
                  <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                    Connected
                  </Badge>
                  <Button size="sm">Test Connection</Button>
                </div>
              </CardContent>
            </Card>

            {/* Captive Portal Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="h-5 w-5 text-green-600" />
                  <span>Pengaturan Captive Portal</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Portal Title</Label>
                  <Input placeholder="HotSpot Login" defaultValue="HotSpot Login" />
                </div>
                <div className="space-y-2">
                  <Label>Welcome Message</Label>
                  <Textarea placeholder="Selamat datang di HotSpot..." rows={3} />
                </div>
                <div className="space-y-2">
                  <Label>Redirect URL (After Login)</Label>
                  <Input placeholder="https://google.com" defaultValue="https://google.com" />
                </div>
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="auto-logout" />
                    <Label htmlFor="auto-logout">Auto Logout</Label>
                  </div>
                  <Badge variant="outline">Active</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="voucher" className="space-y-6">
          {/* Voucher Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Palette className="h-5 w-5 text-indigo-600" />
                <span>Pengaturan Voucher</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">1 Jam (1j)</h4>
                  <div className="space-y-2">
                    <Label>Prefix</Label>
                    <Input defaultValue="1j" maxLength={2} />
                  </div>
                  <div className="space-y-2">
                    <Label>Harga (Rp)</Label>
                    <Input type="number" defaultValue="5000" />
                  </div>
                  <div className="space-y-2">
                    <Label>Durasi (menit)</Label>
                    <Input type="number" defaultValue="60" />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">3 Jam (3j)</h4>
                  <div className="space-y-2">
                    <Label>Prefix</Label>
                    <Input defaultValue="3j" maxLength={2} />
                  </div>
                  <div className="space-y-2">
                    <Label>Harga (Rp)</Label>
                    <Input type="number" defaultValue="12000" />
                  </div>
                  <div className="space-y-2">
                    <Label>Durasi (menit)</Label>
                    <Input type="number" defaultValue="180" />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">6 Jam (6j)</h4>
                  <div className="space-y-2">
                    <Label>Prefix</Label>
                    <Input defaultValue="6j" maxLength={2} />
                  </div>
                  <div className="space-y-2">
                    <Label>Harga (Rp)</Label>
                    <Input type="number" defaultValue="20000" />
                  </div>
                  <div className="space-y-2">
                    <Label>Durasi (menit)</Label>
                    <Input type="number" defaultValue="360" />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">1 Hari (1h)</h4>
                  <div className="space-y-2">
                    <Label>Prefix</Label>
                    <Input defaultValue="1h" maxLength={2} />
                  </div>
                  <div className="space-y-2">
                    <Label>Harga (Rp)</Label>
                    <Input type="number" defaultValue="35000" />
                  </div>
                  <div className="space-y-2">
                    <Label>Durasi (menit)</Label>
                    <Input type="number" defaultValue="1440" />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">1 Minggu (1m)</h4>
                  <div className="space-y-2">
                    <Label>Prefix</Label>
                    <Input defaultValue="1m" maxLength={2} />
                  </div>
                  <div className="space-y-2">
                    <Label>Harga (Rp)</Label>
                    <Input type="number" defaultValue="150000" />
                  </div>
                  <div className="space-y-2">
                    <Label>Durasi (menit)</Label>
                    <Input type="number" defaultValue="10080" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          {/* Security Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-red-600" />
                <span>Pengaturan Keamanan</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Enable Session Timeout</Label>
                      <p className="text-sm text-gray-500">Logout otomatis setelah tidak aktif</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Enable MAC Binding</Label>
                      <p className="text-sm text-gray-500">Ikat login dengan MAC address</p>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Enable Rate Limiting</Label>
                      <p className="text-sm text-gray-500">Batasi bandwidth per user</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Session Timeout (menit)</Label>
                    <Input type="number" defaultValue="30" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Max Concurrent Sessions</Label>
                    <Input type="number" defaultValue="1" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Login Attempts Limit</Label>
                    <Input type="number" defaultValue="3" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end space-x-2">
        <Button variant="outline">Reset to Default</Button>
        <Button className="bg-gradient-to-r from-blue-500 to-purple-600">
          Simpan Pengaturan
        </Button>
      </div>
    </div>
  );
};

export default Settings;
