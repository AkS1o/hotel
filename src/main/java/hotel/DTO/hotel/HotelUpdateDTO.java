package hotel.DTO.hotel;

import lombok.Data;

import java.util.List;

@Data
public class HotelUpdateDTO {
    private String name;
    private String description;
    private List<String> imagesNew;
    private List<String> imagesDeleted;
}
