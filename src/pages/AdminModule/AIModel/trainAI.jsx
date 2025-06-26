import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  Snackbar,
  Paper,
  Chip,
  IconButton,
  Divider,
  LinearProgress,
  Grid,
  CircularProgress,
  Backdrop
} from '@mui/material';
import {
  School,
  History,
  Close,
  PlayArrow,
  CheckCircle,
  Error as ErrorIcon,
  TrendingUp,
  AccessTime,
  Analytics,
  DataUsage,
  Cancel
} from '@mui/icons-material';

const AIModelTraining = () => {
  // Sample data for AI models
  const [models, setModels] = useState([
    {
      id: 1,
      name: 'Face Recognition',
      function: 'Identify and verify faces for access control',
      lastTrained: '2025-01-15',
      accuracy: '94.2%',
      status: 'ready'
    },
    {
      id: 2,
      name: 'Object Detection',
      function: 'Detect suspicious objects in surveillance footage',
      lastTrained: '2025-01-10',
      accuracy: '89.7%',
      status: 'ready'
    },
    {
      id: 3,
      name: 'Behavior Analysis',
      function: 'Analyze human behavior patterns for anomaly detection',
      lastTrained: '2025-01-08',
      accuracy: '91.5%',
      status: 'ready'
    },
    {
      id: 4,
      name: 'Audio Classification',
      function: 'Classify audio events for security monitoring',
      lastTrained: '2025-01-05',
      accuracy: '87.3%',
      status: 'ready'
    }
  ]);

  // Dialog states
  const [trainingDialogOpen, setTrainingDialogOpen] = useState(false);
  const [logHistoryDialogOpen, setLogHistoryDialogOpen] = useState(false);
  const [resultsDialogOpen, setResultsDialogOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState(null);
  
  // Training form states
  const [reportType, setReportType] = useState('both');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [algorithm, setAlgorithm] = useState('');
  
  // Training progress states
  const [isTraining, setIsTraining] = useState(false);
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [trainingStep, setTrainingStep] = useState('');
  const [trainingResults, setTrainingResults] = useState(null);
  
  // Alert states
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [trainingError, setTrainingError] = useState('');

  // Sample training logs
  const [trainingLogs] = useState([
    {
      id: 1,
      modelName: 'Face Recognition',
      timestamp: '2025-01-15 14:30:22',
      accuracy: '94.2%',
      f1Score: '0.936',
      timeTaken: '2h 15m',
      dataSource: 'UC+UA Reports (Jan 2024 - Dec 2024)',
      status: 'completed'
    },
    {
      id: 2,
      modelName: 'Face Recognition',
      timestamp: '2024-12-20 09:15:10',
      accuracy: '92.8%',
      f1Score: '0.921',
      timeTaken: '1h 45m',
      dataSource: 'UC Reports (Jun 2024 - Nov 2024)',
      status: 'completed'
    },
    {
      id: 3,
      modelName: 'Object Detection',
      timestamp: '2024-11-10 16:45:33',
      accuracy: 'N/A',
      f1Score: 'N/A',
      timeTaken: '25m',
      dataSource: 'UA Reports (Oct 2024)',
      status: 'failed'
    }
  ]);

  const algorithms = [
    'Random Forest',
    'Gradient Boosting',
    'Neural Network',
    'Support Vector Machine',
    'XGBoost',
    'Decision Tree'
  ];

  const reportTypes = [
    { value: 'uc', label: 'UC Reports Only' },
    { value: 'ua', label: 'UA Reports Only' },
    { value: 'both', label: 'UC + UA Reports' }
  ];

  useEffect(() => {
    // Set default dates (last 6 months)
    const today = new Date();
    const sixMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 6, today.getDate());
    
    setEndDate(today.toISOString().split('T')[0]);
    setStartDate(sixMonthsAgo.toISOString().split('T')[0]);
  }, []);

  const handleTrainClick = (model) => {
    setSelectedModel(model);
    setTrainingDialogOpen(true);
    setTrainingError('');
    setAlgorithm('');
    setTrainingProgress(0);
    setTrainingStep('');
    setTrainingResults(null);
    setIsTraining(false);
  };

  const handleLogHistoryClick = (model) => {
    setSelectedModel(model);
    setLogHistoryDialogOpen(true);
  };

  const simulateTraining = () => {
    const steps = [
      'Loading training data...',
      'Preprocessing data...',
      'Feature extraction...',
      'Model training in progress...',
      'Validation and testing...',
      'Finalizing model...'
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setTrainingStep(steps[currentStep]);
        setTrainingProgress(((currentStep + 1) / steps.length) * 100);
        currentStep++;
      } else {
        clearInterval(interval);
        // Simulate training completion
        const results = {
          accuracy: (88 + Math.random() * 8).toFixed(1) + '%',
          f1Score: (0.85 + Math.random() * 0.1).toFixed(3),
          timeTaken: Math.floor(Math.random() * 120 + 30) + 'm',
          dataPoints: Math.floor(Math.random() * 5000 + 1000)
        };
        setTrainingResults(results);
        setIsTraining(false);
        setResultsDialogOpen(true);
        
        // Update model accuracy
        setModels(prev => prev.map(model => 
          model.id === selectedModel.id 
            ? { ...model, accuracy: results.accuracy, lastTrained: new Date().toISOString().split('T')[0] }
            : model
        ));
      }
    }, 2000);
  };

  const handleStartTraining = () => {
    // Validation
    if (!algorithm) {
      setTrainingError('Please select an algorithm.');
      return;
    }
    
    if (!startDate || !endDate) {
      setTrainingError('Please select a valid date range.');
      return;
    }

    if (new Date(startDate) > new Date(endDate)) {
      setTrainingError('Start date must be before end date.');
      return;
    }

    // Check for no data scenario (10% chance for demo)
    if (Math.random() < 0.1) {
      setTrainingError('No training data available for the selected date range or report type.');
      return;
    }

    // Check for training failure scenario (5% chance for demo)
    if (Math.random() < 0.05) {
      setTrainingError('Model training failed. Please try again later or contact system admin.');
      return;
    }

    setIsTraining(true);
    setTrainingError('');
    simulateTraining();
  };

  const handleCancelTraining = () => {
    if (isTraining) {
      if (window.confirm('Are you sure you want to cancel training? This will stop the current training process.')) {
        setIsTraining(false);
        setTrainingProgress(0);
        setTrainingStep('');
        setTrainingDialogOpen(false);
      }
    } else {
      if (algorithm || reportType !== 'both') {
        if (window.confirm('Are you sure you want to cancel? Your selections will be lost.')) {
          setTrainingDialogOpen(false);
        }
      } else {
        setTrainingDialogOpen(false);
      }
    }
  };

  const handleViewSummary = () => {
    setResultsDialogOpen(false);
    setTrainingDialogOpen(false);
    setSnackbar({
      open: true,
      message: 'Training completed successfully. New model version saved.',
      severity: 'success'
    });
  };

  return (
    <Box sx={{ 
      p: 3, 
      fontFamily: 'Poppins, sans-serif',
      minHeight: '100vh',
      backgroundColor: '#f8f9fa'
    }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h4" 
          sx={{ 
            color: '#061978', 
            fontWeight: 600,
            fontFamily: 'Poppins, sans-serif',
            mb: 1
          }}
        >
          AI Model Training
        </Typography>
        <Typography 
          variant="subtitle1" 
          sx={{ 
            color: '#666',
            fontFamily: 'Poppins, sans-serif'
          }}
        >
          Train AI Model - Retrain models using historical UC/UA report data
        </Typography>
      </Box>

      {/* Training Dashboard */}
      <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(6, 25, 120, 0.1)' }}>
        <CardContent sx={{ p: 0 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f8f9ff' }}>
                  <TableCell sx={{ 
                    fontWeight: 600, 
                    color: '#061978',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '0.95rem'
                  }}>
                    Model Name
                  </TableCell>
                  <TableCell sx={{ 
                    fontWeight: 600, 
                    color: '#061978',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '0.95rem'
                  }}>
                    Function Description
                  </TableCell>
                  <TableCell sx={{ 
                    fontWeight: 600, 
                    color: '#061978',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '0.95rem'
                  }}>
                    Last Trained
                  </TableCell>
                  <TableCell sx={{ 
                    fontWeight: 600, 
                    color: '#061978',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '0.95rem'
                  }}>
                    Accuracy
                  </TableCell>
                  <TableCell sx={{ 
                    fontWeight: 600, 
                    color: '#061978',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '0.95rem'
                  }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {models.map((model) => (
                  <TableRow 
                    key={model.id}
                    sx={{ 
                      '&:hover': { backgroundColor: '#f8f9ff' },
                      borderBottom: '1px solid #e0e4e7'
                    }}
                  >
                    <TableCell sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}>
                      {model.name}
                    </TableCell>
                    <TableCell sx={{ 
                      fontFamily: 'Poppins, sans-serif',
                      color: '#666',
                      maxWidth: 300
                    }}>
                      {model.function}
                    </TableCell>
                    <TableCell sx={{ fontFamily: 'Poppins, sans-serif', color: '#666' }}>
                      {model.lastTrained}
                    </TableCell>
                    <TableCell sx={{ fontFamily: 'Poppins, sans-serif' }}>
                      <Chip 
                        label={model.accuracy} 
                        size="small"
                        icon={<TrendingUp sx={{ fontSize: 14 }} />}
                        sx={{ 
                          backgroundColor: '#e8f5e8',
                          color: '#2e7d32',
                          fontFamily: 'Poppins, sans-serif',
                          fontWeight: 500
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                          variant="contained"
                          size="small"
                          startIcon={<School />}
                          onClick={() => handleTrainClick(model)}
                          sx={{
                            backgroundColor: '#061978',
                            fontFamily: 'Poppins, sans-serif',
                            textTransform: 'none',
                            borderRadius: 2,
                            '&:hover': {
                              backgroundColor: '#0a2191'
                            }
                          }}
                        >
                          Train
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<History />}
                          onClick={() => handleLogHistoryClick(model)}
                          sx={{
                            color: '#061978',
                            borderColor: '#061978',
                            fontFamily: 'Poppins, sans-serif',
                            textTransform: 'none',
                            borderRadius: 2,
                            '&:hover': {
                              borderColor: '#0a2191',
                              backgroundColor: '#f8f9ff'
                            }
                          }}
                        >
                          Log History
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Training Dialog */}
      <Dialog 
        open={trainingDialogOpen} 
        onClose={handleCancelTraining}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 3 }
        }}
      >
        <DialogTitle sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          color: '#061978',
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 600
        }}>
          Train Model - {selectedModel?.name}
          <IconButton onClick={handleCancelTraining} size="small">
            <Close />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ pt: 3 }}>
          {trainingError && (
            <Alert 
              severity="error" 
              sx={{ mb: 2, fontFamily: 'Poppins, sans-serif' }}
              icon={<ErrorIcon />}
            >
              {trainingError}
            </Alert>
          )}

          {isTraining ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <CircularProgress 
                size={60} 
                sx={{ 
                  color: '#061978',
                  mb: 3
                }} 
              />
              <Typography 
                variant="h6" 
                sx={{ 
                  color: '#061978',
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 600,
                  mb: 2
                }}
              >
                Training in Progress
              </Typography>
              <Typography 
                sx={{ 
                  color: '#666',
                  fontFamily: 'Poppins, sans-serif',
                  mb: 3
                }}
              >
                {trainingStep}
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={trainingProgress}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: '#e0e4e7',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: '#061978',
                    borderRadius: 4
                  }
                }}
              />
              <Typography 
                variant="body2" 
                sx={{ 
                  color: '#666',
                  fontFamily: 'Poppins, sans-serif',
                  mt: 1
                }}
              >
                {Math.round(trainingProgress)}% Complete
              </Typography>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {/* Report Type */}
              <FormControl fullWidth>
                <InputLabel sx={{ fontFamily: 'Poppins, sans-serif' }}>Report Type</InputLabel>
                <Select
                  value={reportType}
                  label="Report Type"
                  onChange={(e) => setReportType(e.target.value)}
                  sx={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  {reportTypes.map((type) => (
                    <MenuItem 
                      key={type.value} 
                      value={type.value}
                      sx={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      {type.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Date Range */}
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Start Date"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    sx={{ 
                      '& .MuiInputBase-input': { fontFamily: 'Poppins, sans-serif' },
                      '& .MuiInputLabel-root': { fontFamily: 'Poppins, sans-serif' }
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="End Date"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    sx={{ 
                      '& .MuiInputBase-input': { fontFamily: 'Poppins, sans-serif' },
                      '& .MuiInputLabel-root': { fontFamily: 'Poppins, sans-serif' }
                    }}
                  />
                </Grid>
              </Grid>

              {/* Algorithm */}
              <FormControl fullWidth>
                <InputLabel sx={{ fontFamily: 'Poppins, sans-serif' }}>Algorithm Used</InputLabel>
                <Select
                  value={algorithm}
                  label="Algorithm Used"
                  onChange={(e) => setAlgorithm(e.target.value)}
                  sx={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  {algorithms.map((algo) => (
                    <MenuItem 
                      key={algo} 
                      value={algo}
                      sx={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      {algo}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          )}
        </DialogContent>
        {!isTraining && (
          <DialogActions sx={{ p: 3, pt: 1 }}>
            <Button 
              onClick={handleCancelTraining}
              sx={{ 
                color: '#666',
                fontFamily: 'Poppins, sans-serif',
                textTransform: 'none'
              }}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleStartTraining}
              variant="contained"
              startIcon={<PlayArrow />}
              sx={{
                backgroundColor: '#061978',
                fontFamily: 'Poppins, sans-serif',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#0a2191'
                }
              }}
            >
              Start Training
            </Button>
          </DialogActions>
        )}
      </Dialog>

      {/* Training Results Dialog */}
      <Dialog 
        open={resultsDialogOpen} 
        onClose={() => {}}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 3 }
        }}
      >
        <DialogContent sx={{ textAlign: 'center', p: 4 }}>
          <Box sx={{ 
            width: 80, 
            height: 80, 
            mx: 'auto', 
            mb: 3,
            backgroundColor: '#e8f5e8',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <CheckCircle sx={{ fontSize: 48, color: '#2e7d32' }} />
          </Box>
          <Typography 
            variant="h5" 
            sx={{ 
              color: '#061978',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 600,
              mb: 2
            }}
          >
            Training Completed!
          </Typography>
          <Typography 
            sx={{ 
              color: '#666',
              fontFamily: 'Poppins, sans-serif',
              mb: 4
            }}
          >
            Model training has been completed successfully.
          </Typography>
          
          {trainingResults && (
            <Grid container spacing={2} sx={{ mb: 4 }}>
              <Grid item xs={6}>
                <Paper sx={{ p: 2, backgroundColor: '#f8f9ff' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Analytics sx={{ fontSize: 20, color: '#061978' }} />
                    <Typography variant="body2" sx={{ color: '#666', fontFamily: 'Poppins, sans-serif' }}>
                      Accuracy
                    </Typography>
                  </Box>
                  <Typography variant="h6" sx={{ color: '#061978', fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
                    {trainingResults.accuracy}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper sx={{ p: 2, backgroundColor: '#f8f9ff' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <TrendingUp sx={{ fontSize: 20, color: '#061978' }} />
                    <Typography variant="body2" sx={{ color: '#666', fontFamily: 'Poppins, sans-serif' }}>
                      F1 Score
                    </Typography>
                  </Box>
                  <Typography variant="h6" sx={{ color: '#061978', fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
                    {trainingResults.f1Score}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper sx={{ p: 2, backgroundColor: '#f8f9ff' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <AccessTime sx={{ fontSize: 20, color: '#061978' }} />
                    <Typography variant="body2" sx={{ color: '#666', fontFamily: 'Poppins, sans-serif' }}>
                      Time Taken
                    </Typography>
                  </Box>
                  <Typography variant="h6" sx={{ color: '#061978', fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
                    {trainingResults.timeTaken}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper sx={{ p: 2, backgroundColor: '#f8f9ff' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <DataUsage sx={{ fontSize: 20, color: '#061978' }} />
                    <Typography variant="body2" sx={{ color: '#666', fontFamily: 'Poppins, sans-serif' }}>
                      Data Points
                    </Typography>
                  </Box>
                  <Typography variant="h6" sx={{ color: '#061978', fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
                    {trainingResults.dataPoints.toLocaleString()}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          )}
          
          <Button
            variant="contained"
            fullWidth
            onClick={handleViewSummary}
            sx={{
              backgroundColor: '#061978',
              fontFamily: 'Poppins, sans-serif',
              textTransform: 'none',
              py: 1.5,
              fontSize: '1rem',
              '&:hover': {
                backgroundColor: '#0a2191'
              }
            }}
          >
            View Summary
          </Button>
        </DialogContent>
      </Dialog>

      {/* Log History Dialog */}
      <Dialog 
        open={logHistoryDialogOpen} 
        onClose={() => setLogHistoryDialogOpen(false)}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 3 }
        }}
      >
        <DialogTitle sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          color: '#061978',
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 600
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <History />
            Training History - {selectedModel?.name}
          </Box>
          <IconButton onClick={() => setLogHistoryDialogOpen(false)} size="small">
            <Close />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ pt: 2 }}>
          <TableContainer component={Paper} elevation={0}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f8f9ff' }}>
                  <TableCell sx={{ 
                    fontWeight: 600, 
                    color: '#061978',
                    fontFamily: 'Poppins, sans-serif'
                  }}>
                    Timestamp
                  </TableCell>
                  <TableCell sx={{ 
                    fontWeight: 600, 
                    color: '#061978',
                    fontFamily: 'Poppins, sans-serif'
                  }}>
                    Accuracy
                  </TableCell>
                  <TableCell sx={{ 
                    fontWeight: 600, 
                    color: '#061978',
                    fontFamily: 'Poppins, sans-serif'
                  }}>
                    F1 Score
                  </TableCell>
                  <TableCell sx={{ 
                    fontWeight: 600, 
                    color: '#061978',
                    fontFamily: 'Poppins, sans-serif'
                  }}>
                    Time Taken
                  </TableCell>
                  <TableCell sx={{ 
                    fontWeight: 600, 
                    color: '#061978',
                    fontFamily: 'Poppins, sans-serif'
                  }}>
                    Data Source
                  </TableCell>
                  <TableCell sx={{ 
                    fontWeight: 600, 
                    color: '#061978',
                    fontFamily: 'Poppins, sans-serif'
                  }}>
                    Status
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {trainingLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell sx={{ fontFamily: 'Poppins, sans-serif', color: '#666' }}>
                      {log.timestamp}
                    </TableCell>
                    <TableCell sx={{ fontFamily: 'Poppins, sans-serif' }}>
                      {log.status === 'completed' ? (
                        <Chip 
                          label={log.accuracy} 
                          size="small"
                          sx={{ 
                            backgroundColor: '#e8f5e8',
                            color: '#2e7d32',
                            fontFamily: 'Poppins, sans-serif'
                          }}
                        />
                      ) : (
                        <Typography sx={{ color: '#666', fontFamily: 'Poppins, sans-serif' }}>
                          N/A
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell sx={{ fontFamily: 'Poppins, sans-serif' }}>
                      {log.status === 'completed' ? (
                        <Typography sx={{ color: '#1976d2', fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}>
                          {log.f1Score}
                        </Typography>
                      ) : (
                        <Typography sx={{ color: '#666', fontFamily: 'Poppins, sans-serif' }}>
                          N/A
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell sx={{ fontFamily: 'Poppins, sans-serif', color: '#666' }}>
                      {log.timeTaken}
                    </TableCell>
                    <TableCell sx={{ 
                      fontFamily: 'Poppins, sans-serif', 
                      color: '#666',
                      maxWidth: 200
                    }}>
                      {log.dataSource}
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={log.status === 'completed' ? 'Completed' : 'Failed'}
                        size="small"
                        sx={{ 
                          backgroundColor: log.status === 'completed' ? '#e8f5e8' : '#ffebee',
                          color: log.status === 'completed' ? '#2e7d32' : '#c62828',
                          fontFamily: 'Poppins, sans-serif',
                          fontWeight: 500
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
      </Dialog>

      {/* Success/Error Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert 
          onClose={() => setSnackbar({ ...snackbar, open: false })} 
          severity={snackbar.severity}
          sx={{ 
            fontFamily: 'Poppins, sans-serif',
            '& .MuiAlert-message': {
              fontFamily: 'Poppins, sans-serif'
            }
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AIModelTraining;