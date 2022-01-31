package hotel.controllers;

import hotel.entities.Hotel;
import hotel.entities.Region;
import hotel.repositories.RegionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class HomeController {
    private final RegionRepository regionRepository;

    @Autowired
    public HomeController(RegionRepository regionRepository) {
        this.regionRepository = regionRepository;
    }

    @GetMapping("/books")
    public List<Region> get() {
        return regionRepository.findAll();
    }

    @GetMapping("/book/{id}")
    public Region get(int id) {
        return regionRepository.findById(id).get();
    }

    @PostMapping("/book")
    public Region create (Region region) {
        return regionRepository.save(region);
    }

    @PutMapping("/book")
    public Region update (Region region) {
        return regionRepository.save(region);
    }

    @DeleteMapping("/book/{id}")
    public void delete(int id) {
        regionRepository.deleteById(id);
    }
}
