package hotel.mapper;

import hotel.DTO.hotel.HotelDTO;
import hotel.DTO.hotel.HotelGetDTO;
import hotel.entities.Hotel;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface HotelMapper {
    @Mapping(target = "images", ignore = true)
    Hotel HotelDTOToHotel(HotelDTO hotelDTO);

    HotelGetDTO HotelToHotelGetDTO(Hotel hotel);

    List<HotelGetDTO> HotelToHotelGetDTO(List<Hotel> hotel);
}
