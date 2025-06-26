import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
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
  Grid,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Tab,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import {
  CloudUpload,
  Api,
  History,
  Close,
  CheckCircle,
  Error as ErrorIcon,
  FileUpload,
  Download,
  DataObject,
  Source,
  Schedule,
  Person,
  ExpandMore,
  Refresh
} from '@mui/icons-material';

const ExternalDatasetManagement = () => {
  // Dialog states
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [apiDialogOpen, setApiDialogOpen] = useState(false);
  const [historyDialogOpen, setHistoryDialogOpen] = useState(false);
  
  // Upload form states
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadDatasetType, setUploadDatasetType] = useState('');
  const [sourceDescription, setSourceDescription] = useState('');
  const [uploadError, setUploadError] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  
  // API form states
  const [apiUrl, setApiUrl] = useState('');
  const [apiDatasetType, setApiDatasetType] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [apiError, setApiError] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  
  // Alert states
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  
  // Tab state
  const [activeTab, setActiveTab] = useState(0);

  // Sample dataset history
  const [datasetHistory] = useState([
    {
      id: 1,
      timestamp: '2025-01-20 10:30:15',
      datasetType: 'UC',
      source: 'File Upload',
      sourceDetails: 'workplace_accidents_2024.csv',
      adminId: 'admin001',
      status: 'Success',
      fileSize: '2.5 MB',
      records: 15420
    },
    {
      id: 2,
      timestamp: '2025-01-19 14:45:22',
      datasetType: 'UA',
      source: 'API',
      sourceDetails: 'https://api.safety-data.org/incidents',
      adminId: 'admin002',
      status: 'Success',
      fileSize: '5.1 MB',
      records: 28350
    },
    {
      id: 3,
      timestamp: '2025-01-18 09:15:33',
      datasetType: 'UC',
      source: 'API',
      sourceDetails: 'https://api.osha.gov/enforcement',
      adminId: 'admin001',
      status: 'Failed',
      fileSize: '-',
      records: 0
    },
    {
      id: 4,
      timestamp: '2025-01-17 16:20:10',
      datasetType: 'UA',
      source: 'File Upload',
      sourceDetails: 'safety_reports_q4.xlsx',
      adminId: 'admin003',
      status: 'Success',
      fileSize: '1.8 MB',
      records: 8750
    }
  ]);

  const datasetTypes = [
    { value: 'uc', label: 'UC (Unsafe Conditions)' },
    { value: 'ua', label: 'UA (Unsafe Acts)' }
  ];

  const sampleApiEndpoints = [
    'https://api.osha.gov/enforcement',
    'https://api.safety-data.org/incidents',
    'https://data.gov/safety/workplace',
    'https://api.bls.gov/injuries'
  ];

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file format
      const validExtensions = ['.csv', '.xlsx', '.json'];
      const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
      
      if (!validExtensions.includes(fileExtension)) {
        setUploadError('Unsupported file format. Please select CSV, XLSX, or JSON files only.');
        setSelectedFile(null);
        return;
      }
      
      setSelectedFile(file);
      setUploadError('');
    }
  };

  const handleUploadSubmit = () => {
    // Validation
    if (!selectedFile) {
      setUploadError('Please select a file to upload.');
      return;
    }
    
    if (!uploadDatasetType) {
      setUploadError('Please select a dataset type.');
      return;
    }
    
    if (!sourceDescription.trim()) {
      setUploadError('Please provide a source description.');
      return;
    }

    setIsUploading(true);
    setUploadError('');
    
    // Simulate upload process
    setTimeout(() => {
      setIsUploading(false);
      setUploadDialogOpen(false);
      setSnackbar({
        open: true,
        message: 'Dataset successfully uploaded.',
        severity: 'success'
      });
      
      // Reset form
      setSelectedFile(null);
      setUploadDatasetType('');
      setSourceDescription('');
    }, 3000);
  };

  const handleApiSubmit = () => {
    // Validation
    if (!apiUrl.trim()) {
      setApiError('Please provide an API URL.');
      return;
    }
    
    if (!apiDatasetType) {
      setApiError('Please select a dataset type.');
      return;
    }

    // Basic URL validation
    try {
      new URL(apiUrl);
    } catch {
      setApiError('Please enter a valid URL.');
      return;
    }

    setIsFetching(true);
    setApiError('');
    
    // Simulate API fetch with random success/failure
    setTimeout(() => {
      setIsFetching(false);
      
      // 80% success rate for demo
      if (Math.random() < 0.8) {
        setApiDialogOpen(false);
        setSnackbar({
          open: true,
          message: 'Dataset successfully retrieved from API.',
          severity: 'success'
        });
        
        // Reset form
        setApiUrl('');
        setApiDatasetType('');
        setApiKey('');
      } else {
        setApiError('Unable to retrieve dataset. Check API URL or try again later.');
      }
    }, 4000);
  };

  const handleCancelUpload = () => {
    if (selectedFile || uploadDatasetType || sourceDescription) {
      if (window.confirm('Are you sure you want to cancel upload dataset?')) {
        setUploadDialogOpen(false);
        setSelectedFile(null);
        setUploadDatasetType('');
        setSourceDescription('');
        setUploadError('');
      }
    } else {
      setUploadDialogOpen(false);
    }
  };

  const handleCancelApi = () => {
    if (apiUrl || apiDatasetType || apiKey) {
      if (window.confirm('Are you sure you want to cancel?')) {
        setApiDialogOpen(false);
        setApiUrl('');
        setApiDatasetType('');
        setApiKey('');
        setApiError('');
      }
    } else {
      setApiDialogOpen(false);
    }
  };

  const TabPanel = ({ children, value, index }) => (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );

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
          External Dataset Management
        </Typography>
        <Typography 
          variant="subtitle1" 
          sx={{ 
            color: '#666',
            fontFamily: 'Poppins, sans-serif'
          }}
        >
          Retrieve External Safety Dataset - Enhance training data from trusted sources
        </Typography>
      </Box>

      {/* Main Dashboard */}
      <Grid container spacing={3}>
        {/* Upload Dataset Card */}
        <Grid item xs={12} md={4}>
          <Card sx={{ 
            borderRadius: 3, 
            boxShadow: '0 4px 20px rgba(6, 25, 120, 0.1)',
            height: '100%',
            transition: 'transform 0.2s, box-shadow 0.2s',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 8px 30px rgba(6, 25, 120, 0.15)'
            }
          }}>
            <CardContent sx={{ p: 4, textAlign: 'center' }}>
              <Box sx={{ 
                width: 80, 
                height: 80, 
                mx: 'auto', 
                mb: 3,
                backgroundColor: '#f8f9ff',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <CloudUpload sx={{ fontSize: 40, color: '#061978' }} />
              </Box>
              <Typography 
                variant="h6" 
                sx={{ 
                  color: '#061978',
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 600,
                  mb: 2
                }}
              >
                Upload Dataset
              </Typography>
              <Typography 
                sx={{ 
                  color: '#666',
                  fontFamily: 'Poppins, sans-serif',
                  mb: 3,
                  lineHeight: 1.6
                }}
              >
                Upload CSV, XLSX, or JSON files containing safety-related data to enhance AI training.
              </Typography>
              <Button
                variant="contained"
                fullWidth
                startIcon={<FileUpload />}
                onClick={() => setUploadDialogOpen(true)}
                sx={{
                  backgroundColor: '#061978',
                  fontFamily: 'Poppins, sans-serif',
                  textTransform: 'none',
                  py: 1.5,
                  '&:hover': {
                    backgroundColor: '#0a2191'
                  }
                }}
              >
                Upload Dataset
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Fetch from API Card */}
        <Grid item xs={12} md={4}>
          <Card sx={{ 
            borderRadius: 3, 
            boxShadow: '0 4px 20px rgba(6, 25, 120, 0.1)',
            height: '100%',
            transition: 'transform 0.2s, box-shadow 0.2s',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 8px 30px rgba(6, 25, 120, 0.15)'
            }
          }}>
            <CardContent sx={{ p: 4, textAlign: 'center' }}>
              <Box sx={{ 
                width: 80, 
                height: 80, 
                mx: 'auto', 
                mb: 3,
                backgroundColor: '#f8f9ff',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Api sx={{ fontSize: 40, color: '#061978' }} />
              </Box>
              <Typography 
                variant="h6" 
                sx={{ 
                  color: '#061978',
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 600,
                  mb: 2
                }}
              >
                Fetch from API
              </Typography>
              <Typography 
                sx={{ 
                  color: '#666',
                  fontFamily: 'Poppins, sans-serif',
                  mb: 3,
                  lineHeight: 1.6
                }}
              >
                Connect to external safety data APIs to automatically retrieve and import datasets.
              </Typography>
              <Button
                variant="contained"
                fullWidth
                startIcon={<Download />}
                onClick={() => setApiDialogOpen(true)}
                sx={{
                  backgroundColor: '#061978',
                  fontFamily: 'Poppins, sans-serif',
                  textTransform: 'none',
                  py: 1.5,
                  '&:hover': {
                    backgroundColor: '#0a2191'
                  }
                }}
              >
                Fetch from API
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* View Dataset History Card */}
        <Grid item xs={12} md={4}>
          <Card sx={{ 
            borderRadius: 3, 
            boxShadow: '0 4px 20px rgba(6, 25, 120, 0.1)',
            height: '100%',
            transition: 'transform 0.2s, box-shadow 0.2s',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 8px 30px rgba(6, 25, 120, 0.15)'
            }
          }}>
            <CardContent sx={{ p: 4, textAlign: 'center' }}>
              <Box sx={{ 
                width: 80, 
                height: 80, 
                mx: 'auto', 
                mb: 3,
                backgroundColor: '#f8f9ff',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <History sx={{ fontSize: 40, color: '#061978' }} />
              </Box>
              <Typography 
                variant="h6" 
                sx={{ 
                  color: '#061978',
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 600,
                  mb: 2
                }}
              >
                Dataset History
              </Typography>
              <Typography 
                sx={{ 
                  color: '#666',
                  fontFamily: 'Poppins, sans-serif',
                  mb: 3,
                  lineHeight: 1.6
                }}
              >
                View complete history of all imported datasets with detailed logs and metadata.
              </Typography>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<History />}
                onClick={() => setHistoryDialogOpen(true)}
                sx={{
                  color: '#061978',
                  borderColor: '#061978',
                  fontFamily: 'Poppins, sans-serif',
                  textTransform: 'none',
                  py: 1.5,
                  '&:hover': {
                    borderColor: '#0a2191',
                    backgroundColor: '#f8f9ff'
                  }
                }}
              >
                View History
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Activity Section */}
      <Card sx={{ 
        borderRadius: 3, 
        boxShadow: '0 4px 20px rgba(6, 25, 120, 0.1)',
        mt: 4
      }}>
        <CardContent>
          <Typography 
            variant="h6" 
            sx={{ 
              color: '#061978',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 600,
              mb: 3
            }}
          >
            Recent Dataset Activity
          </Typography>
          <Grid container spacing={2}>
            {datasetHistory.slice(0, 3).map((item) => (
              <Grid item xs={12} md={4} key={item.id}>
                <Paper sx={{ 
                  p: 3, 
                  borderRadius: 2,
                  backgroundColor: '#f8f9ff',
                  border: '1px solid #e3f2fd'
                }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Chip 
                      label={item.datasetType}
                      size="small"
                      sx={{ 
                        backgroundColor: '#061978',
                        color: 'white',
                        fontFamily: 'Poppins, sans-serif',
                        fontWeight: 500
                      }}
                    />
                    <Chip 
                      label={item.status}
                      size="small"
                      sx={{ 
                        backgroundColor: item.status === 'Success' ? '#e8f5e8' : '#ffebee',
                        color: item.status === 'Success' ? '#2e7d32' : '#c62828',
                        fontFamily: 'Poppins, sans-serif'
                      }}
                    />
                  </Box>
                  <Typography 
                    variant="subtitle2" 
                    sx={{ 
                      fontFamily: 'Poppins, sans-serif',
                      fontWeight: 500,
                      mb: 1
                    }}
                  >
                    {item.source}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: '#666',
                      fontFamily: 'Poppins, sans-serif',
                      mb: 1
                    }}
                  >
                    {item.sourceDetails}
                  </Typography>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: '#999',
                      fontFamily: 'Poppins, sans-serif'
                    }}
                  >
                    {item.timestamp}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* Upload Dialog */}
      <Dialog 
        open={uploadDialogOpen} 
        onClose={handleCancelUpload}
        maxWidth="sm"
        fullWidth
        slotProps={{
          paper: { sx: { borderRadius: 3 } }
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
          Upload Dataset
          <IconButton onClick={handleCancelUpload} size="small">
            <Close />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ pt: 3 }}>
          {uploadError && (
            <Alert 
              severity="error" 
              sx={{ mb: 2, fontFamily: 'Poppins, sans-serif' }}
              icon={<ErrorIcon />}
            >
              {uploadError}
            </Alert>
          )}

          {isUploading ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  color: '#061978',
                  fontFamily: 'Poppins, sans-serif',
                  mb: 2
                }}
              >
                Uploading Dataset...
              </Typography>
              <LinearProgress 
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
                  mt: 2
                }}
              >
                Validating file format and saving to database...
              </Typography>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {/* File Upload */}
              <Box>
                <Typography sx={{ 
                  mb: 1, 
                  fontWeight: 500,
                  color: '#061978',
                  fontFamily: 'Poppins, sans-serif'
                }}>
                  Select Dataset File *
                </Typography>
                <Button
                  variant="outlined"
                  component="label"
                  fullWidth
                  startIcon={<FileUpload />}
                  sx={{
                    height: 80,
                    borderStyle: 'dashed',
                    borderWidth: 2,
                    borderColor: selectedFile ? '#4caf50' : '#061978',
                    color: selectedFile ? '#4caf50' : '#061978',
                    fontFamily: 'Poppins, sans-serif',
                    textTransform: 'none',
                    '&:hover': {
                      backgroundColor: '#f8f9ff',
                      borderColor: '#0a2191'
                    }
                  }}
                >
                  {selectedFile ? `Selected: ${selectedFile.name}` : 'Choose Dataset File (CSV, XLSX, JSON)'}
                  <input
                    type="file"
                    hidden
                    accept=".csv,.xlsx,.json"
                    onChange={handleFileChange}
                  />
                </Button>
              </Box>

              {/* Dataset Type */}
              <FormControl fullWidth>
                <InputLabel sx={{ fontFamily: 'Poppins, sans-serif' }}>Dataset Type *</InputLabel>
                <Select
                  value={uploadDatasetType}
                  label="Dataset Type *"
                  onChange={(e) => setUploadDatasetType(e.target.value)}
                  sx={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  {datasetTypes.map((type) => (
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

              {/* Source Description */}
              <TextField
                fullWidth
                label="Source Description *"
                multiline
                rows={3}
                value={sourceDescription}
                onChange={(e) => setSourceDescription(e.target.value)}
                placeholder="Describe the dataset source, content, and any relevant details..."
                sx={{ 
                  '& .MuiInputBase-input': { fontFamily: 'Poppins, sans-serif' },
                  '& .MuiInputLabel-root': { fontFamily: 'Poppins, sans-serif' }
                }}
              />
            </Box>
          )}
        </DialogContent>
        {!isUploading && (
          <DialogActions sx={{ p: 3, pt: 1 }}>
            <Button 
              onClick={handleCancelUpload}
              sx={{ 
                color: '#666',
                fontFamily: 'Poppins, sans-serif',
                textTransform: 'none'
              }}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleUploadSubmit}
              variant="contained"
              startIcon={<CheckCircle />}
              sx={{
                backgroundColor: '#061978',
                fontFamily: 'Poppins, sans-serif',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#0a2191'
                }
              }}
            >
              Submit
            </Button>
          </DialogActions>
        )}
      </Dialog>

      {/* API Dialog */}
      <Dialog 
        open={apiDialogOpen} 
        onClose={handleCancelApi}
        maxWidth="md"
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
          Fetch Dataset from API
          <IconButton onClick={handleCancelApi} size="small">
            <Close />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ pt: 3 }}>
          {apiError && (
            <Alert 
              severity="error" 
              sx={{ mb: 2, fontFamily: 'Poppins, sans-serif' }}
              icon={<ErrorIcon />}
            >
              {apiError}
            </Alert>
          )}

          <Tabs 
            value={activeTab} 
            onChange={(_, newValue) => setActiveTab(newValue)}
            sx={{ 
              mb: 3,
              '& .MuiTab-root': {
                fontFamily: 'Poppins, sans-serif',
                textTransform: 'none'
              }
            }}
          >
            <Tab label="Manual Entry" />
            <Tab label="Sample Endpoints" />
          </Tabs>

          <TabPanel value={activeTab} index={0}>
            {isFetching ? (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    color: '#061978',
                    fontFamily: 'Poppins, sans-serif',
                    mb: 2
                  }}
                >
                  Fetching Dataset from API...
                </Typography>
                <LinearProgress 
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
                    mt: 2
                  }}
                >
                  Validating API response and importing data...
                </Typography>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {/* API URL */}
                <TextField
                  fullWidth
                  label="API URL *"
                  value={apiUrl}
                  onChange={(e) => setApiUrl(e.target.value)}
                  placeholder="https://api.example.com/safety-data"
                  sx={{ 
                    '& .MuiInputBase-input': { fontFamily: 'Poppins, sans-serif' },
                    '& .MuiInputLabel-root': { fontFamily: 'Poppins, sans-serif' }
                  }}
                />

                {/* Dataset Type */}
                <FormControl fullWidth>
                  <InputLabel sx={{ fontFamily: 'Poppins, sans-serif' }}>Dataset Type *</InputLabel>
                  <Select
                    value={apiDatasetType}
                    label="Dataset Type *"
                    onChange={(e) => setApiDatasetType(e.target.value)}
                    sx={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    {datasetTypes.map((type) => (
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

                {/* API Key */}
                <TextField
                  fullWidth
                  label="API Key (Optional)"
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Enter API key if required"
                  sx={{ 
                    '& .MuiInputBase-input': { fontFamily: 'Poppins, sans-serif' },
                    '& .MuiInputLabel-root': { fontFamily: 'Poppins, sans-serif' }
                  }}
                />
              </Box>
            )}
          </TabPanel>

          <TabPanel value={activeTab} index={1}>
            <Typography 
              variant="h6" 
              sx={{ 
                color: '#061978',
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 600,
                mb: 2
              }}
            >
              Popular Safety Data APIs
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {sampleApiEndpoints.map((endpoint, index) => (
                <Accordion key={index} sx={{ borderRadius: 2, '&:before': { display: 'none' } }}>
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}>
                      {endpoint}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body2" sx={{ color: '#666', fontFamily: 'Poppins, sans-serif' }}>
                        Click to use this endpoint
                      </Typography>
                      <Button
                        size="small"
                        onClick={() => {
                          setApiUrl(endpoint);
                          setActiveTab(0);
                        }}
                        sx={{
                          color: '#061978',
                          fontFamily: 'Poppins, sans-serif',
                          textTransform: 'none'
                        }}
                      >
                        Use This API
                      </Button>
                    </Box>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          </TabPanel>
        </DialogContent>
        {!isFetching && (
          <DialogActions sx={{ p: 3, pt: 1 }}>
            <Button 
              onClick={handleCancelApi}
              sx={{ 
                color: '#666',
                fontFamily: 'Poppins, sans-serif',
                textTransform: 'none'
              }}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleApiSubmit}
              variant="contained"
              startIcon={<Refresh />}
              sx={{
                backgroundColor: '#061978',
                fontFamily: 'Poppins, sans-serif',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#0a2191'
                }
              }}
            >
              Fetch Dataset
            </Button>
          </DialogActions>
        )}
      </Dialog>

      {/* History Dialog */}
      <Dialog 
        open={historyDialogOpen} 
        onClose={() => setHistoryDialogOpen(false)}
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
            Dataset Import History
          </Box>
          <IconButton onClick={() => setHistoryDialogOpen(false)} size="small">
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
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Schedule sx={{ fontSize: 18 }} />
                      Timestamp
                    </Box>
                  </TableCell>
                  <TableCell sx={{ 
                    fontWeight: 600, 
                    color: '#061978',
                    fontFamily: 'Poppins, sans-serif'
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <DataObject sx={{ fontSize: 18 }} />
                      Dataset Type
                    </Box>
                  </TableCell>
                  <TableCell sx={{ 
                    fontWeight: 600, 
                    color: '#061978',
                    fontFamily: 'Poppins, sans-serif'
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Source sx={{ fontSize: 18 }} />
                      Source
                    </Box>
                  </TableCell>
                  <TableCell sx={{ 
                    fontWeight: 600, 
                    color: '#061978',
                    fontFamily: 'Poppins, sans-serif'
                  }}>
                    Source Details
                  </TableCell>
                  <TableCell sx={{ 
                    fontWeight: 600, 
                    color: '#061978',
                    fontFamily: 'Poppins, sans-serif'
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Person sx={{ fontSize: 18 }} />
                      Admin ID
                    </Box>
                  </TableCell>
                  <TableCell sx={{ 
                    fontWeight: 600, 
                    color: '#061978',
                    fontFamily: 'Poppins, sans-serif'
                  }}>
                    File Size
                  </TableCell>
                  <TableCell sx={{ 
                    fontWeight: 600, 
                    color: '#061978',
                    fontFamily: 'Poppins, sans-serif'
                  }}>
                    Records
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
                {datasetHistory.map((item) => (
                  <TableRow key={item.id} sx={{ '&:hover': { backgroundColor: '#f8f9ff' } }}>
                    <TableCell sx={{ fontFamily: 'Poppins, sans-serif', color: '#666' }}>
                      {item.timestamp}
                    </TableCell>
                    <TableCell sx={{ fontFamily: 'Poppins, sans-serif' }}>
                      <Chip 
                        label={item.datasetType}
                        size="small"
                        sx={{ 
                          backgroundColor: item.datasetType === 'UC' ? '#e3f2fd' : '#f3e5f5',
                          color: item.datasetType === 'UC' ? '#1976d2' : '#7b1fa2',
                          fontFamily: 'Poppins, sans-serif',
                          fontWeight: 500
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ fontFamily: 'Poppins, sans-serif' }}>
                      <Chip 
                        label={item.source}
                        size="small"
                        variant="outlined"
                        sx={{ 
                          borderColor: '#061978',
                          color: '#061978',
                          fontFamily: 'Poppins, sans-serif'
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ 
                      fontFamily: 'Poppins, sans-serif', 
                      color: '#666',
                      maxWidth: 200,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>
                      {item.sourceDetails}
                    </TableCell>
                    <TableCell sx={{ fontFamily: 'Poppins, sans-serif', color: '#666' }}>
                      {item.adminId}
                    </TableCell>
                    <TableCell sx={{ fontFamily: 'Poppins, sans-serif', color: '#666' }}>
                      {item.fileSize}
                    </TableCell>
                    <TableCell sx={{ fontFamily: 'Poppins, sans-serif', color: '#666' }}>
                      {item.records.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={item.status}
                        size="small"
                        icon={item.status === 'Success' ? <CheckCircle sx={{ fontSize: 14 }} /> : <ErrorIcon sx={{ fontSize: 14 }} />}
                        sx={{ 
                          backgroundColor: item.status === 'Success' ? '#e8f5e8' : '#ffebee',
                          color: item.status === 'Success' ? '#2e7d32' : '#c62828',
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
          
          {/* Summary Statistics */}
          <Box sx={{ mt: 4, p: 3, backgroundColor: '#f8f9ff', borderRadius: 2 }}>
            <Typography 
              variant="h6" 
              sx={{ 
                color: '#061978',
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 600,
                mb: 2
              }}
            >
              Import Summary
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography 
                    variant="h4" 
                    sx={{ 
                      color: '#061978',
                      fontFamily: 'Poppins, sans-serif',
                      fontWeight: 600
                    }}
                  >
                    {datasetHistory.length}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: '#666',
                      fontFamily: 'Poppins, sans-serif'
                    }}
                  >
                    Total Imports
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography 
                    variant="h4" 
                    sx={{ 
                      color: '#2e7d32',
                      fontFamily: 'Poppins, sans-serif',
                      fontWeight: 600
                    }}
                  >
                    {datasetHistory.filter(item => item.status === 'Success').length}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: '#666',
                      fontFamily: 'Poppins, sans-serif'
                    }}
                  >
                    Successful
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography 
                    variant="h4" 
                    sx={{ 
                      color: '#c62828',
                      fontFamily: 'Poppins, sans-serif',
                      fontWeight: 600
                    }}
                  >
                    {datasetHistory.filter(item => item.status === 'Failed').length}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: '#666',
                      fontFamily: 'Poppins, sans-serif'
                    }}
                  >
                    Failed
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography 
                    variant="h4" 
                    sx={{ 
                      color: '#1976d2',
                      fontFamily: 'Poppins, sans-serif',
                      fontWeight: 600
                    }}
                  >
                    {datasetHistory.filter(item => item.status === 'Success').reduce((sum, item) => sum + item.records, 0).toLocaleString()}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: '#666',
                      fontFamily: 'Poppins, sans-serif'
                    }}
                  >
                    Total Records
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
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

export default ExternalDatasetManagement;