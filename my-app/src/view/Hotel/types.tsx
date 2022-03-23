export interface IImage {
    id: number,
    name: string
}

export interface IHotel {
    id: number,
    name: string,
    description: string,
    images: Array<IImage>
}

export interface IHotelUpdate {
    id: number,
    name: string,
    description: string,
    newImages: Array<String>,
    deleteImages: Array<IImage>
}
