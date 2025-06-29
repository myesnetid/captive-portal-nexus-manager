import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Plus, Image, Type, Trash2, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Banner {
  id: string;
  title: string;
  subtitle: string;
  bgColor: string;
  type: "text" | "image";
  imageUrl?: string;
}

const BannerSettings = () => {
  const [banners, setBanners] = useState<Banner[]>([
    {
      id: "1",
      title: "STOP JUDI ONLINE",
      subtitle: "Judi Online Merusak Masa Depan Anda",
      bgColor: "bg-red-500",
      type: "text"
    },
    {
      id: "2",
      title: "LINDUNGI KELUARGA",
      subtitle: "Dari Bahaya Judi Online",
      bgColor: "bg-orange-500",
      type: "text"
    },
    {
      id: "3",
      title: "INTERNET SEHAT",
      subtitle: "Untuk Kehidupan Yang Lebih Baik",
      bgColor: "bg-green-500",
      type: "text"
    }
  ]);

  const [newBanner, setNewBanner] = useState<Omit<Banner, "id">>({
    title: "",
    subtitle: "",
    bgColor: "bg-blue-500",
    type: "text"
  });

  const { toast } = useToast();

  const addBanner = () => {
    if (!newBanner.title) {
      toast({
        title: "Error",
        description: "Judul banner tidak boleh kosong",
        variant: "destructive"
      });
      return;
    }

    const banner: Banner = {
      ...newBanner,
      id: Date.now().toString()
    };

    setBanners([...banners, banner]);
    setNewBanner({
      title: "",
      subtitle: "",
      bgColor: "bg-blue-500",
      type: "text"
    });

    toast({
      title: "Banner Ditambahkan",
      description: "Banner baru berhasil ditambahkan"
    });
  };

  const deleteBanner = (id: string) => {
    setBanners(banners.filter(banner => banner.id !== id));
    toast({
      title: "Banner Dihapus",
      description: "Banner berhasil dihapus"
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload the file to a server
      const imageUrl = URL.createObjectURL(file);
      setNewBanner({
        ...newBanner,
        imageUrl,
        type: "image"
      });
    }
  };

  const colorOptions = [
    { value: "bg-red-500", label: "Merah", color: "bg-red-500" },
    { value: "bg-orange-500", label: "Orange", color: "bg-orange-500" },
    { value: "bg-yellow-500", label: "Kuning", color: "bg-yellow-500" },
    { value: "bg-green-500", label: "Hijau", color: "bg-green-500" },
    { value: "bg-blue-500", label: "Biru", color: "bg-blue-500" },
    { value: "bg-purple-500", label: "Ungu", color: "bg-purple-500" },
    { value: "bg-pink-500", label: "Pink", color: "bg-pink-500" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Pengaturan Banner</h2>
        <Badge variant="outline" className="bg-blue-50 text-blue-700">
          {banners.length} Banner Aktif
        </Badge>
      </div>

      {/* Add New Banner */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Plus className="h-5 w-5 text-green-600" />
            <span>Tambah Banner Baru</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="banner-type"
                checked={newBanner.type === "image"}
                onCheckedChange={(checked) => 
                  setNewBanner({
                    ...newBanner,
                    type: checked ? "image" : "text",
                    imageUrl: checked ? newBanner.imageUrl : undefined
                  })
                }
              />
              <Label htmlFor="banner-type" className="flex items-center space-x-2">
                {newBanner.type === "image" ? (
                  <>
                    <Image className="h-4 w-4" />
                    <span>Gunakan Gambar</span>
                  </>
                ) : (
                  <>
                    <Type className="h-4 w-4" />
                    <span>Gunakan Teks</span>
                  </>
                )}
              </Label>
            </div>
          </div>

          {newBanner.type === "text" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Judul Banner</Label>
                  <Input
                    placeholder="Masukkan judul banner"
                    value={newBanner.title}
                    onChange={(e) => setNewBanner({...newBanner, title: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Subtitle Banner</Label>
                  <Textarea
                    placeholder="Masukkan subtitle banner"
                    value={newBanner.subtitle}
                    onChange={(e) => setNewBanner({...newBanner, subtitle: e.target.value})}
                    rows={3}
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Warna Background</Label>
                  <div className="grid grid-cols-4 gap-2">
                    {colorOptions.map((color) => (
                      <button
                        key={color.value}
                        onClick={() => setNewBanner({...newBanner, bgColor: color.value})}
                        className={`w-full h-10 rounded-md border-2 ${color.color} ${
                          newBanner.bgColor === color.value ? 'border-white ring-2 ring-gray-400' : 'border-gray-300'
                        }`}
                        title={color.label}
                      />
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Preview</Label>
                  <div className={`w-full h-20 rounded-md ${newBanner.bgColor} flex items-center justify-center text-white`}>
                    <div className="text-center">
                      <p className="font-bold text-sm">{newBanner.title || "Judul Banner"}</p>
                      <p className="text-xs opacity-90">{newBanner.subtitle || "Subtitle Banner"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Upload Gambar Banner</Label>
                <div className="flex items-center space-x-4">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="flex-1"
                  />
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload
                  </Button>
                </div>
              </div>
              {newBanner.imageUrl && (
                <div className="space-y-2">
                  <Label>Preview Gambar</Label>
                  <div className="w-full h-32 bg-gray-100 rounded-md overflow-hidden">
                    <img
                      src={newBanner.imageUrl}
                      alt="Banner preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          <Button onClick={addBanner} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Tambah Banner
          </Button>
        </CardContent>
      </Card>

      {/* Existing Banners */}
      <Card>
        <CardHeader>
          <CardTitle>Banner Aktif</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {banners.map((banner, index) => (
              <div key={banner.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                <div className="flex-shrink-0">
                  <Badge variant="outline">#{index + 1}</Badge>
                </div>
                <div className="flex-1">
                  {banner.type === "text" ? (
                    <div className={`w-full h-16 rounded-md ${banner.bgColor} flex items-center justify-center text-white`}>
                      <div className="text-center">
                        <p className="font-bold text-sm">{banner.title}</p>
                        <p className="text-xs opacity-90">{banner.subtitle}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-16 bg-gray-100 rounded-md overflow-hidden">
                      <img
                        src={banner.imageUrl}
                        alt={banner.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={banner.type === "text" ? "default" : "secondary"}>
                    {banner.type === "text" ? "Teks" : "Gambar"}
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteBanner(banner.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BannerSettings;
