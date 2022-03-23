package hotel.controllers;

import hotel.DTO.hotel.HotelDTO;
import hotel.DTO.hotel.HotelGetDTO;
import hotel.DTO.hotel.HotelUpdateDTO;
import hotel.entities.Hotel;
import hotel.entities.Image;
import hotel.mapper.HotelMapper;
import hotel.repositories.HotelRepository;
import hotel.repositories.ImageRepository;
import hotel.storage.StorageService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Tag(name = "Hotel")
@RestController
@RequiredArgsConstructor
@RequestMapping("api/hotels/")
public class HotelController {
    private final HotelRepository hotelRepository;
    private final ImageRepository imageRepository;
    private final StorageService storageService;

    private final HotelMapper hotelMapper;

    @GetMapping("/get/{id}")
    public ResponseEntity<HotelGetDTO> getById(@PathVariable int id) {
        Hotel hotel = hotelRepository.findById(id).orElse(null);
        HotelGetDTO hotelGetDTO = hotelMapper.HotelToHotelGetDTO(hotel);
        return ResponseEntity.ok().body(hotelGetDTO);
    }

    @GetMapping("/get")
    public ResponseEntity<List<HotelGetDTO>> getAll() {
        List<HotelGetDTO> hotels = hotelMapper.HotelToHotelGetDTO(hotelRepository.findAll());
        return ResponseEntity.ok().body(hotels);
    }

    @PostMapping("/create")
    public ResponseEntity<Hotel> create(@RequestBody HotelDTO hotelDTO) throws IOException {
        Hotel hotel = hotelMapper.HotelDTOToHotel(hotelDTO);
        hotelRepository.save(hotel);

        for (String base64 : hotelDTO.getBase64()) {
            String imageName = storageService.save(base64);

            Image image = new Image();
            image.setName(imageName);
            image.setHotelId(hotel.getId());
            imageRepository.save(image);
        }

        return ResponseEntity.ok().body(hotel);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Hotel> update(@PathVariable("id") int id, @RequestBody HotelUpdateDTO hotelUpdateDTO) {
        Hotel hotel = hotelRepository.findById(id).orElse(null);

        hotel.setName(hotelUpdateDTO.getName());
        hotel.setDescription(hotelUpdateDTO.getDescription());

        for (String base64 : hotelUpdateDTO.getImagesNew()) {
            String imageName = storageService.save(base64);

            Image image = new Image();
            image.setName(imageName);
            image.setHotelId(hotel.getId());
            imageRepository.save(image);
        }

        for (String name : hotelUpdateDTO.getImagesDeleted()) {
            List<Image> image = imageRepository.findByName(name);
            imageRepository.delete(image.get(0));

            storageService.delete(name);
        }

        return ResponseEntity.ok().body(hotel);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity delete(@PathVariable("id") int id) {
        Optional<Hotel> hotel = hotelRepository.findById(id);

        if (hotel.isPresent()) {
            List<Image> images = imageRepository.findByHotelId(id);
            for (Image image : images) {
                storageService.delete(image.getName());
                imageRepository.delete(image);
            }
            hotelRepository.delete(hotel.get());

            return ResponseEntity.ok().build();
        }

        return ResponseEntity.ok().build();
    }
}
