
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { 
  Plus, 
  Edit, 
  Trash2,
  Calendar,
  User,
  Phone,
  Wifi,
  DollarSign,
  RefreshCw
} from "lucide-react";

const MemberManagement = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [memberForm, setMemberForm] = useState({
    name: "",
    phone: "",
    username: "",
    password: "",
    rxSpeed: "",
    txSpeed: "",
    deviceLimit: 1,
    price: 0
  });
  const { toast } = useToast();

  // Mock data
  const members = [
    {
      id: 1,
      name: "John Doe",
      phone: "081234567890", 
      username: "john_doe",
      status: "active",
      dueDate: "15/07/2025",
      rxSpeed: "10M",
      txSpeed: "5M", 
      deviceLimit: 3,
      price: 150000,
      createdAt: "15/06/2025",
      lastPayment: "15/06/2025"
    },
    {
      id: 2,
      name: "Jane Smith",
      phone: "081234567891",
      username: "jane_smith", 
      status: "expired",
      dueDate: "15/06/2025",
      rxSpeed: "20M",
      txSpeed: "10M",
      deviceLimit: 5,
      price: 250000,
      createdAt: "15/05/2025", 
      lastPayment: "15/05/2025"
    },
    {
      id: 3,
      name: "Bob Wilson",
      phone: "081234567892",
      username: "bob_wilson",
      status: "active", 
      dueDate: "15/07/2025",
      rxSpeed: "50M",
      txSpeed: "25M",
      deviceLimit: 10,
      price: 500000,
      createdAt: "15/06/2025",
      lastPayment: "15/06/2025"
    }
  ];

  const speedProfiles = [
    { rx: "5M", tx: "2M", name: "Basic" },
    { rx: "10M", tx: "5M", name: "Standard" }, 
    { rx: "20M", tx: "10M", name: "Premium" },
    { rx: "50M", tx: "25M", name: "Business" },
    { rx: "100M", tx: "50M", name: "Enterprise" }
  ];

  const handleAddMember = () => {
    if (!memberForm.name || !memberForm.username || !memberForm.password) {
      toast({
        title: "Error",
        description: "Nama, username dan password harus diisi",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Member Ditambahkan",
      description: `Member ${memberForm.name} berhasil ditambahkan`,
    });

    setMemberForm({
      name: "",
      phone: "",
      username: "",
      password: "",
      rxSpeed: "",
      txSpeed: "",
      deviceLimit: 1,
      price: 0
    });
    setIsAddDialogOpen(false);
  };

  const handleRenewMember = (memberId: number, memberName: string) => {
    toast({
      title: "Member Diperpanjang",
      description: `Status ${memberName} telah diperpanjang hingga 15 bulan depan`,
    });
  };

  const getStatusBadge = (status: string) => {
    if (status === 'active') {
      return <Badge className="bg-green-100 text-green-800">Aktif</Badge>;
    } else if (status === 'expired') {
      return <Badge variant="destructive">Expired</Badge>;
    } else {
      return <Badge variant="secondary">Suspended</Badge>;
    }
  };

  const getDaysUntilDue = (dueDate: string) => {
    const due = new Date(dueDate.split('/').reverse().join('-'));
    const today = new Date();
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Manajemen Member</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-green-500 to-blue-600">
              <Plus className="h-4 w-4 mr-2" />
              Tambah Member
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Tambah Member Baru</DialogTitle>
            </DialogHeader>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nama Pelanggan</Label>
                <Input 
                  placeholder="Nama lengkap"
                  value={memberForm.name}
                  onChange={(e) => setMemberForm({...memberForm, name: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label>No. Telepon</Label>
                <Input 
                  placeholder="08xxxxxxxxxx"
                  value={memberForm.phone}
                  onChange={(e) => setMemberForm({...memberForm, phone: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Username</Label>
                <Input 
                  placeholder="Username untuk login"
                  value={memberForm.username}
                  onChange={(e) => setMemberForm({...memberForm, username: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Password</Label>
                <Input 
                  type="password"
                  placeholder="Password untuk login"
                  value={memberForm.password}
                  onChange={(e) => setMemberForm({...memberForm, password: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Kecepatan Download (Mbps)</Label>
                <Select onValueChange={(value) => setMemberForm({...memberForm, rxSpeed: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih kecepatan RX" />
                  </SelectTrigger>
                  <SelectContent>
                    {speedProfiles.map((profile) => (
                      <SelectItem key={profile.rx} value={profile.rx}>
                        {profile.rx} - {profile.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Kecepatan Upload (Mbps)</Label>
                <Select onValueChange={(value) => setMemberForm({...memberForm, txSpeed: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih kecepatan TX" />
                  </SelectTrigger>
                  <SelectContent>
                    {speedProfiles.map((profile) => (
                      <SelectItem key={profile.tx} value={profile.tx}>
                        {profile.tx} - {profile.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Limit Device</Label>
                <Input 
                  type="number"
                  placeholder="Jumlah device maksimal"
                  value={memberForm.deviceLimit}
                  onChange={(e) => setMemberForm({...memberForm, deviceLimit: parseInt(e.target.value) || 1})}
                  min={1}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Harga Bulanan (Rp)</Label>
                <Input 
                  type="number"
                  placeholder="Harga per bulan"
                  value={memberForm.price}
                  onChange={(e) => setMemberForm({...memberForm, price: parseInt(e.target.value) || 0})}
                />
              </div>
            </div>
            
            <div className="flex space-x-2 mt-6">
              <Button onClick={handleAddMember} className="flex-1">
                Tambah Member
              </Button>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="flex-1">
                Batal
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Member Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Member Aktif</p>
                <p className="text-2xl font-bold">
                  {members.filter(m => m.status === 'active').length}
                </p>
              </div>
              <User className="h-8 w-8 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Member Expired</p>
                <p className="text-2xl font-bold">
                  {members.filter(m => m.status === 'expired').length}
                </p>
              </div>
              <Calendar className="h-8 w-8 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Total Member</p>
                <p className="text-2xl font-bold">{members.length}</p>
              </div>
              <User className="h-8 w-8 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Pendapatan/Bulan</p>
                <p className="text-2xl font-bold">
                  {(members.filter(m => m.status === 'active').reduce((sum, m) => sum + m.price, 0) / 1000000).toFixed(1)}M
                </p>
              </div>
              <DollarSign className="h-8 w-8 opacity-80" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Member Table */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Member</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Kontak</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Jatuh Tempo</TableHead>
                <TableHead>Kecepatan</TableHead>
                <TableHead>Device Limit</TableHead>
                <TableHead>Harga</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((member) => {
                const daysUntilDue = getDaysUntilDue(member.dueDate);
                return (
                  <TableRow key={member.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-gray-500">ID: {member.id}</p>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono">{member.username}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Phone className="h-3 w-3 text-gray-400" />
                        <span className="text-sm">{member.phone}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {getStatusBadge(member.status)}
                        {member.status === 'active' && daysUntilDue <= 7 && (
                          <Badge variant="outline" className="text-xs">
                            {daysUntilDue} hari lagi
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p>{member.dueDate}</p>
                        <p className="text-gray-500">Bayar: {member.lastPayment}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Wifi className="h-3 w-3 text-blue-500" />
                        <span className="text-sm">{member.rxSpeed}/{member.txSpeed}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">{member.deviceLimit}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <DollarSign className="h-3 w-3 text-green-500" />
                        <span className="text-sm">Rp {member.price.toLocaleString()}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleRenewMember(member.id, member.name)}
                          className="text-green-600"
                        >
                          <RefreshCw className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default MemberManagement;
