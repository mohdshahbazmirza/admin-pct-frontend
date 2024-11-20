import React, { useState } from "react";
import {
  TextField,
  Box,
  Button,
  Typography,
  IconButton,
  Grid,
  Paper,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";

const DynamicMultilineInput = ({ label, values, onChange }) => {
  const handleAddLine = () => {
    onChange([...values, ""]);
  };

  const handleRemoveLine = (index) => {
    const updatedValues = values.filter((_, i) => i !== index);
    onChange(updatedValues);
  };

  const handleInputChange = (index, value) => {
    const updatedValues = [...values];
    updatedValues[index] = value;
    onChange(updatedValues);
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>
        {label}
      </Typography>
      {values.map((value, index) => (
        <Grid
          container
          spacing={1}
          alignItems="center"
          key={index}
          sx={{ mb: 1 }}
        >
          <Grid item xs={10}>
            <TextField
              value={value}
              onChange={(e) => handleInputChange(index, e.target.value)}
              placeholder={`Enter ${label.toLowerCase()}...`}
              fullWidth
              variant="outlined"
              InputProps={{
                style: {
                  borderRadius: 12,
                },
              }}
            />
          </Grid>
          <Grid item xs={2}>
            <IconButton
              onClick={() => handleRemoveLine(index)}
              color="error"
              disabled={values.length === 1}
              sx={{ transition: "transform 0.2s", "&:hover": { transform: "scale(1.2)" } }}
            >
              <RemoveCircleOutlineIcon />
            </IconButton>
          </Grid>
        </Grid>
      ))}
      <Button
        onClick={handleAddLine}
        startIcon={<AddCircleOutlineIcon />}
        variant="outlined"
        sx={{
          textTransform: "capitalize",
          mt: 1,
          borderRadius: 20,
        }}
      >
        Add Another Line
      </Button>
    </Box>
  );
};

const ActivityInfoForm = () => {
  const [formData, setFormData] = useState({
    activityId: "",
    overview: [""],
    cancellation_policy: [""],
    highlights: [""],
    whats_included: [""],
    whats_not_included: [""],
    important_information: [""],
    additional_information: [""],
  });

  const handleSubmit = async(e) => {
    e.preventDefault();
    await axios.post("http://127.0.0.1:4001/tours/activity-info", formData, {
        headers: { "Content-Type": "application/json" },
      });
  };

  const handleChange = (field, values) => {
    setFormData((prev) => ({
      ...prev,
      [field]: values,
    }));
  };

  return (
    <Box sx={{ p: 4, bgcolor: "#f9fafc", borderRadius: 4, boxShadow: 4 }}>
      <Paper
        elevation={4}
        sx={{
          p: 4,
          borderRadius: 4,
          bgcolor: "#ffffff",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          align="center"
          sx={{
            fontWeight: "bold",
            color: "primary.main",
          }}
        >
          Create Activity Info
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Activity ID"
            value={formData.activityId}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, activityId: e.target.value }))
            }
            fullWidth
            required
            variant="outlined"
            sx={{ mb: 3, borderRadius: 20 }}
            InputProps={{
              style: {
                borderRadius: 12,
              },
            }}
          />
          <DynamicMultilineInput
            label="Overview"
            values={formData.overview}
            onChange={(values) => handleChange("overview", values)}
          />
          <DynamicMultilineInput
            label="Cancellation Policy"
            values={formData.cancellation_policy}
            onChange={(values) => handleChange("cancellation_policy", values)}
          />
          <DynamicMultilineInput
            label="Highlights"
            values={formData.highlights}
            onChange={(values) => handleChange("highlights", values)}
          />
          <DynamicMultilineInput
            label="What's Included"
            values={formData.whats_included}
            onChange={(values) => handleChange("whats_included", values)}
          />
          <DynamicMultilineInput
            label="What's Not Included"
            values={formData.whats_not_included}
            onChange={(values) => handleChange("whats_not_included", values)}
          />
          <DynamicMultilineInput
            label="Important Information"
            values={formData.important_information}
            onChange={(values) => handleChange("important_information", values)}
          />
          <DynamicMultilineInput
            label="Additional Information"
            values={formData.additional_information}
            onChange={(values) => handleChange("additional_information", values)}
          />
          <Button
            type="submit"
            variant="contained"
            endIcon={<SendIcon />}
            color="primary"
            fullWidth
            sx={{
              mt: 3,
              py: 1.5,
              fontWeight: "bold",
              fontSize: "1rem",
              textTransform: "uppercase",
              borderRadius: 20,
            }}
          >
            Submit
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

// export default DynamicMultilineForm;


export default ActivityInfoForm;
