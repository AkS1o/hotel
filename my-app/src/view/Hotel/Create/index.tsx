import { FC, useState } from "react";
import { useNavigate } from "react-router";

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';

import CropperDialog from "../../../components/CropperDialog";
import http from "../../../http_comon";

const HotelCreate: FC = () => {
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [imagesSelected, setImagesSelected] = useState<Array<string>>([]);

    const navigator = useNavigate();

    const setImage = (image: string) => {
        setImagesSelected([...imagesSelected, image]);
    }

    const createHotel = () => {
        http.post("api/hotels/create", { 
            name: name, 
            description: description, 
            base64: imagesSelected 
        });

        navigator("/hotel");
    }

    const onDeleteImage = (index: number) => {
        const arrayPartOne = imagesSelected.slice(0, index);
        const arrayPartTwo = imagesSelected.slice(index + 1);

        setImagesSelected([...arrayPartOne, ...arrayPartTwo]);
    }

    return (
        <>
            <Container disableGutters maxWidth="lg" component="main" sx={{ pt: 8, pb: 6 }}>
                <Paper sx={{ mb: 3, p: 3 }} >
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <Typography variant="h6" gutterBottom>
                                Basic details
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                sx={{ mb: 2, }}
                                id="outlined-basic"
                                label="Name"
                                fullWidth
                                variant="outlined"
                                onChange={(e) => { setName(e.target.value) }}
                            />
                            <TextField
                                id="outlined-basic"
                                label="Description"
                                fullWidth
                                variant="outlined"
                                onChange={(e) => { setDescription(e.target.value) }}
                            />
                        </Grid>
                    </Grid>
                </Paper>

                <Paper sx={{ mb: 3, p: 3 }} >
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <Typography variant="h6" gutterBottom>
                                Images
                            </Typography>
                        </Grid>

                        <Grid item xs={8}>
                            <CropperDialog
                                getImage={setImage}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} justifyContent="flex-end">
                        <Grid item xs={8} >
                            <ImageList
                                sx={{ maxHeight: 450 }}
                                cols={3}
                            >
                                {imagesSelected.map((item, key) => {
                                    return (
                                        <ImageListItem key={key}>
                                            <img
                                                src={item}
                                                alt="images"
                                                loading="lazy"
                                            />
                                            <ImageListItemBar
                                                sx={{ background: 'transparent' }}
                                                position="top"
                                                actionIcon={
                                                    <IconButton
                                                        sx={{ color: 'white' }}
                                                        onClick={() => onDeleteImage(key)}
                                                    >
                                                        <ClearIcon />
                                                    </IconButton>
                                                }
                                            />
                                        </ImageListItem>
                                    )
                                })}
                            </ImageList>
                        </Grid>
                    </Grid>
                </Paper>

                <Box>
                    <Grid container spacing={2} justifyContent="flex-end">
                        <Button
                            sx={{ my: 3, px: 4, py: 0.75 }}
                            variant="outlined"
                            href="/hotel"
                        >
                            Back
                        </Button>
                        <Button
                            sx={{ my: 3, ml: 3, px: 4, py: 0.75 }}
                            variant="contained"
                            onClick={createHotel}
                        >
                            Create
                        </Button>
                    </Grid>
                </Box>

            </Container>
        </>
    );
}

export default HotelCreate;
