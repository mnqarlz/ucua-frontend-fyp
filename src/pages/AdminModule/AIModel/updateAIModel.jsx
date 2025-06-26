import React, { useState } from 'react';
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
  Divider
} from '@mui/material';
import {
  CloudUpload,
  History,
  Close,
  FileUpload,
  Info,
  CheckCircle,
  Error as ErrorIcon
} from '@mui/icons-material';

const AIModelManagement = () => {
  // Sample data for AI models
  const [models, setModels] = useState([
    {
      id: 1,
      name: 'Face Recognition',
      function: 'Identify and verify faces for access control',
      version: 'v2.1.0',
      algorithm: 'CNN-ResNet50',
      lastUpdated: '2025-01-15'
    },
    {
      id: 2,
      name: 'Object Detection',
      function: 'Detect suspicious objects in surveillance footage',
      version: 'v1.8.3',
      algorithm: 'YOLO v8',
      lastUpdated: '2025-01-10'
    },
    {
      id: 3,
      name: 'Behavior Analysis',
      function: 'Analyze human behavior patterns for anomaly detection',
      version: 'v3.0.1',
      algorithm: 'Transformer-LSTM',
      lastUpdated: '2025-01-08'
    },
    {
      id: 4,
      name: 'Audio Classification',
      function: 'Classify audio events for security monitoring',
      version: 'v1.5.2',
      algorithm: 'Mel-CNN',
      lastUpdated: '2025-01-05'
    }
  ]);

  // Dialog states
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [logHistoryDialogOpen, setLogHistoryDialogOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState(null);
  
  // Form states
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('');
  const [notes, setNotes] = useState('');
  
  // Alert states
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [uploadError, setUploadError] = useState('');

  // Sample log history data
  const [logHistory] = useState([
    {
      id: 1,
      version: 'v2.1.0',
      algorithm: 'CNN-ResNet50',
      timestamp: '2025-01-15 14:30:22',
      adminId: 'admin001',
      notes: 'Updated model for better accuracy in low light conditions'
    },
    {
      id: 2,
      version: 'v2.0.5',
      algorithm: 'CNN-ResNet50',
      timestamp: '2024-12-20 09:15:10',
      adminId: 'admin002',
      notes: 'Performance optimization and bug fixes'
    },
    {
      id: 3,
      version: 'v2.0.0',
      algorithm: 'CNN-ResNet34',
      timestamp: '2024-11-10 16:45:33',
      adminId: 'admin001',
      notes: 'Major version update with improved architecture'
    }
  ]);

  const algorithms = [
    'CNN-ResNet50',
    'CNN-ResNet34',
    'YOLO v8',
    'YOLO v9',
    'Transformer-LSTM',
    'Mel-CNN',
    'EfficientNet',
    'MobileNet'
  ];

  const handleUploadClick = (model) => {
    setSelectedModel(model);
    setUploadDialogOpen(true);
    setUploadError('');
    setSelectedFile(null);
    setSelectedAlgorithm('');
    setNotes('');
  };

  const handleLogHistoryClick = (model) => {
    setSelectedModel(model);
    setLogHistoryDialogOpen(true);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file format
      const validExtensions = ['.pkl', '.h5', '.pt', '.onnx', '.pb'];
      const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
      
      if (!validExtensions.includes(fileExtension)) {
        setUploadError('Invalid model file format. Please select a valid model file (.pkl, .h5, .pt, .onnx, .pb)');
        setSelectedFile(null);
        return;
      }
      
      setSelectedFile(file);
      setUploadError('');
    }
  };

  const handleUploadConfirm = () => {
    // Validation
    if (!selectedFile) {
      setUploadError('Please select a file.');
      return;
    }
    
    if (!selectedAlgorithm) {
      setUploadError('Please select an algorithm.');
      return;
    }

    // Simulate upload process
    const updatedModels = models.map(model => {
      if (model.id === selectedModel.id) {
        const newVersion = incrementVersion(model.version);
        return {
          ...model,
          version: newVersion,
          algorithm: selectedAlgorithm,
          lastUpdated: new Date().toISOString().split('T')[0]
        };
      }
      return model;
    });

    setModels(updatedModels);
    setUploadDialogOpen(false);
    setSnackbar({
      open: true,
      message: 'Model successfully updated.',
      severity: 'success'
    });
  };

  const incrementVersion = (version) => {
    const parts = version.replace('v', '').split('.');
    const patch = parseInt(parts[2]) + 1;
    return `v${parts[0]}.${parts[1]}.${patch}`;
  };

  const handleCancelUpload = () => {
    if (selectedFile || selectedAlgorithm || notes) {
      if (window.confirm('Are you sure you want to cancel upload?')) {
        setUploadDialogOpen(false);
      }
    } else {
      setUploadDialogOpen(false);
    }
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
          AI Model Management
        </Typography>
        <Typography 
          variant="subtitle1" 
          sx={{ 
            color: '#666',
            fontFamily: 'Poppins, sans-serif'
          }}
        >
          Update AI Model - Manage and update AI models for safety features
        </Typography>
      </Box>

      {/* Models Table */}
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
                    Current Version
                  </TableCell>
                  <TableCell sx={{ 
                    fontWeight: 600, 
                    color: '#061978',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '0.95rem'
                  }}>
                    Algorithm Used
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
                    <TableCell sx={{ fontFamily: 'Poppins, sans-serif' }}>
                      <Chip 
                        label={model.version} 
                        size="small"
                        sx={{ 
                          backgroundColor: '#e3f2fd',
                          color: '#1976d2',
                          fontFamily: 'Poppins, sans-serif',
                          fontWeight: 500
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ 
                      fontFamily: 'Poppins, sans-serif',
                      color: '#666'
                    }}>
                      {model.algorithm}
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                          variant="contained"
                          size="small"
                          startIcon={<CloudUpload />}
                          onClick={() => handleUploadClick(model)}
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
                          Upload
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

      {/* Upload Dialog */}
      <Dialog 
        open={uploadDialogOpen} 
        onClose={handleCancelUpload}
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
          Upload New Model - {selectedModel?.name}
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
          
          {/* File Upload */}
          <Box sx={{ mb: 3 }}>
            <Typography sx={{ 
              mb: 1, 
              fontWeight: 500,
              color: '#061978',
              fontFamily: 'Poppins, sans-serif'
            }}>
              Select Model File
            </Typography>
            <Button
              variant="outlined"
              component="label"
              startIcon={<FileUpload />}
              sx={{
                width: '100%',
                height: 60,
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
              {selectedFile ? `Selected: ${selectedFile.name}` : 'Choose Model File (.pkl, .h5, .pt, .onnx, .pb)'}
              <input
                type="file"
                hidden
                accept=".pkl,.h5,.pt,.onnx,.pb"
                onChange={handleFileChange}
              />
            </Button>
          </Box>

          {/* Algorithm Selection */}
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel sx={{ fontFamily: 'Poppins, sans-serif' }}>Algorithm</InputLabel>
            <Select
              value={selectedAlgorithm}
              label="Algorithm"
              onChange={(e) => setSelectedAlgorithm(e.target.value)}
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

          {/* Notes */}
          <TextField
            fullWidth
            label="Update Notes (Optional)"
            multiline
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            sx={{ 
              '& .MuiInputBase-input': { fontFamily: 'Poppins, sans-serif' },
              '& .MuiInputLabel-root': { fontFamily: 'Poppins, sans-serif' }
            }}
          />
        </DialogContent>
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
            onClick={handleUploadConfirm}
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
            Upload Model
          </Button>
        </DialogActions>
      </Dialog>

      {/* Log History Dialog */}
      <Dialog 
        open={logHistoryDialogOpen} 
        onClose={() => setLogHistoryDialogOpen(false)}
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
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <History />
            Update History - {selectedModel?.name}
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
                    Version
                  </TableCell>
                  <TableCell sx={{ 
                    fontWeight: 600, 
                    color: '#061978',
                    fontFamily: 'Poppins, sans-serif'
                  }}>
                    Algorithm
                  </TableCell>
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
                    Admin ID
                  </TableCell>
                  <TableCell sx={{ 
                    fontWeight: 600, 
                    color: '#061978',
                    fontFamily: 'Poppins, sans-serif'
                  }}>
                    Notes
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {logHistory.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell sx={{ fontFamily: 'Poppins, sans-serif' }}>
                      <Chip 
                        label={log.version} 
                        size="small"
                        sx={{ 
                          backgroundColor: '#e8f5e8',
                          color: '#2e7d32',
                          fontFamily: 'Poppins, sans-serif'
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ fontFamily: 'Poppins, sans-serif' }}>
                      {log.algorithm}
                    </TableCell>
                    <TableCell sx={{ fontFamily: 'Poppins, sans-serif', color: '#666' }}>
                      {log.timestamp}
                    </TableCell>
                    <TableCell sx={{ fontFamily: 'Poppins, sans-serif', color: '#666' }}>
                      {log.adminId}
                    </TableCell>
                    <TableCell sx={{ 
                      fontFamily: 'Poppins, sans-serif', 
                      color: '#666',
                      maxWidth: 200
                    }}>
                      {log.notes}
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
          sx={{ fontFamily: 'Poppins, sans-serif' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AIModelManagement;