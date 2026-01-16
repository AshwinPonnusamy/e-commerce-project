import { Grid } from "@mui/material"
import InputText from "../../centralized/InputText"
import { useForm } from "react-hook-form";

const ShippingDetails = () => {
  const { control } = useForm();

  return (
    <Grid container spacing={2} p={2}>
      <Grid size={{ xs: 12 }} boxShadow={2} sx={{ p: 2 }}>
        <Grid container spacing={2} >
          <Grid size={{ xs: 12, sm: 6 }}>
            <InputText
              fullWidth
              label="Enter Your Name"
              name="name"
              placeholder='Name'
              control={control}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <InputText
              fullWidth
              label="Enter Your Number"
              name="number"
              placeholder='Mobile Number'
              control={control}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <InputText
              fullWidth
              label="Enter Pincode"
              name="pincode"
              placeholder='Pincode'
              control={control}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <InputText
              fullWidth
              label="Enter Address"
              name="address"
              placeholder='Address'
              control={control}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <InputText
              fullWidth
              label="Enter Your City"
              name="city"
              placeholder='City'
              control={control}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <InputText
              fullWidth
              label="Enter State"
              name="state"
              placeholder='State'
              control={control}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ShippingDetails;