package hotel.controllers;

import hotel.entities.City;
import hotel.repositories.CityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/cities/")
public class CityController {
    private final CityRepository cityRepository;

    @GetMapping("/{id}")
    public City getById(@PathVariable("id") int id) {
        return cityRepository.findById(id).get();
    }

    @PostMapping("")
    public City create (City region) {
        return cityRepository.save(region);
    }

    @PutMapping("")
    public City update (City region) {
        return cityRepository.save(region);
    }

    @DeleteMapping("/{id}")
    public void delete(int id) {
        cityRepository.deleteById(id);
    }
}
