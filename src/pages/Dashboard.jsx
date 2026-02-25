import { motion } from 'framer-motion';
import DashboardLayout from '../components/layout/DashboardLayout';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Avatar,
  LinearProgress,
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PeopleIcon from '@mui/icons-material/People';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Users',
      value: '1,234',
      change: '+12.5%',
      trend: 'up',
      icon: <PeopleIcon sx={{ fontSize: 32 }} />,
      color: 'text-primary-600',
      bgColor: 'bg-primary-50',
    },
    {
      title: 'Active Locations',
      value: '856',
      change: '+8.2%',
      trend: 'up',
      icon: <LocationOnIcon sx={{ fontSize: 32 }} />,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Total Distance',
      value: '12.5K',
      unit: 'km',
      change: '+15.3%',
      trend: 'up',
      icon: <TrendingUpIcon sx={{ fontSize: 32 }} />,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Avg. Response Time',
      value: '2.4',
      unit: 'min',
      change: '-5.1%',
      trend: 'down',
      icon: <AccessTimeIcon sx={{ fontSize: 32 }} />,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  const recentActivities = [
    { user: 'John Doe', action: 'Checked in', location: 'Office Building A', time: '2 min ago' },
    { user: 'Jane Smith', action: 'Checked out', location: 'Client Site B', time: '15 min ago' },
    { user: 'Mike Johnson', action: 'Location updated', location: 'Warehouse C', time: '32 min ago' },
    { user: 'Sarah Williams', action: 'Checked in', location: 'Office Building A', time: '1 hour ago' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h4" className="font-bold text-gray-900 mb-2">
            Dashboard
          </Typography>
          <Typography variant="body1" className="text-gray-600">
            Welcome back! Here's what's happening with your team today.
          </Typography>
        </motion.div>

        {/* Stats Grid */}
        <Grid container spacing={3}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} lg={3} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardContent>
                    <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                      <Box
                        className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center ${stat.color}`}
                      >
                        {stat.icon}
                      </Box>
                      <Box
                        className={`flex items-center space-x-1 ${
                          stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        {stat.trend === 'up' ? (
                          <ArrowUpwardIcon sx={{ fontSize: 16 }} />
                        ) : (
                          <ArrowDownwardIcon sx={{ fontSize: 16 }} />
                        )}
                        <Typography variant="caption" className="font-medium">
                          {stat.change}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="h4" className="font-bold text-gray-900 mb-1">
                      {stat.value}
                      {stat.unit && (
                        <span className="text-lg text-gray-500 ml-1">{stat.unit}</span>
                      )}
                    </Typography>
                    <Typography variant="body2" className="text-gray-600">
                      {stat.title}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Charts and Activities Row */}
        <Grid container spacing={3}>
          {/* Chart Card */}
          <Grid item xs={12} lg={8}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card>
                <CardContent>
                  <Typography variant="h6" className="font-semibold mb-4">
                    Activity Overview
                  </Typography>
                  <Box className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <Typography variant="body2" className="text-gray-500">
                      Chart component will be integrated here
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          {/* Recent Activities */}
          <Grid item xs={12} lg={4}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Card>
                <CardContent>
                  <Typography variant="h6" className="font-semibold mb-4">
                    Recent Activities
                  </Typography>
                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                        className="flex items-start space-x-3 pb-4 border-b border-gray-100 last:border-0"
                      >
                        <Avatar className="bg-primary-100 text-primary-600">
                          {activity.user.charAt(0)}
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <Typography variant="body2" className="font-medium text-gray-900">
                            {activity.user}
                          </Typography>
                          <Typography variant="body2" className="text-gray-600">
                            {activity.action} at {activity.location}
                          </Typography>
                          <Typography variant="caption" className="text-gray-500">
                            {activity.time}
                          </Typography>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>

        {/* Progress Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card>
            <CardContent>
              <Typography variant="h6" className="font-semibold mb-4">
                Team Performance
              </Typography>
              <div className="space-y-4">
                {[
                  { label: 'On-Time Arrivals', value: 85 },
                  { label: 'Active Users', value: 72 },
                  { label: 'Route Optimization', value: 91 },
                ].map((item, index) => (
                  <div key={index}>
                    <Box display="flex" justifyContent="space-between" mb={1}>
                      <Typography variant="body2" className="font-medium">
                        {item.label}
                      </Typography>
                      <Typography variant="body2" className="text-gray-600">
                        {item.value}%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={item.value}
                      className="h-2 rounded-full"
                      sx={{
                        backgroundColor: '#e5e7eb',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: '#14b8a6',
                          borderRadius: '4px',
                        },
                      }}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;

