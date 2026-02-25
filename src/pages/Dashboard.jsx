import { motion } from 'framer-motion';
import DashboardLayout from '../components/layout/DashboardLayout';
import ScrollToTopButton from '../components/common/ScrollToTopButton';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Avatar,
  LinearProgress,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PeopleIcon from '@mui/icons-material/People';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import RefreshIcon from '@mui/icons-material/Refresh';

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Team Members',
      value: '1,234',
      change: '+12.5%',
      trend: 'up',
      icon: <PeopleIcon />,
      color: '#0ea5e9', // sky
      lightColor: '#e0f2fe',
    },
    {
      title: 'Live Locations',
      value: '856',
      change: '+8.2%',
      trend: 'up',
      icon: <LocationOnIcon />,
      color: '#10b981', // emerald
      lightColor: '#ecfdf5',
    },
    {
      title: 'Total Distance',
      value: '12,450',
      unit: 'km',
      change: '+15.3%',
      trend: 'up',
      icon: <TrendingUpIcon />,
      color: '#8b5cf6', // violet
      lightColor: '#f3e8ff',
    },
    {
      title: 'Avg Response Time',
      value: '2.4',
      unit: 'min',
      change: '-5.1%',
      trend: 'down',
      icon: <AccessTimeIcon />,
      color: '#f59e0b', // amber
      lightColor: '#fffbeb',
    },
  ];

  const recentActivities = [
    { user: 'John Doe', action: 'Checked in', location: 'Office Building A', time: '2 min ago', avatarBg: '#0ea5e9' },
    { user: 'Jane Smith', action: 'Checked out', location: 'Client Site B', time: '15 min ago', avatarBg: '#10b981' },
    { user: 'Mike Johnson', action: 'Location updated', location: 'Warehouse C', time: '32 min ago', avatarBg: '#8b5cf6' },
    { user: 'Sarah Williams', action: 'Checked in', location: 'Office Building A', time: '1 hr ago', avatarBg: '#ec4899' },
  ];

  const performanceMetrics = [
    { label: 'On-Time Arrivals', value: 85, color: '#10b981' },
    { label: 'Active Users Today', value: 72, color: '#0ea5e9' },
    { label: 'Route Efficiency', value: 91, color: '#8b5cf6' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6 md:space-y-8 pb-8">
        {/* Header + quick actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <Typography variant="h4" fontWeight={700} color="text.primary">
              Dashboard
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={0.5}>
              Overview • Last updated just now
            </Typography>
          </div>

          <div className="flex items-center gap-3">
            <Chip
              icon={<CalendarTodayIcon />}
              label="Today"
              variant="outlined"
              size="small"
              sx={{ borderRadius: '9999px' }}
            />
            <Tooltip title="Refresh data">
              <IconButton size="small" color="primary">
                <RefreshIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </div>
        </div>

        {/* Stats Cards */}
        <Grid container spacing={3}>
          {stats.map((stat, index) => (
            <Grid item xs={6} sm={6} md={3} key={stat.title}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              >
                <Card
                  elevation={0}
                  sx={{
                    borderRadius: 3,
                    border: '1px solid',
                    borderColor: 'divider',
                    overflow: 'hidden',
                    transition: 'all 0.2s',
                    '&:hover': { boxShadow: '0 10px 25px -5px rgba(0,0,0,0.08)' },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                      <Box
                        sx={{
                          width: 52,
                          height: 52,
                          borderRadius: 2,
                          bgcolor: stat.lightColor,
                          color: stat.color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {stat.icon}
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        {stat.trend === 'up' ? (
                          <ArrowUpwardIcon sx={{ fontSize: 16, color: 'success.main' }} />
                        ) : (
                          <ArrowDownwardIcon sx={{ fontSize: 16, color: 'error.main' }} />
                        )}
                        <Typography
                          variant="caption"
                          fontWeight={600}
                          color={stat.trend === 'up' ? 'success.main' : 'error.main'}
                        >
                          {stat.change}
                        </Typography>
                      </Box>
                    </Box>

                    <Typography variant="h4" fontWeight={700} color="text.primary" lineHeight={1.1}>
                      {stat.value}
                      {stat.unit && <span style={{ fontSize: '0.65em', opacity: 0.6 }}> {stat.unit}</span>}
                    </Typography>

                    <Typography variant="body2" color="text.secondary" mt={0.5}>
                      {stat.title}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Main content row */}
        <Grid container spacing={3}>
          {/* Chart area – prepared for real chart (Recharts / ApexCharts / etc.) */}
          <Grid item xs={12} lg={8}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card
                elevation={0}
                sx={{
                  borderRadius: 3,
                  border: '1px solid',
                  borderColor: 'divider',
                  height: '100%',
                }}
              >
                <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h6" fontWeight={600}>
                      Team Activity Overview
                    </Typography>
                    <Chip label="Last 7 days" size="small" variant="outlined" />
                  </Box>

                  <Box sx={{ flexGrow: 1, minHeight: 320, position: 'relative' }}>
                    <Box
                      sx={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: 'action.hover',
                        borderRadius: 2,
                      }}
                    >
                      <Typography color="text.secondary">
                        {/* Replace with: <LineChart /> / <AreaChart /> / <BarChart /> */}
                        Interactive chart will be placed here (Recharts / ApexCharts recommended)
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          {/* Recent Activities – improved readability */}
          <Grid item xs={12} lg={4}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card
                elevation={0}
                sx={{
                  borderRadius: 3,
                  border: '1px solid',
                  borderColor: 'divider',
                  height: '100%',
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" fontWeight={600} mb={3}>
                    Recent Activity
                  </Typography>

                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                    {recentActivities.map((act, i) => (
                      <Box
                        key={i}
                        sx={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: 2,
                          py: 1,
                          px: 1.5,
                          borderRadius: 2,
                          transition: 'all 0.15s',
                          '&:hover': { bgcolor: 'action.hover' },
                        }}
                      >
                        <Avatar sx={{ bgcolor: act.avatarBg, width: 42, height: 42 }}>
                          {act.user.charAt(0)}
                        </Avatar>

                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Typography variant="subtitle2" fontWeight={600} noWrap>
                            {act.user}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" noWrap>
                            {act.action} • {act.location}
                          </Typography>
                          <Typography variant="caption" color="text.disabled">
                            {act.time}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>

        {/* Performance section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <Card
            elevation={0}
            sx={{
              borderRadius: 3,
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} mb={3}>
                Team Performance Snapshot
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {performanceMetrics.map((item) => (
                  <Box key={item.label}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Typography variant="body2" fontWeight={500}>
                        {item.label}
                      </Typography>
                      <Typography variant="body2" fontWeight={600} color={`${item.color}`}>
                        {item.value}%
                      </Typography>
                    </Box>

                    <LinearProgress
                      variant="determinate"
                      value={item.value}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        bgcolor: 'grey.100',
                        '& .MuiLinearProgress-bar': {
                          bgcolor: item.color,
                          borderRadius: 4,
                        },
                      }}
                    />
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <ScrollToTopButton />
    </DashboardLayout>
  );
};

export default Dashboard;