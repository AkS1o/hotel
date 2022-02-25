import { FC, useState } from "react";

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

import CropperDialog from "../../components/CropperDialog";

const Photo: FC = () => {
	const [imagesSelected, setImagesSelected] = useState<Array<string>>([]);

    const setImage = (image: string) => {
        setImagesSelected([...imagesSelected, image]);
    }

	return (
		<>
			<Container disableGutters maxWidth="lg" component="main" sx={{ pt: 8, pb: 6 }}>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <CropperDialog getImage={setImage} />
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

export default Photo;