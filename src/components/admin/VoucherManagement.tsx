
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { 
  Plus, 
  Printer, 
  Download, 
  Filter,
  Trash2,
  Copy
} from "lucide-react";

const VoucherManagement = () => {
  const [selectedDuration, setSelectedDuration] = useState("");
  const [bulkCount, setBulkCount] = useState(1);
  const [comment, setComment] = useState("");
  const [selectedCommentFilter, setSelectedCommentFilter] = useState("all");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("all");
  const { toast } = useToast();

  // Mock data
  const voucherTypes = [
    { value: "1j", label: "1 Jam", prefix: "1j", price: 5000 },
    { value: "3j", label: "3 Jam", prefix: "3j", price: 12000 },
    { value: "6j", label: "6 Jam", prefix: "6j", price: 20000 },
    { value: "1h", label: "1 Hari", prefix: "1h", price: 35000 },
    { value: "1m", label: "1 Minggu", prefix: "1m", price: 150000 }
  ];

  const existingComments = [
    "1j_29_06_2025_14:30",
    "3j_29_06_2025_10:15", 
    "6j_28_06_2025_16:45",
    "1h_28_06_2025_09:20",
    "1m_27_06_2025_11:30"
  ];

  const vouchers = [
    { id: 1, code: "1jmL8", type: "1 Jam", status: "used", created: "29/06/2025", comment: "1j_29_06_2025_14:30", usedAt: "29/06/2025 15:45" },
    { id: 2, code: "1jK9P", type: "1 Jam", status: "active", created: "29/06/2025", comment: "1j_29_06_2025_14:30", usedAt: "-" },
    { id: 3, code: "3j6Nh", type: "3 Jam", status: "active", created: "29/06/2025", comment: "3j_29_06_2025_10:15", usedAt: "-" },
    { id: 4, code: "6jm7f", type: "6 Jam", status: "used", created: "28/06/2025", comment: "6j_28_06_2025_16:45", usedAt: "28/06/2025 18:30" },
    { id: 5, code: "1hLVm", type: "1 Hari", status: "active", created: "28/06/2025", comment: "1h_28_06_2025_09:20", usedAt: "-" }
  ];

  const generateAutoComment = (prefix: string) => {
    const now = new Date();
    const day = now.getDate().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const year = now.getFullYear();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    
    return `${prefix}_${day}_${month}_${year}_${hours}:${minutes}`;
  };

  const handleCreateSingleVoucher = () => {
    if (!selectedDuration) {
      toast({
        title: "Error",
        description: "Pilih durasi voucher",
        variant: "destructive"
      });
      return;
    }

    const selectedType = voucherTypes.find(t => t.value === selectedDuration);
    const autoComment = generateAutoComment(selectedType?.prefix || "");
    
    toast({
      title: "Voucher Dibuat",
      description: `1 voucher ${selectedType?.label} berhasil dibuat dengan comment: ${autoComment}`,
    });

    setComment(autoComment);
  };

  const handleCreateBulkVoucher = () => {
    if (!selectedDuration || bulkCount < 1) {
      toast({
        title: "Error", 
        description: "Pilih durasi dan jumlah voucher",
        variant: "destructive"
      });
      return;
    }

    const selectedType = voucherTypes.find(t => t.value === selectedDuration);
    const autoComment = generateAutoComment(selectedType?.prefix || "");
    
    toast({
      title: "Voucher Dibuat",
      description: `${bulkCount} voucher ${selectedType?.label} berhasil dibuat dengan comment: ${autoComment}`,
    });

    setComment(autoComment);
  };

  const handlePrintVouchers = (comment: string) => {
    toast({
      title: "Print Voucher",
      description: `Mencetak voucher dengan comment: ${comment}`,
    });
  };

  const filteredVouchers = vouchers.filter(voucher => {
    const commentMatch = selectedCommentFilter === "all" || voucher.comment === selectedCommentFilter;
    const statusMatch = selectedStatusFilter === "all" || voucher.status === selectedStatusFilter;
    return commentMatch && statusMatch;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Manajemen Voucher</h2>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600">
                <Plus className="h-4 w-4 mr-2" />
                Buat Voucher
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Buat Voucher Baru</DialogTitle>
              </DialogHeader>
              
              <Tabs defaultValue="single" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="single">Single</TabsTrigger>
                  <TabsTrigger value="bulk">Bulk</TabsTrigger>
                </TabsList>
                
                <TabsContent value="single" className="space-y-4">
                  <div className="space-y-2">
                    <Label>Durasi Voucher</Label>
                    <Select value={selectedDuration} onValueChange={setSelectedDuration}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih durasi" />
                      </SelectTrigger>
                      <SelectContent>
                        {voucherTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label} - Rp {type.price.toLocaleString()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Comment (Auto Generate)</Label>
                    <Input 
                      value={comment || (selectedDuration ? generateAutoComment(voucherTypes.find(t => t.value === selectedDuration)?.prefix || "") : "")}
                      readOnly
                      className="bg-gray-50"
                    />
                  </div>
                  
                  <Button onClick={handleCreateSingleVoucher} className="w-full">
                    Buat 1 Voucher
                  </Button>
                </TabsContent>
                
                <TabsContent value="bulk" className="space-y-4">
                  <div className="space-y-2">
                    <Label>Durasi Voucher</Label>
                    <Select value={selectedDuration} onValueChange={setSelectedDuration}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih durasi" />
                      </SelectTrigger>
                      <SelectContent>
                        {voucherTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label} - Rp {type.price.toLocaleString()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Jumlah Voucher</Label>
                    <Input 
                      type="number"
                      value={bulkCount}
                      onChange={(e) => setBulkCount(parseInt(e.target.value) || 1)}
                      min={1}
                      max={1000}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Comment (Auto Generate)</Label>
                    <Input 
                      value={comment || (selectedDuration ? generateAutoComment(voucherTypes.find(t => t.value === selectedDuration)?.prefix || "") : "")}
                      readOnly
                      className="bg-gray-50"
                    />
                  </div>
                  
                  <Button onClick={handleCreateBulkVoucher} className="w-full">
                    Buat {bulkCount} Voucher
                  </Button>
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Voucher Types Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {voucherTypes.map((type) => (
          <Card key={type.value} className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
            <CardContent className="p-4 text-center">
              <h3 className="font-bold text-blue-900">{type.label}</h3>
              <p className="text-sm text-blue-600">Prefix: {type.prefix}</p>
              <p className="text-lg font-bold text-blue-800 mt-2">
                Rp {type.price.toLocaleString()}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filter Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Filter Voucher</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Filter by Comment</Label>
              <Select value={selectedCommentFilter} onValueChange={setSelectedCommentFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih comment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Comment</SelectItem>
                  {existingComments.map((comment) => (
                    <SelectItem key={comment} value={comment}>
                      {comment}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={selectedStatusFilter} onValueChange={setSelectedStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Semua Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  <SelectItem value="active">Aktif</SelectItem>
                  <SelectItem value="used">Terpakai</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button 
                onClick={() => handlePrintVouchers(selectedCommentFilter)}
                className="w-full bg-green-600 hover:bg-green-700"
                disabled={selectedCommentFilter === "all"}
              >
                <Printer className="h-4 w-4 mr-2" />
                Print by Comment
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Voucher Table */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Voucher</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Kode Voucher</TableHead>
                <TableHead>Tipe</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Dibuat</TableHead>
                <TableHead>Comment</TableHead>
                <TableHead>Digunakan</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVouchers.map((voucher) => (
                <TableRow key={voucher.id}>
                  <TableCell className="font-mono font-bold">{voucher.code}</TableCell>
                  <TableCell>{voucher.type}</TableCell>
                  <TableCell>
                    <Badge variant={voucher.status === 'active' ? 'default' : 'secondary'}>
                      {voucher.status === 'active' ? 'Aktif' : 'Terpakai'}
                    </Badge>
                  </TableCell>
                  <TableCell>{voucher.created}</TableCell>
                  <TableCell className="text-xs">{voucher.comment}</TableCell>
                  <TableCell>{voucher.usedAt}</TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      <Button size="sm" variant="outline">
                        <Copy className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Printer className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default VoucherManagement;
