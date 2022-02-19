import { FC, LegacyRef, useState } from "react";
import React from "react";
import Cropper from "cropperjs";

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

import Button from '@mui/material/Button';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import "cropperjs/dist/cropper.css";

import http, { ConnectURL } from "../../http_comon"

const Photo: FC = () => {
	const [open, setOpen] = React.useState(false);

	const imgRef = React.useRef<HTMLImageElement>(null);
	const prevRef = React.useRef<HTMLImageElement>(null);

	const [imageCropper, setImageCropper] = useState<Cropper>();
	const [imageSelected, setImageSelected] = useState<Array<string>>([]);

	const selectImage = (path: string) => {
		if (!imageCropper) {
			const cropper = new Cropper(imgRef.current as HTMLImageElement, {
				aspectRatio: 1 / 1,
				viewMode: 1,
				dragMode: 'move',
				preview: prevRef.current as HTMLImageElement,
			});
			cropper.replace(path);
			setImageCropper(cropper);
		}
		else {
			imageCropper.replace(path);
		}
	}

	const handleChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
		await setOpen(true);

		const fileList = e.target.files;
		if (!fileList || fileList.length === 0) return;

		await selectImage(URL.createObjectURL(fileList[0]));
	};

	const handleAgree = async () => {
		const image = imageCropper?.getCroppedCanvas().toDataURL() as string;
		const imgName = await http.post<string>("upload/", { base64: image });

		setImageSelected([...imageSelected, ConnectURL + "files/" + imgName.data]);

		setOpen(false);
		setImageCropper(undefined);
	}

	const handleClose = () => {
		setOpen(false);
		setImageCropper(undefined);
	};

	return (
		<>
			<Container disableGutters maxWidth="lg" component="main" sx={{ pt: 8, pb: 6 }}>
				<Grid container spacing={2}>
					<Grid item xs={4}>
						<Box sx={{ mt: 1, }}>
							<label htmlFor="Image">
								<img
									src="https://cdn.picpng.com/icon/upload-files-icon-66764.png"
									style={{
										width: "200px",
										cursor: "pointer"
									}}
									alt="avatar" />
							</label>
							<input
								type="file"
								name="Image"
								id="Image"
								style={{ display: "none" }}
								onChange={handleChangeImage}
							/>
						</Box>
					</Grid>
					<Grid item xs={8}>
						<Box sx={{ mt: 1, }}>
							<ImageList variant="masonry" cols={3} gap={8}>
								{imageSelected.map((item, key) => {
									return (
										<ImageListItem key={key}>
											<img
												//src={item}
												src={`${item}?w=248&fit=crop&auto=format`}
												srcSet={`${item}?w=248&fit=crop&auto=format&dpr=2 2x`}
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

			<Dialog
				open={open}
				onClose={handleClose}
				maxWidth="lg"
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description" >
				<DialogTitle
					id="alert-dialog-title" >
					Use Google's location service?
				</DialogTitle>
				<DialogContent>
					<Grid container spacing={2} columns={12}>
						<Grid item xs={9}>
							<div>
								<img
									ref={imgRef}
									id="image"
									style={{ width: "80%" }}
									alt="avatar" />
							</div>
						</Grid>
						<Grid item xs={3}>
							<div ref={prevRef as LegacyRef<HTMLDivElement>}
								style={{
									width: "200px",
									height: "200px",
									border: "1px solid silver",
									overflow: "hidden",
								}}>
							</div>
						</Grid>
					</Grid>
				</DialogContent>
				<DialogActions>
					<Button autoFocus onClick={handleClose}>Disagree</Button>
					<Button autoFocus onClick={handleAgree}>Agree</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}

export default Photo;