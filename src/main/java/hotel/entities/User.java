package hotel.entities;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Table(name="Users", schema = "dbo")
public class User {
    @Id
    @Column(name = "Id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "AboutMe", columnDefinition = "nvarchar")
    private String aboutMe;

    @Column(name = "Age", columnDefinition = "int")
    private Integer age;

    @Column(name = "CreationDate", nullable = false, columnDefinition = "datetime")
    @Temporal(TemporalType.TIMESTAMP)
    private Date creationDate;

    @Column(name = "DisplayName", length = 40, nullable = false, columnDefinition = "nvarchar")
    private String displayName;

    @Column(name = "DownVotes", nullable = false, columnDefinition = "int")
    private Integer  downVotes;

    @Column(name = "EmailHash", length = 40, columnDefinition = "nvarchar")
    private String emailHash;

    @Column(name = "LastAccessDate", nullable = false, columnDefinition = "datetime")
    @Temporal(TemporalType.TIMESTAMP)
    private Date lastAccessDate;

    @Column(name = "Location", length = 100, columnDefinition = "nvarchar")
    private String location;

    @Column(name = "Reputation", nullable = false, columnDefinition = "int")
    private Integer  reputation;

    @Column(name = "UpVotes", nullable = false, columnDefinition = "int")
    private Integer  upVotes;

    @Column(name = "Views", nullable = false, columnDefinition = "int")
    private Integer views;

    @Column(name = "WebsiteUrl", length = 200, columnDefinition = "nvarchar")
    private String websiteUrl;

    @Column(name = "AccountId", columnDefinition = "int")
    private int accountId;
}
