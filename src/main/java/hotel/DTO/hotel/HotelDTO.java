package hotel.DTO.hotel;

import lombok.Data;

import java.util.List;

@Data
public class HotelDTO {
    private String name;
    private String description;
    private List<String> base64;
}
