import React, { useState, useEffect } from 'react';
import { Box, Button, Card, CardContent, CardActions, Typography, Grid, IconButton } from '@mui/material';
import { Edit } from '@mui/icons-material';
import EditActivityForm from './ActivityEdit';   // Import the Edit form
import axios from 'axios';

const ActivityList = () => {
  const [activities, setActivities] = useState([]); // Holds list of activities
  const [editingActivity, setEditingActivity] = useState(null); // The activity to be edited

  useEffect(async () => {
    // Here, you can fetch activities from your API or use static data
    // const fetchedActivities = [
    //   {
    //     basePrice: { adult: 100, child: 120, infant: 140 },
    //     _id: "673cf9459a329e8fb02cbb01",
    //     activityId: "c151cf8380654de9ac2a478048eaad33",
    //     name: "Burj Khalifa",
    //     location: "Mohalla Jalafnagla",
    //     tag: "I love you",
    //     noOfReviews: 5,
    //     noOfHours: 2,
    //     images: [
    //       "https://pointclicktourism.s3.amazonaws.com/1732049218767-1.png",
    //       "https://pointclicktourism.s3.amazonaws.com/1732049218818-2.png",
    //       "https://pointclicktourism.s3.amazonaws.com/1732049218832-3.png",
    //       "https://pointclicktourism.s3.amazonaws.com/1732049218847-4.png"
    //     ],
    //     packagetype: [
    //       {
    //         id: 1732049008368,
    //         name: "Standard",
    //         charges: 10,
    //         transferOptions: [
    //           { option: "A", charge: 5 },
    //           { option: "B", charge: 10 }
    //         ]
    //       }
    //     ],
    //     rating: 0
    //   }
    // ];
    const res = await axios.get("http://127.0.0.1:4001/tours/get-all-activity");
    setActivities(res.data);
  }, []);

  // Function to open edit form
  const handleEditClick = (activity) => {
    setEditingActivity(activity); // Set the activity to edit
  };

  // Function to close the edit form
  const handleCloseEdit = () => {
    setEditingActivity(null); // Reset the editing activity
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" mb={3} textAlign="center" color="primary">
        Activities List
      </Typography>

      {activities.map((activity) => (
        <Card key={activity._id} sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6">{activity.name}</Typography>
            <Typography variant="body1">{activity.location}</Typography>
            <Typography variant="body2">Tag: {activity.tag}</Typography>
            <Typography variant="body2">Reviews: {activity.noOfReviews}</Typography>
            <Typography variant="body2">Duration: {activity.noOfHours} hours</Typography>
            <Typography variant="body2">Price (Adult): {activity.basePrice.adult}</Typography>
            <Typography variant="body2">Rating: {activity.rating}</Typography>
          </CardContent>
          <CardActions>
            <IconButton onClick={() => handleEditClick(activity)} color="primary">
              <Edit />
            </IconButton>
          </CardActions>
        </Card>
      ))}

      {/* Display edit form if an activity is being edited */}
      {editingActivity && <EditActivityForm activity={editingActivity} onClose={handleCloseEdit} />}
    </Box>
  );
};

export default ActivityList;
