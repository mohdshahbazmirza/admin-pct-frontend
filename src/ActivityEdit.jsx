import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Grid, Card, CardContent, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';

const EditActivityForm = ({ activity, onClose }) => {
  const [formData, setFormData] = useState(activity);

  // Handle input field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission (this can be extended to save the data via an API call)
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can send the updated activity data to your API or backend service
    onClose();  // Close the form after submit
  };

  return (
    <Box sx={{ p: 3, borderRadius: 2, backgroundColor: 'white', boxShadow: 3, position: 'relative' }}>
      <IconButton onClick={onClose} sx={{ position: 'absolute', top: 10, right: 10 }} color="error">
        <Close />
      </IconButton>

      <Typography variant="h5" mb={2}>
        Edit Activity
      </Typography>

      <form onSubmit={handleSubmit}>
        <Card sx={{ p: 3, mb: 3 }}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Activity Name"
                  name="name"
                  fullWidth
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Location"
                  name="location"
                  fullWidth
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Tag"
                  name="tag"
                  fullWidth
                  value={formData.tag}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Number of Reviews"
                  name="noOfReviews"
                  type="number"
                  fullWidth
                  value={formData.noOfReviews}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Duration (Hours)"
                  name="noOfHours"
                  type="number"
                  fullWidth
                  value={formData.noOfHours}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Base Price (Adult)"
                  name="basePrice.adult"
                  type="number"
                  fullWidth
                  value={formData.basePrice.adult}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Button variant="contained" color="primary" type="submit" fullWidth>
          Save Changes
        </Button>
      </form>
    </Box>
  );
};

export default EditActivityForm;
