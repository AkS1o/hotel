package hotel.repositories;

import hotel.entities.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImageRepository extends JpaRepository<Image, Integer> {
    List<Image> findByName(String name);
    List<Image> findByHotelId(Integer hotelId);
}
