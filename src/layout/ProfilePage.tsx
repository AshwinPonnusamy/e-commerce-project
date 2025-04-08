import React, { useRef, useState } from "react";
import { Box, Avatar, Typography, Divider, List, ListItem, ListItemIcon, ListItemText, Switch, IconButton, Grid } from "@mui/material";
import { AccountCircle, ExitToApp, Brightness4, Email, Phone, LocationOn, CameraAlt, Edit, Check, Close, } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../state/store/store";
import InputText from "../centralized/InputText";
import { useForm } from "react-hook-form";
import { updateUserDetails } from "../state/action/users";
interface ProfileProps {
    handleLogout: () => void;
    userData: any;
}
const Profile: React.FC<ProfileProps> = ({ handleLogout, userData }) => {
    const [activeTab, setActiveTab] = useState("profile");
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [editingField, setEditingField] = useState<string | null>(null);
    const dispatch = useDispatch<AppDispatch>();
    const { control, getValues } = useForm({
        defaultValues: {
            fullName: userData?.fullName,
            email: userData?.email || "",
            phone: userData?.phone || "",
            address: userData?.address || ""
        }
    });
    const handleFieldSave = async (field: any) => {
        const value = getValues(field);
        if (!value || value === userData[field]) {
            setEditingField(null);
            return;
        }
        try {
            await dispatch(updateUserDetails({ [field]: value }));
            setEditingField(null);
            console.log(`${field} updated to:`, value);
        } catch (error) {
            console.error(`Error updating ${field}:`, error);
        }
    };
    const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.item(0);
        if (!selectedFile) {
            return;
        }
        const reader = new FileReader();
        reader.onloadend = async () => {
            const base64Image = reader.result as string;
            await dispatch(updateUserDetails({ profileUrl: base64Image })); // update Firebase
        };

        reader.readAsDataURL(selectedFile);
    };



    return (
        <>
            <Grid container spacing={2} sx={{ p: 3 }} justifyContent="center">
                <Grid item sx={{ position: "relative" }}>
                    <Avatar
                        src={userData?.profileUrl}
                        sx={{ width: 120, height: 120, border: "3px solid #ffd000" }}
                    />
                    <IconButton
                        sx={{
                            position: "absolute", bottom: 0, right: 0,
                            backgroundColor: "#ffd000", "&:hover": { backgroundColor: "#ffd000" },
                        }}
                        onClick={() => fileInputRef.current?.click()}


                    >
                        <CameraAlt sx={{ fontSize: 20, color: "#000" }} />
                    </IconButton>
                    <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={handleImageChange}
                    />
                </Grid>
                <Grid item xs={12} md={12} textAlign="center">
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {userData?.fullName || "Guest User"}
                    </Typography>
                    <Typography variant="body2" color="text.primary">
                        {userData?.email || "No email provided"}
                    </Typography>
                </Grid>
            </Grid>
            <Divider />
            <Grid container>
                <Grid item xs={6} sx={{ textAlign: "center", py: 2, cursor: "pointer", borderBottom: activeTab === "profile" ? "2px solid #333" : "none" }}
                    onClick={() => setActiveTab("profile")}
                >
                    <Typography>Profile</Typography>
                </Grid>
                <Grid item xs={6} sx={{ textAlign: "center", py: 2, cursor: "pointer", borderBottom: activeTab === "settings" ? "2px solid #333" : "none" }}
                    onClick={() => setActiveTab("settings")}
                >
                    <Typography>Settings</Typography>
                </Grid>
            </Grid>
            <Divider />
            <Box sx={{ overflow: "auto", flexGrow: 1 }}>
                {activeTab === "profile" ? (
                    <Box sx={{ p: 3 }}>
                        <Grid container spacing={2}>
                            {[
                                { label: "Name", field: "fullName", icon: <AccountCircle /> },
                                { label: "Email", field: "email", icon: <Email /> },
                                { label: "Phone", field: "phone", icon: <Phone /> },
                                { label: "Address", field: "address", icon: <LocationOn /> },
                            ].map(({ field, icon, label }) => (
                                <Grid item xs={12} key={field}>
                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                        <ListItemIcon sx={{ color: "#333", minWidth: 36 }}>{icon}</ListItemIcon>
                                        {editingField === field ? (
                                            <>
                                                <InputText
                                                    name={field}
                                                    control={control}
                                                    placeholder={`Enter your ${label}`}
                                                    fullWidth
                                                    variant="standard"
                                                />
                                                <IconButton onClick={() => handleFieldSave(field)}>
                                                    <Check />
                                                </IconButton>
                                                <IconButton onClick={() => setEditingField(null)}>
                                                    <Close />
                                                </IconButton>
                                            </>
                                        ) : (
                                            <>
                                                <ListItemText
                                                    primary={label}
                                                    secondary={userData[field] || "Not provided"}
                                                />
                                                <IconButton onClick={() => setEditingField(field)}>
                                                    <Edit />
                                                </IconButton>
                                            </>
                                        )}
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                ) : (
                    <Box sx={{ p: 3 }}>
                        <List>
                            <ListItem>
                                <ListItemIcon sx={{ color: "#333" }}>
                                    <AccountCircle />
                                </ListItemIcon>
                                <ListItemText primary="Account Settings" />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon sx={{ color: "#333" }}>
                                    <Brightness4 />
                                </ListItemIcon>
                                <ListItemText primary="Dark Mode" />
                                <Switch color="primary" />
                            </ListItem>
                            <ListItem component="button" onClick={handleLogout}>
                                <ListItemIcon sx={{ color: "#333" }}>
                                    <ExitToApp />
                                </ListItemIcon>
                                <ListItemText primary="Logout" />
                            </ListItem>
                        </List>
                    </Box>
                )}
            </Box>
            <Divider />
        </>
    );
};
export default Profile;
