import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";

const AlbumPage = ({ albumId }) => {
  const [album, setAlbum] = useState(null);
  const [photos, setPhotos] = useState([]);
  const router = useRouter();

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/albums/1`)
      .then((response) => response.data)
      .then((data) => setAlbum(data));
  }, [albumId]);

  useEffect(() => {
    if (!photos.length && album) {
      axios
        .get(`https://jsonplaceholder.typicode.com/albums/1/photos`)
        .then((response) => response.data)
        .then((data) => setPhotos(data));
    }
  }, [album, albumId, photos.length]);

  return (
    <div>
      <Button variant="outlined" onClick={() => router.back()}>
        Back
      </Button>
      <center>
        <h1>Photo Album</h1>
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 1 }}>
          {photos.map((photo) => (
            <Card variant="outlined"
              sx={{ width: "250px", margin: "20px" }}
              key={photo.id}
            >
              <CardContent>
                <img src={photo.thumbnailUrl} alt={photo.title} />
              </CardContent>
            </Card>
          ))}
        </Grid>
      </center>
    </div>
  );
};

export default AlbumPage;
