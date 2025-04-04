import React from "react";
import {
    Box,
    Avatar,
    Typography,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Switch,
} from "@mui/material";
import {
    AccountCircle,
    ExitToApp,
    Brightness4,
    Email,
    Phone,
    LocationOn,
} from "@mui/icons-material";

interface UserData {
    fName?: string;
    lName?: string;
    photoURL?: string;
    displayName?: string;
    email?: string;
    phoneNumber?: string;
    address?: string;
}

interface ProfileProps {
    handleLogout: () => void;
    userData: UserData;
}

const Profile: React.FC<ProfileProps> = ({
    handleLogout,
    userData,
}) => {
    const [activeTab, setActiveTab] = React.useState("profile");

    return (
        <>
            <Box sx={{ p: 3, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Avatar
                    sx={{
                        width: 120,
                        height: 120,
                        mb: 2,
                        border: `3px solid "#333"`,
                    }}
                    src={userData?.photoURL || "A"}
                    alt="User Profile"
                />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {userData?.fName + " " + userData?.lName || "Guest User"}
                </Typography>
                <Typography variant="body2" color={"text.primary"}>
                    {userData?.email || "No email provided"}
                </Typography>
            </Box>

            <Divider />

            <Box sx={{ display: "flex", borderBottom: 1, borderColor: "divider" }}>
                <Box
                    sx={{
                        flex: 1,
                        textAlign: "center",
                        py: 2,
                        cursor: "pointer",
                        borderBottom:
                            activeTab === "profile"
                                ? `2px solid "#333"`
                                : "none",
                    }}
                    onClick={() => setActiveTab("profile")}
                >
                    <Typography>Profile</Typography>
                </Box>
                <Box
                    sx={{
                        flex: 1,
                        textAlign: "center",
                        py: 2,
                        cursor: "pointer",
                        borderBottom:
                            activeTab === "settings"
                                ? `2px solid "#333"`
                                : "none",
                    }}
                    onClick={() => setActiveTab("settings")}
                >
                    <Typography>Settings</Typography>
                </Box>
            </Box>

            <Box sx={{ overflow: "auto", flexGrow: 1 }}>
                {activeTab === "profile" ? (
                    <Box sx={{ p: 3 }}>
                        <List>
                            <ListItem>
                                <ListItemIcon sx={{ color: "#333" }}>
                                    <Email />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Email"
                                    secondary={userData?.email || "No email provided"}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon sx={{ color: "#333" }}>
                                    <Phone />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Phone"
                                    secondary={userData?.phoneNumber || "Not provided"}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon sx={{ color: "#333" }}>
                                    <LocationOn />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Address"
                                    secondary={userData?.address || "Not provided"}
                                />
                            </ListItem>
                        </List>
                    </Box>
                ) : (
                    <Box sx={{ p: 3 }}>
                        <List>
                            <ListItem component="button" onClick={() => { }}>
                                <ListItemIcon sx={{ color: "#333" }}>
                                    <AccountCircle />
                                </ListItemIcon>
                                <ListItemText primary="Account Settings" />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon sx={{ color: "#333" }}>
                                    {<Brightness4 />}
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