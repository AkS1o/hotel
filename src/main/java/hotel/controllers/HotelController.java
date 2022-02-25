package hotel.controllers;

import hotel.DTO.HotelDTO;
import hotel.entities.Hotel;
import hotel.entities.Image;
import hotel.repositories.HotelRepository;
import hotel.repositories.ImageRepository;
import hotel.storage.StorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/hotels/")
public class HotelController {
    private final HotelRepository hotelRepository;
    private final ImageRepository imageRepository;
    private final StorageService storageService;

    @PostMapping("create")
    public void create (HotelDTO hotelDTO) {
        Hotel hotel = new Hotel();

        hotel.setName(hotelDTO.getName());
        hotel.setDescription(hotelDTO.getDescription());

        for(String base64 : hotelDTO.getBase64()) {
          String name = storageService.save(base64);
          Image image = new Image(name);
          imageRepository.save(image);
        }

        hotelRepository.save(hotel);
    }
}
