package hotel.entities;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name="tbl_images")
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name="name", length = 250)
    private String name;

    @Column(name = "hotel_id")
    private Integer hotelId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hotel_id", nullable = false, insertable = false, updatable = false)
    private Hotel hotel;
}
