import { FC, useState } from "react";

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Button from '@mui/material/Button';

import CropperDialog from "../../components/CropperDialog";
import http from "../../http_comon"

const Hotel: FC = () => {

    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [imagesSelected, setImagesSelected] = useState<Array<string>>([]);

    const setImage = (image: string) => {
        setImagesSelected([...imagesSelected, image]);
    }

    const createHotel = () => {
        console.log({ name: name, description: description, base64: imagesSelected });

        http.post("api/hotels/create", { name: name, description: description, base64: imagesSelected })
        .then(response => {
            console.log(response)
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <>
            <Container disableGutters maxWidth="lg" component="main" sx={{ pt: 8, pb: 6 }}>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <TextField
                            sx={{ mt: 1, }}
                            id="outlined-basic"
                            label="Name"
                            variant="outlined"
                            onChange={(e) => { setName(e.target.value) }}
                        />
                        <TextField
                            sx={{ mt: 1, }}
                            id="outlined-basic"
                            label="Description"
                            variant="outlined"
                            onChange={(e) => { setDescription(e.target.value) }}
                        />
                        <CropperDialog
                            getImage={setImage}
                        />
                        <Button
                            variant="contained"
                            onClick={createHotel}
                        >Contained</Button>
                    </Grid>
                    <Grid item xs={8}>
                        <Box sx={{ mt: 1, }}>
                            <ImageList variant="masonry" cols={3} gap={8}>
                                {imagesSelected.map((item, key) => {
                                    return (
                                        <ImageListItem key={key}>
                                            <img
                                                src={item}
                                                alt="images"
                                                loading="lazy"
                                            />
                                        </ImageListItem>
                                    )
                                })}
                            </ImageList>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}

export default Hotel;