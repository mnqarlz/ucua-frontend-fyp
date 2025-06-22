// src/pages/SafetyInsigh&ReportingModule/ReportGeneration/reportExp.jsx

import {
  Box,
  Typography,
  Paper,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useState } from 'react';

const ReportExp = () => {
  const [format, setFormat] = useState('pdf');

  const handleExport = () => {
    // TODO: Export logic here
    console.log('Exporting report as', format);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography
        variant="h5"
        sx={{ fontFamily: 'Poppins', color: '#061978', mb: 3 }}
      >
        Export Safety Report
      </Typography>

      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="format-label">Export Format</InputLabel>
          <Select
            labelId="format-label"
            value={format}
            label="Export Format"
            onChange={(e) => setFormat(e.target.value)}
          >
            <MenuItem value="pdf">PDF</MenuItem>
            <MenuItem value="excel">Excel (.xlsx)</MenuItem>
            <MenuItem value="csv">CSV</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="contained"
          sx={{
            mt: 2,
            backgroundColor: '#061978',
            fontFamily: 'Poppins',
            '&:hover': { backgroundColor: '#040e66' },
          }}
          onClick={handleExport}
        >
          Export Report
        </Button>
      </Paper>
    </Box>
  );
};

export default ReportExp;
