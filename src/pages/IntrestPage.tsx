import { Box, Button, Chip, Divider, Typography } from "@mui/material";
import { useState } from "react";

const IntrestPage = () => {
  const [categories, setCategories] = useState<any>([
    {
      name: "Music",
      tags: [
        { name: "Concerts", selected: true },
        { name: "Music Festivals", selected: false },
        { name: "Music Workshops", selected: false },
        { name: "DJ Nights", selected: false },
      ],
    },
    {
      name: "Arts & Culture",
      tags: [
        { name: "Art Exhibitions", selected: true },
        { name: "Cultural Festivals", selected: true },
        { name: "Theater Plays", selected: false },
        { name: "Dance Performances", selected: false },
      ],
    },
    {
      name: "Food & Drink",
      tags: [
        { name: "Food Festivals", selected: true },
        { name: "Wine Tastings", selected: true },
        { name: "Cooking Classes", selected: false },
        { name: "Beer Festivals", selected: false },
      ],
    },
    {
      name: "Sports & Fitness",
      tags: [
        { name: "Marathons", selected: true },
        { name: "Yoga Sessions", selected: false },
        { name: "Fitness Workshops", selected: false },
        { name: "Sporting Products", selected: true },
      ],
    },
    {
      name: "Business & Networking",
      tags: [
        { name: "Conferences", selected: true },
        { name: "Seminars", selected: false },
        { name: "Workshops", selected: true },
        { name: "Networking Products", selected: false },
      ],
    },
  ]);

  const handleChipClick = (categoryIndex: any, tagIndex: any) => {
    setCategories((prevCategories: any[]) =>
      prevCategories.map((category, catIdx) =>
        catIdx === categoryIndex
          ? {
              ...category,
              tags: category.tags.map((tag: any, tagIdx: any) =>
                tagIdx === tagIndex ? { ...tag, selected: !tag.selected } : tag
              ),
            }
          : category
      )
    );
  };

  return (
    <>
      <Box>
        <Box
          display="flex"
          flexDirection="column"
          sx={{ marginX: 10 }}
        >
          <Box
            sx={{
              width: "100%",
              margin: "auto",
              paddingY: 4,
            }}
          >
            <Typography
              variant="h2"
              component="h2"
              sx={{ marginY: 2, fontSize: "30px", color: "#1A1A2E" }}
            >
              Share your intrests with us
            </Typography>
            <Typography variant="h4" component="h2" sx={{ fontSize: "14px" }}>
              Choose your intrests below to get personalized event suggestions.
            </Typography>
          </Box>

          <Box sx={{ width: "100%", margin: "auto", mt: 4 }}>
            {categories.map((category: any, categoryIndex: any) => (
              <Box key={categoryIndex} sx={{ mb: 3 }}>
                <Typography variant="h6" fontWeight="bold">
                  {category.name}
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
                  {category.tags.map((tag: any, tagIndex: any) => (
                    <Chip
                      key={tagIndex}
                      label={tag.name}
                      onClick={() => handleChipClick(categoryIndex, tagIndex)}
                      sx={{
                        backgroundColor: tag.selected ? "#F7D046" : "#E0E0E0",
                        color: tag.selected ? "#000" : "#333",
                        fontWeight: tag.selected ? "bold" : "normal",
                        "&:hover": {
                          backgroundColor: "#F7D046",
                        },
                      }}
                      clickable
                    />
                  ))}
                </Box>
                <Divider sx={{ border: "1px solid #E0E0E0", mt: 4 }} />
              </Box>
            ))}
          </Box>
        </Box>
          <Box display="flex" justifyContent="flex-end" marginX="10px">
            <Button sx={{backgroundColor:"#1A1A2E", color:"#fff", textTransform:"none", paddingX:4}}>
                Save my intrests
            </Button>
          </Box>
      </Box>
    </>
  );
};

export default IntrestPage;
