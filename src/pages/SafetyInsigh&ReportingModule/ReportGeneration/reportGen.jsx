// src/pages/SafetyInsigh&ReportingModule/ReportGeneration/reportGen.jsx

import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import { useState } from 'react';

const ReportGen = () => {
  const [type, setType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleGenerate = () => {
    // TODO: Generate report logic
    console.log('Generating report for', type, startDate, endDate);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography
        variant="h5"
        sx={{ fontFamily: 'Poppins', color: '#061978', mb: 3 }}
      >
        Generate Safety Report
      </Typography>

      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="report-type-label">Report Type</InputLabel>
          <Select
            labelId="report-type-label"
            value={type}
            label="Report Type"
            onChange={(e) => setType(e.target.value)}
          >
            <MenuItem value="uc">Unsafe Condition (UC)</MenuItem>
            <MenuItem value="ua">Unsafe Action (UA)</MenuItem>
            <MenuItem value="all">All Reports</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Start Date"
          type="date"
          fullWidth
          sx={{ mb: 2 }}
          InputLabelProps={{ shrink: true }}
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        <TextField
          label="End Date"
          type="date"
          fullWidth
          sx={{ mb: 2 }}
          InputLabelProps={{ shrink: true }}
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />

        <Button
          variant="contained"
          sx={{
            mt: 2,
            backgroundColor: '#061978',
            fontFamily: 'Poppins',
            '&:hover': { backgroundColor: '#040e66' },
          }}
          onClick={handleGenerate}
        >
          Generate Report
        </Button>
      </Paper>
    </Box>
  );
};

export default ReportGen;
