
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Wifi, Shield, Users, Ticket, Clock, ChevronLeft, ChevronRight, Phone, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSiteSettings, useBannerSettings } from "@/hooks/useSettings";
import { apiService } from "@/services/api";
import { APP_CONFIG } from "@/config/app";
import { validateVoucherCode, validateUsername } from "@/utils/validators";
import { formatCurrency, formatTime, formatDate, getClientIP } from "@/utils/helpers";
import LoadingSpinner from "@/components/common/LoadingSpinner";

const Index = () => {
  const [loginType, setLoginType] = useState<"voucher" | "member">("voucher");
  const [voucherCode, setVoucherCode] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentBanner, setCurrentBanner] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  
  const { toast } = useToast();
  const { settings, loading: settingsLoading } = useSiteSettings();
  const { banners, loading: bannersLoading } = useBannerSettings();

  // Real-time clock
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Banner slider
  useEffect(() => {
    if (banners.length > 1) {
      const bannerTimer = setInterval(() => {
        setCurrentBanner((prev) => (prev + 1) % banners.length);
      }, 3000);

      return () => clearInterval(bannerTimer);
    }
  }, [banners.length]);

  // Update page title when settings change
  useEffect(() => {
    document.title = settings.pageTitle;
  }, [settings.pageTitle]);

  const handleVoucherLogin = async () => {
    if (!validateVoucherCode(voucherCode)) {
      toast({
        title: "Error",
        description: "Kode voucher harus 5 karakter (huruf dan angka)",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const clientIP = await getClientIP();
      const response = await apiService.voucherLogin({
        code: voucherCode,
        ipAddress: clientIP || undefined
      });

      if (response.success) {
        toast({
          title: "Login Berhasil",
          description: `Voucher ${voucherCode} berhasil digunakan`,
        });
        // Redirect to success page or internet access
      } else {
        toast({
          title: "Login Gagal",
          description: response.error || "Kode voucher tidak valid",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Terjadi kesalahan sistem",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleMemberLogin = async () => {
    if (!validateUsername(username) || !password) {
      toast({
        title: "Error", 
        description: "Masukkan username dan password yang valid",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const clientIP = await getClientIP();
      const response = await apiService.memberLogin({
        username,
        password,
        ipAddress: clientIP || undefined
      });

      if (response.success) {
        toast({
          title: "Login Berhasil",
          description: `Selamat datang ${username}`,
        });
        // Redirect to success page or internet access
      } else {
        toast({
          title: "Login Gagal",
          description: response.error || "Username atau password salah",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Terjadi kesalahan sistem",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (settingsLoading || bannersLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <LoadingSpinner size="lg" text="Memuat aplikasi..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                <Wifi className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <div className="text-center sm:text-left">
                <h1 className="text-lg sm:text-xl font-bold text-gray-900">{settings.siteName}</h1>
                <p className="text-xs sm:text-sm text-gray-500">{settings.siteTitle}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-center sm:text-right">
                <div className="flex items-center space-x-2 text-base sm:text-lg font-mono font-bold text-gray-900">
                  <Clock className="h-4 w-4" />
                  <span>{formatTime(currentTime)}</span>
                </div>
                <p className="text-xs text-gray-500 hidden sm:block">{formatDate(currentTime)}</p>
              </div>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">
                <Shield className="h-3 w-3 mr-1" />
                <span className="hidden sm:inline">Secure Connection</span>
                <span className="sm:hidden">Secure</span>
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Banner Slider */}
      {banners.length > 0 && (
        <div className="relative h-20 sm:h-24 overflow-hidden">
          {banners.map((banner, index) => (
            <div
              key={banner.id}
              className={`absolute inset-0 ${banner.bgColor || 'bg-gradient-to-r from-red-500 to-orange-500'} flex items-center justify-center text-white transition-transform duration-500 ease-in-out`}
              style={{
                transform: `translateX(${(index - currentBanner) * 100}%)`
              }}
            >
              <div className="text-center px-4">
                {banner.type === 'image' && banner.imageUrl ? (
                  <img 
                    src={banner.imageUrl} 
                    alt={banner.title || "Banner"} 
                    className="h-full w-auto max-h-20 sm:max-h-24 mx-auto object-contain"
                  />
                ) : (
                  <>
                    <h2 className="text-lg sm:text-2xl font-bold">{banner.title}</h2>
                    <p className="text-xs sm:text-sm opacity-90">{banner.subtitle}</p>
                  </>
                )}
              </div>
            </div>
          ))}
          {banners.length > 1 && (
            <>
              <button
                onClick={() => setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length)}
                className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-1"
              >
                <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
              </button>
              <button
                onClick={() => setCurrentBanner((prev) => (prev + 1) % banners.length)}
                className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-1"
              >
                <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
              </button>
            </>
          )}
        </div>
      )}

      {/* Main Content - Single Column Layout */}
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Login Card */}
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Internet Access
              </CardTitle>
              <p className="text-sm sm:text-base text-gray-600 mt-2">{settings.welcomeMessage}</p>
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
                      disabled={isLoading}
                    />
                    <p className="text-xs text-gray-500 text-center">
                      Format: 1j=1jam, 3j=3jam, 6j=6jam, 1h=1hari, 1m=1minggu
                    </p>
                  </div>
                  <Button 
                    onClick={handleVoucherLogin}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                    size="lg"
                    disabled={isLoading}
                  >
                    {isLoading ? <LoadingSpinner size="sm" /> : "Login dengan Voucher"}
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
                        disabled={isLoading}
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
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                  <Button 
                    onClick={handleMemberLogin}
                    className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
                    size="lg"
                    disabled={isLoading}
                  >
                    {isLoading ? <LoadingSpinner size="sm" /> : "Login Member"}
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

          {/* Pricing & Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Voucher Pricing */}
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-base sm:text-lg text-blue-900 flex items-center">
                  <Ticket className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  Harga Voucher
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {APP_CONFIG.voucherTypes.map((voucher) => (
                  <div key={voucher.id} className="flex justify-between items-center py-1">
                    <span className="text-sm">{voucher.name}</span>
                    <span className="font-semibold text-blue-700">{formatCurrency(voucher.price)}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Member Subscription */}
            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-base sm:text-lg text-green-900 flex items-center">
                  <Users className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  Paket Member
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {APP_CONFIG.memberPackages.map((pkg) => (
                  <div key={pkg.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{pkg.name} ({pkg.speed})</span>
                      <span className="font-bold text-green-700">{formatCurrency(pkg.price)}</span>
                    </div>
                    <p className="text-xs text-green-600">Unlimited, {pkg.devices} Device</p>
                  </div>
                ))}
                <div className="pt-2 text-center">
                  <p className="text-xs text-green-600">Jatuh tempo tgl 15 setiap bulan</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info */}
          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-base sm:text-lg text-purple-900 flex items-center">
                <Phone className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                Cara Berlangganan
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-purple-800">WhatsApp</p>
                  <p className="text-sm text-purple-700">{settings.contactPhone}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-purple-800">Alamat</p>
                  <p className="text-sm text-purple-700 whitespace-pre-line">{settings.contactAddress}</p>
                </div>
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

          {/* Quick Info */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4 text-center">
                <Ticket className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-blue-900 text-sm sm:text-base">Voucher</h3>
                <p className="text-xs text-blue-700">Sekali pakai, berbagai durasi</p>
              </CardContent>
            </Card>
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4 text-center">
                <Users className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold text-green-900 text-sm sm:text-base">Member</h3>
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
