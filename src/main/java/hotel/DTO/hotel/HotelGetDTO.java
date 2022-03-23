package hotel.DTO.hotel;

import hotel.DTO.image.ImageDTO;
import lombok.Data;

import java.util.List;

@Data
public class HotelGetDTO {
    private int id;
    private String name;
    private String description;
    private List<ImageDTO> images;
}
