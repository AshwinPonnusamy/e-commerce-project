import InputText from "../../centralized/InputText"
import { useForm } from "react-hook-form";

const ShippingDetails = () => {
  const { control } = useForm();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-1.5 h-6 bg-violet-600 rounded-full"></div>
        <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">Shipping Information</h2>
      </div>

      <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="col-span-1">
            <InputText
              fullWidth
              label="Full Name"
              name="name"
              placeholder='Enter your name'
              control={control}
            />
          </div>
          <div className="col-span-1">
            <InputText
              fullWidth
              label="Phone Number"
              name="number"
              placeholder='Enter mobile number'
              control={control}
            />
          </div>
          <div className="col-span-1">
            <InputText
              fullWidth
              label="Pincode"
              name="pincode"
              placeholder='Enter 6-digit pincode'
              control={control}
            />
          </div>
          <div className="col-span-1">
            <InputText
              fullWidth
              label="Town / City"
              name="city"
              placeholder='Enter city'
              control={control}
            />
          </div>
          <div className="col-span-2">
            <InputText
              fullWidth
              label="Full Address"
              name="address"
              placeholder='House No, Building, Street, Area'
              control={control}
            />
          </div>
          <div className="col-span-1">
            <InputText
              fullWidth
              label="State"
              name="state"
              placeholder='Enter state'
              control={control}
            />
          </div>
          <div className="col-span-1">
            <InputText
              fullWidth
              label="Landmark (Optional)"
              name="landmark"
              placeholder='E.g. near hospital'
              control={control}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShippingDetails;
