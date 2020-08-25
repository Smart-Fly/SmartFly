import React, { useState } from "react";
import { Button, Checkbox, FormControlLabel } from "@material-ui/core";
import { UPDATE_SUBSCRIPTION } from "../../query/userQuery";
import { useMutation } from "@apollo/client";

const ProfilePage = () => {
  const [updateSubs, setUpdateSubs] = useState({
    access_token: localStorage.getItem("access_token"),
    subsStatus: false,
  });

  const [updateSubscription, { data, loading }] = useMutation(
    UPDATE_SUBSCRIPTION
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSubscription({
      variables: { updateData: updateSubs },
    });
  };

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setUpdateSubs({ ...updateSubs, [name]: checked });
  };

  if (data) {
    const {
      updateSubscription: { subsStatus: newData },
    } = data;
    console.log(newData, "data terbaru di clien");
  }

  if (loading) {
    // Tar cari buat loading nya
    return <p>Loading..</p>;
  }

  return (
    <>
      {/* <FormGroup className="container w-50"> */}
      {/* <FormControl onSubmit={(e) => handleSubmit(e)}> */}
      <div style={{ justifyContent: "center" }}>
        <form className="container w-50" onSubmit={(e) => handleSubmit(e)}>
          <h1>Update PAGE</h1>
          <FormControlLabel
            control={
              <Checkbox
                checked={updateSubs.subsStatus}
                onChange={handleChange}
                name="subsStatus"
                color="primary"
              />
            }
            label="Primary"
          />
          <Button type="submit" variant="contained" color="primary">
            Register
          </Button>
        </form>
      </div>
      {/* </FormControl> */}
      {/* </FormGroup> */}
    </>
  );
};

export default ProfilePage;
