package hotel.entities;

import lombok.Data;
import javax.persistence.*;

@Data
@Entity
@Table(name="tbl_hotels")
public class Hotel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name="name", length = 200)
    private String name;

    @Column(name="description",length = 1000)
    private String description;
}
