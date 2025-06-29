
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Globe, Save, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SiteSettings = () => {
  const [settings, setSettings] = useState({
    siteName: "Myesnet.id",
    siteTitle: "Internet Provider Terpercaya",
    pageTitle: "Myesnet.id - Captive Portal",
    description: "Internet Provider Terpercaya untuk kebutuhan internet Anda",
    welcomeMessage: "Selamat datang di layanan internet Myesnet.id",
    contactPhone: "+62 812-3456-7890",
    contactAddress: "Jl. Internet Sehat No. 123\nKota Digital",
    adminEmail: "admin@myesnet.id"
  });

  const { toast } = useToast();

  const handleSave = () => {
    // In a real app, this would save to backend/database
    localStorage.setItem('siteSettings', JSON.stringify(settings));
    
    toast({
      title: "Pengaturan Disimpan",
      description: "Pengaturan situs berhasil disimpan"
    });
  };

  const handleReset = () => {
    setSettings({
      siteName: "Myesnet.id",
      siteTitle: "Internet Provider Terpercaya",
      pageTitle: "Myesnet.id - Captive Portal",
      description: "Internet Provider Terpercaya untuk kebutuhan internet Anda",
      welcomeMessage: "Selamat datang di layanan internet Myesnet.id",
      contactPhone: "+62 812-3456-7890",
      contactAddress: "Jl. Internet Sehat No. 123\nKota Digital",
      adminEmail: "admin@myesnet.id"
    });

    toast({
      title: "Pengaturan Direset",
      description: "Pengaturan dikembalikan ke default"
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Globe className="h-6 w-6 text-gray-600" />
          <h2 className="text-2xl font-bold text-gray-900">Pengaturan Situs</h2>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleReset}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Simpan
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Site Information */}
        <Card>
          <CardHeader>
            <CardTitle>Informasi Dasar Situs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Nama Situs</Label>
              <Input
                placeholder="Myesnet.id"
                value={settings.siteName}
                onChange={(e) => setSettings({...settings, siteName: e.target.value})}
              />
              <p className="text-xs text-gray-500">Nama yang akan ditampilkan di header</p>
            </div>

            <div className="space-y-2">
              <Label>Tagline Situs</Label>
              <Input
                placeholder="Internet Provider Terpercaya"
                value={settings.siteTitle}
                onChange={(e) => setSettings({...settings, siteTitle: e.target.value})}
              />
              <p className="text-xs text-gray-500">Tagline yang akan ditampilkan di bawah nama situs</p>
            </div>

            <div className="space-y-2">
              <Label>Judul Halaman (Page Title)</Label>
              <Input
                placeholder="Myesnet.id - Captive Portal"
                value={settings.pageTitle}
                onChange={(e) => setSettings({...settings, pageTitle: e.target.value})}
              />
              <p className="text-xs text-gray-500">Judul yang akan muncul di tab browser</p>
            </div>

            <div className="space-y-2">
              <Label>Deskripsi Situs</Label>
              <Textarea
                placeholder="Internet Provider Terpercaya untuk kebutuhan internet Anda"
                value={settings.description}
                onChange={(e) => setSettings({...settings, description: e.target.value})}
                rows={3}
              />
              <p className="text-xs text-gray-500">Deskripsi singkat tentang layanan</p>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Informasi Kontak</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Nomor WhatsApp</Label>
              <Input
                placeholder="+62 812-3456-7890"
                value={settings.contactPhone}
                onChange={(e) => setSettings({...settings, contactPhone: e.target.value})}
              />
              <p className="text-xs text-gray-500">Nomor WhatsApp untuk customer service</p>
            </div>

            <div className="space-y-2">
              <Label>Alamat</Label>
              <Textarea
                placeholder="Jl. Internet Sehat No. 123&#10;Kota Digital"
                value={settings.contactAddress}
                onChange={(e) => setSettings({...settings, contactAddress: e.target.value})}
                rows={3}
              />
              <p className="text-xs text-gray-500">Alamat lengkap kantor/toko</p>
            </div>

            <div className="space-y-2">
              <Label>Email Admin</Label>
              <Input
                type="email"
                placeholder="admin@myesnet.id"
                value={settings.adminEmail}
                onChange={(e) => setSettings({...settings, adminEmail: e.target.value})}
              />
              <p className="text-xs text-gray-500">Email administrator untuk keperluan teknis</p>
            </div>
          </CardContent>
        </Card>

        {/* Welcome Message */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Pesan Selamat Datang</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Pesan Selamat Datang</Label>
              <Textarea
                placeholder="Selamat datang di layanan internet Myesnet.id"
                value={settings.welcomeMessage}
                onChange={(e) => setSettings({...settings, welcomeMessage: e.target.value})}
                rows={4}
              />
              <p className="text-xs text-gray-500">Pesan yang akan ditampilkan kepada pengguna</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Preview Card */}
      <Card>
        <CardHeader>
          <CardTitle>Preview Pengaturan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 p-4 rounded-lg space-y-3">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                <Globe className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">{settings.siteName}</h3>
                <p className="text-sm text-gray-500">{settings.siteTitle}</p>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              <p><strong>Page Title:</strong> {settings.pageTitle}</p>
              <p><strong>Deskripsi:</strong> {settings.description}</p>
              <p><strong>WhatsApp:</strong> {settings.contactPhone}</p>
              <p><strong>Email:</strong> {settings.adminEmail}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SiteSettings;
