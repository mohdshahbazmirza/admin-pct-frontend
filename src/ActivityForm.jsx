import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Grid,
  Typography,
  IconButton,
  Card,
  CardContent,
  CardActions,
  Paper,
  Divider,
} from "@mui/material";
import { Add, Remove, UploadFile } from "@mui/icons-material";
import axios from "axios";

const ActivityForm = () => {
  const [formData, setFormData] = useState({
    // activityId: "",
    name: "",
    location: "",
    tag: "",
    noOfReviews: 0,
    noOfHours: 0,
    basePrice: { adult: 0, child: 0, infant: 0 },
    images: [],
    packagetype: [],
    rating: 0,
  });

  const [selectedImages, setSelectedImages] = useState([]);
  const [packages, setPackages] = useState([]);

  // Handle text field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle changes for base price
  const handleBasePriceChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      basePrice: { ...prev.basePrice, [name]: parseFloat(value) },
    }));
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + selectedImages.length > 4) {
      alert("You can upload a maximum of 4 images.");
      return;
    }
    setSelectedImages((prev) => [...prev, ...files]);
  };

  // Remove selected image
  const handleRemoveImage = (index) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Add a new package
  const addPackage = () => {
    setPackages((prev) => [
      ...prev,
      { id: Date.now(), name: "", charges: 0, transferOptions: [] },
    ]);
  };

  // Remove a package
  const removePackage = (index) => {
    setPackages((prev) => prev.filter((_, i) => i !== index));
  };

  // Handle package field changes
  const handlePackageChange = (index, field, value) => {
    setPackages((prev) =>
      prev.map((pkg, i) =>
        i === index ? { ...pkg, [field]: field === "charges" ? parseFloat(value) : value } : pkg
      )
    );
  };

  // Add a transfer option to a package
  const addTransferOption = (index) => {
    setPackages((prev) =>
      prev.map((pkg, i) =>
        i === index
          ? { ...pkg, transferOptions: [...pkg.transferOptions, { option: "", charge: 0 }] }
          : pkg
      )
    );
  };

  // Remove a transfer option from a package
  const removeTransferOption = (pkgIndex, optionIndex) => {
    setPackages((prev) =>
      prev.map((pkg, i) =>
        i === pkgIndex
          ? { ...pkg, transferOptions: pkg.transferOptions.filter((_, j) => j !== optionIndex) }
          : pkg
      )
    );
  };

  // Handle transfer option changes
  const handleTransferOptionChange = (pkgIndex, optionIndex, field, value) => {
    setPackages((prev) =>
      prev.map((pkg, i) =>
        i === pkgIndex
          ? {
              ...pkg,
              transferOptions: pkg.transferOptions.map((opt, j) =>
                j === optionIndex ? { ...opt, [field]: field === "charge" ? parseFloat(value) : value } : opt
              ),
            }
          : pkg
      )
    );
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const form = new FormData();
    //   form.append("activityId", formData.activityId);
      form.append("name", formData.name);
      form.append("location", formData.location);
      form.append("tag", formData.tag);
      form.append("noOfReviews", formData.noOfReviews);
      form.append("noOfHours", formData.noOfHours);
      form.append("rating", formData.rating);
      form.append("basePrice", JSON.stringify(formData.basePrice));
      form.append("packagetype", JSON.stringify(packages));

      selectedImages.forEach((image) => {
        form.append("images", image);
      });
      console.log(formData,"form")
      const response = await axios.post("http://127.0.0.1:4001/tours/activity", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Response:", response.data);
      alert("Activity created successfully!");
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      alert("Failed to create activity.");
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" mb={3} textAlign="center" color="primary">
        Create Activity
      </Typography>
      <form onSubmit={handleSubmit}>
        <Card sx={{ p: 3, borderRadius: 2, mb: 3 }}>
          <Typography variant="h6" mb={2}>
            Activity Details
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Name"
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
                required
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
                label="Number of Hours"
                name="noOfHours"
                type="number"
                fullWidth
                value={formData.noOfHours}
                onChange={handleInputChange}
                required
              />
            </Grid>
          </Grid>
        </Card>

        <Card sx={{ p: 3, borderRadius: 2, mb: 3 }}>
          <Typography variant="h6" mb={2}>
            Base Price
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Adult"
                name="adult"
                type="number"
                fullWidth
                value={formData.basePrice.adult}
                onChange={handleBasePriceChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Child"
                name="child"
                type="number"
                fullWidth
                value={formData.basePrice.child}
                onChange={handleBasePriceChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Infant"
                name="infant"
                type="number"
                fullWidth
                value={formData.basePrice.infant}
                onChange={handleBasePriceChange}
                required
              />
            </Grid>
          </Grid>
        </Card>

        <Card sx={{ p: 3, borderRadius: 2, mb: 3 }}>
          <Typography variant="h6" mb={2}>
            Upload Images
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            component="label"
            startIcon={<UploadFile />}
          >
            Upload Images
            <input
              type="file"
              multiple
              hidden
              accept="image/*"
              onChange={handleImageChange}
            />
          </Button>
          <Box mt={2}>
            {selectedImages.map((file, index) => (
              <Box
                key={index}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                mb={1}
                p={1}
                bgcolor="#f5f5f5"
                borderRadius={1}
              >
                <Typography>{file.name}</Typography>
                <Button color="error" onClick={() => handleRemoveImage(index)}>
                  Remove
                </Button>
              </Box>
            ))}
          </Box>
        </Card>

        <Card sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="h6" mb={2}>
            Packages
          </Typography>
          <Button
            onClick={addPackage}
            variant="contained"
            color="primary"
            startIcon={<Add />}
          >
            Add Package
          </Button>
          {packages.map((pkg, index) => (
            <Paper
              key={pkg.id}
              sx={{ mt: 2, p: 2, border: "1px solid #ddd", borderRadius: 2 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Package Name"
                    fullWidth
                    value={pkg.name}
                    onChange={(e) =>
                      handlePackageChange(index, "name", e.target.value)
                    }
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Charges"
                    type="number"
                    fullWidth
                    value={pkg.charges}
                    onChange={(e) =>
                      handlePackageChange(index, "charges", e.target.value)
                    }
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Button
                    color="secondary"
                    onClick={() => addTransferOption(index)}
                    fullWidth
                  >
                    Add Transfer Option
                  </Button>
                </Grid>
              </Grid>

              {pkg.transferOptions.map((opt, optIndex) => (
                <Box key={optIndex} mt={1}>
                  <Divider sx={{ mb: 1 }} />
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={5}>
                      <TextField
                        label="Option"
                        fullWidth
                        value={opt.option}
                        onChange={(e) =>
                          handleTransferOptionChange(
                            index,
                            optIndex,
                            "option",
                            e.target.value
                          )
                        }
                      />
                    </Grid>
                    <Grid item xs={12} md={5}>
                      <TextField
                        label="Charge"
                        type="number"
                        fullWidth
                        value={opt.charge}
                        onChange={(e) =>
                          handleTransferOptionChange(
                            index,
                            optIndex,
                            "charge",
                            e.target.value
                          )
                        }
                      />
                    </Grid>
                    <Grid item xs={12} md={2}>
                      <IconButton
                        color="error"
                        onClick={() => removeTransferOption(index, optIndex)}
                      >
                        <Remove />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Box>
              ))}
              <Button
                color="error"
                onClick={() => removePackage(index)}
                startIcon={<Remove />}
                sx={{ mt: 2 }}
              >
                Remove Package
              </Button>
            </Paper>
          ))}
        </Card>

        <Box mt={4}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            size="large"
            fullWidth
          >
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default ActivityForm;
