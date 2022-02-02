package hotel.controllers;

import hotel.entities.Region;
import hotel.repositories.RegionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/regions/")
public class RegionController {
    private final RegionRepository regionRepository;

    @GetMapping("/{id}")
    public Region getById(@PathVariable("id") int id) {
        return regionRepository.findById(id).get();
    }

    @PostMapping("")
    public Region create (Region region) {
        return regionRepository.save(region);
    }

    @PutMapping("")
    public Region update (Region region) {
        return regionRepository.save(region);
    }

    @DeleteMapping("/{id}")
    public void delete(int id) {
        regionRepository.deleteById(id);
    }
}
