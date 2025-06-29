
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Wifi, Shield, Users, Ticket } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [loginType, setLoginType] = useState<"voucher" | "member">("voucher");
  const [voucherCode, setVoucherCode] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  const handleVoucherLogin = () => {
    if (!voucherCode) {
      toast({
        title: "Error",
        description: "Masukkan kode voucher",
        variant: "destructive"
      });
      return;
    }
    
    // Simulate voucher validation
    toast({
      title: "Login Berhasil",
      description: `Voucher ${voucherCode} berhasil digunakan`,
    });
  };

  const handleMemberLogin = () => {
    if (!username || !password) {
      toast({
        title: "Error", 
        description: "Masukkan username dan password",
        variant: "destructive"
      });
      return;
    }

    // Simulate member validation
    toast({
      title: "Login Berhasil",
      description: `Selamat datang ${username}`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                <Wifi className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">HotSpot Login</h1>
                <p className="text-sm text-gray-500">Captive Portal System</p>
              </div>
            </div>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              <Shield className="h-3 w-3 mr-1" />
              Secure Connection
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Internet Access
              </CardTitle>
              <p className="text-gray-600 mt-2">Pilih metode login untuk mengakses internet</p>
            </CardHeader>

            <CardContent>
              <Tabs value={loginType} onValueChange={(value: any) => setLoginType(value)} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="voucher" className="flex items-center space-x-2">
                    <Ticket className="h-4 w-4" />
                    <span>Voucher</span>
                  </TabsTrigger>
                  <TabsTrigger value="member" className="flex items-center space-x-2">
                    <Users className="h-4 w-4" />
                    <span>Member</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="voucher" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="voucher">Kode Voucher</Label>
                    <Input
                      id="voucher"
                      placeholder="Masukkan kode voucher (contoh: 1jmL8)"
                      value={voucherCode}
                      onChange={(e) => setVoucherCode(e.target.value.toUpperCase())}
                      className="text-center text-lg font-mono tracking-wider"
                      maxLength={5}
                    />
                    <p className="text-xs text-gray-500 text-center">
                      Format: 1j=1jam, 3j=3jam, 6j=6jam, 1h=1hari, 1m=1minggu
                    </p>
                  </div>
                  <Button 
                    onClick={handleVoucherLogin}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                    size="lg"
                  >
                    Login dengan Voucher
                  </Button>
                </TabsContent>

                <TabsContent value="member" className="space-y-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        placeholder="Username member"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Password member"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <Button 
                    onClick={handleMemberLogin}
                    className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
                    size="lg"
                  >
                    Login Member
                  </Button>
                </TabsContent>
              </Tabs>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="text-center space-y-2">
                  <p className="text-sm text-gray-600">
                    Butuh bantuan? Hubungi administrator
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <a href="/admin">Admin Panel</a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Info Cards */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4 text-center">
                <Ticket className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-blue-900">Voucher</h3>
                <p className="text-xs text-blue-700">Sekali pakai, berbagai durasi</p>
              </CardContent>
            </Card>
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4 text-center">
                <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold text-green-900">Member</h3>
                <p className="text-xs text-green-700">Bulanan, jatuh tempo tgl 15</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
