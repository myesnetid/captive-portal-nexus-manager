
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Wifi, Shield, Users, Ticket, Clock, ChevronLeft, ChevronRight, Phone, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [loginType, setLoginType] = useState<"voucher" | "member">("voucher");
  const [voucherCode, setVoucherCode] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentBanner, setCurrentBanner] = useState(0);
  const { toast } = useToast();

  // Real-time clock
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Banner slider
  const banners = [
    {
      title: "STOP JUDI ONLINE",
      subtitle: "Judi Online Merusak Masa Depan Anda",
      bgColor: "bg-red-500"
    },
    {
      title: "LINDUNGI KELUARGA",
      subtitle: "Dari Bahaya Judi Online",
      bgColor: "bg-orange-500"
    },
    {
      title: "INTERNET SEHAT",
      subtitle: "Untuk Kehidupan Yang Lebih Baik",
      bgColor: "bg-green-500"
    }
  ];

  useEffect(() => {
    const bannerTimer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 3000);

    return () => clearInterval(bannerTimer);
  }, [banners.length]);

  const handleVoucherLogin = () => {
    if (!voucherCode) {
      toast({
        title: "Error",
        description: "Masukkan kode voucher",
        variant: "destructive"
      });
      return;
    }
    
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

    toast({
      title: "Login Berhasil",
      description: `Selamat datang ${username}`,
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
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
                <h1 className="text-xl font-bold text-gray-900">Myesnet.id</h1>
                <p className="text-sm text-gray-500">Internet Provider Terpercaya</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="flex items-center space-x-2 text-lg font-mono font-bold text-gray-900">
                  <Clock className="h-4 w-4" />
                  <span>{formatTime(currentTime)}</span>
                </div>
                <p className="text-xs text-gray-500">{formatDate(currentTime)}</p>
              </div>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <Shield className="h-3 w-3 mr-1" />
                Secure Connection
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Banner Slider */}
      <div className="relative h-24 overflow-hidden bg-gradient-to-r from-red-500 to-orange-500">
        {banners.map((banner, index) => (
          <div
            key={index}
            className={`absolute inset-0 ${banner.bgColor} flex items-center justify-center text-white transition-transform duration-500 ease-in-out`}
            style={{
              transform: `translateX(${(index - currentBanner) * 100}%)`
            }}
          >
            <div className="text-center">
              <h2 className="text-2xl font-bold">{banner.title}</h2>
              <p className="text-sm opacity-90">{banner.subtitle}</p>
            </div>
          </div>
        ))}
        <button
          onClick={() => setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length)}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-1"
        >
          <ChevronLeft className="h-4 w-4 text-white" />
        </button>
        <button
          onClick={() => setCurrentBanner((prev) => (prev + 1) % banners.length)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-1"
        >
          <ChevronRight className="h-4 w-4 text-white" />
        </button>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Login Card */}
            <div className="lg:col-span-2">
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
            </div>

            {/* Pricing & Info Sidebar */}
            <div className="space-y-4">
              {/* Voucher Pricing */}
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-blue-900 flex items-center">
                    <Ticket className="h-5 w-5 mr-2" />
                    Harga Voucher
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between items-center py-1">
                    <span className="text-sm">1 Jam</span>
                    <span className="font-semibold text-blue-700">Rp 2.000</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-sm">3 Jam</span>
                    <span className="font-semibold text-blue-700">Rp 5.000</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-sm">6 Jam</span>
                    <span className="font-semibold text-blue-700">Rp 8.000</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-sm">1 Hari</span>
                    <span className="font-semibold text-blue-700">Rp 12.000</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-sm">1 Minggu</span>
                    <span className="font-semibold text-blue-700">Rp 25.000</span>
                  </div>
                </CardContent>
              </Card>

              {/* Member Subscription */}
              <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-green-900 flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    Paket Member
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Basic (10 Mbps)</span>
                      <span className="font-bold text-green-700">Rp 150.000</span>
                    </div>
                    <p className="text-xs text-green-600">Unlimited, 2 Device</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Standard (20 Mbps)</span>
                      <span className="font-bold text-green-700">Rp 250.000</span>
                    </div>
                    <p className="text-xs text-green-600">Unlimited, 4 Device</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Premium (50 Mbps)</span>
                      <span className="font-bold text-green-700">Rp 400.000</span>
                    </div>
                    <p className="text-xs text-green-600">Unlimited, 6 Device</p>
                  </div>
                  <div className="pt-2 text-center">
                    <p className="text-xs text-green-600">Jatuh tempo tgl 15 setiap bulan</p>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-purple-900 flex items-center">
                    <Phone className="h-5 w-5 mr-2" />
                    Cara Berlangganan
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-purple-800">WhatsApp</p>
                    <p className="text-sm text-purple-700">+62 812-3456-7890</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-purple-800">Alamat</p>
                    <p className="text-sm text-purple-700">Jl. Internet Sehat No. 123<br />Kota Digital</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-purple-800 flex items-center">
                      <CreditCard className="h-4 w-4 mr-1" />
                      Pembayaran
                    </p>
                    <p className="text-xs text-purple-600">Transfer Bank, E-Wallet, Cash</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

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
