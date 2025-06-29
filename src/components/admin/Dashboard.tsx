
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  Ticket, 
  Calendar, 
  TrendingUp, 
  Clock, 
  DollarSign 
} from "lucide-react";

const Dashboard = () => {
  // Mock data
  const stats = {
    totalVouchers: 1250,
    usedVouchers: 847, 
    totalMembers: 186,
    activeMembers: 162,
    todayRevenue: 2450000,
    monthlyRevenue: 45600000
  };

  const recentActivity = [
    { type: "voucher", code: "1jmL8", used: "2 menit lalu", duration: "1 jam" },
    { type: "voucher", code: "3j6Nh", used: "5 menit lalu", duration: "3 jam" },
    { type: "member", username: "john_doe", action: "Login", time: "8 menit lalu" },
    { type: "voucher", code: "6jm7f", used: "12 menit lalu", duration: "6 jam" },
    { type: "member", username: "jane_smith", action: "Renewed", time: "15 menit lalu" }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Total Voucher</CardTitle>
            <Ticket className="h-4 w-4 opacity-90" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalVouchers.toLocaleString()}</div>
            <div className="text-xs opacity-90 mt-1">
              {stats.usedVouchers} telah digunakan
            </div>
            <Progress 
              value={(stats.usedVouchers / stats.totalVouchers) * 100} 
              className="mt-2 bg-blue-400"
            />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Member Aktif</CardTitle>
            <Users className="h-4 w-4 opacity-90" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeMembers}</div>
            <div className="text-xs opacity-90 mt-1">
              dari {stats.totalMembers} total member
            </div>
            <Progress 
              value={(stats.activeMembers / stats.totalMembers) * 100} 
              className="mt-2 bg-green-400"
            />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Pendapatan Hari Ini</CardTitle>
            <DollarSign className="h-4 w-4 opacity-90" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp {(stats.todayRevenue / 1000).toFixed(0)}K</div>
            <div className="text-xs opacity-90 mt-1">
              Target bulanan: Rp {(stats.monthlyRevenue / 1000000).toFixed(1)}M
            </div>
            <Progress 
              value={(stats.todayRevenue / (stats.monthlyRevenue / 30)) * 100} 
              className="mt-2 bg-purple-400"
            />
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-blue-600" />
              <span>Aktivitas Terbaru</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    {activity.type === 'voucher' ? (
                      <div className="p-2 bg-blue-100 rounded-full">
                        <Ticket className="h-4 w-4 text-blue-600" />
                      </div>
                    ) : (
                      <div className="p-2 bg-green-100 rounded-full">
                        <Users className="h-4 w-4 text-green-600" />
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-sm">
                        {activity.type === 'voucher' 
                          ? `Voucher ${activity.code} (${activity.duration})`
                          : `${activity.username} - ${activity.action}`
                        }
                      </p>
                      <p className="text-xs text-gray-500">
                        {activity.type === 'voucher' ? activity.used : activity.time}
                      </p>
                    </div>
                  </div>
                  <Badge variant={activity.type === 'voucher' ? 'default' : 'secondary'}>
                    {activity.type === 'voucher' ? 'Used' : 'Member'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <span>Statistik Bulanan</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="font-medium text-blue-900">Voucher Terjual</p>
                  <p className="text-sm text-blue-600">Bulan ini</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-blue-900">2,847</p>
                  <Badge className="bg-blue-100 text-blue-800">+15%</Badge>
                </div>
              </div>

              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <div>
                  <p className="font-medium text-green-900">Member Baru</p>
                  <p className="text-sm text-green-600">Bulan ini</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-900">23</p>
                  <Badge className="bg-green-100 text-green-800">+8%</Badge>
                </div>
              </div>

              <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                <div>
                  <p className="font-medium text-purple-900">Perpanjangan Member</p>
                  <p className="text-sm text-purple-600">Bulan ini</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-purple-900">145</p>
                  <Badge className="bg-purple-100 text-purple-800">+12%</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
