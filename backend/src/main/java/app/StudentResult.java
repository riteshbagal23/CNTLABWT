package app;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
@Table(name = "student_results")
public class StudentResult {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(name = "student_name", nullable = false)
    private String studentName;

    @NotBlank
    @Column(name = "roll_no", nullable = false)
    private String rollNo;

    @Min(0) @Max(30)
    @Column(name = "ann_mse")
    private double annMse;
    
    @Min(0) @Max(70)
    @Column(name = "ann_ese")
    private double annEse;

    @Min(0) @Max(30)
    @Column(name = "cnt_mse")
    private double cntMse;
    
    @Min(0) @Max(70)
    @Column(name = "cnt_ese")
    private double cntEse;

    @Min(0) @Max(30)
    @Column(name = "daa_mse")
    private double daaMse;
    
    @Min(0) @Max(70)
    @Column(name = "daa_ese")
    private double daaEse;

    @Min(0) @Max(30)
    @Column(name = "cc_mse")
    private double ccMse;
    
    @Min(0) @Max(70)
    @Column(name = "cc_ese")
    private double ccEse;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getStudentName() { return studentName; }
    public void setStudentName(String studentName) { this.studentName = studentName; }

    public String getRollNo() { return rollNo; }
    public void setRollNo(String rollNo) { this.rollNo = rollNo; }

    public double getAnnMse() { return annMse; }
    public void setAnnMse(double annMse) { this.annMse = annMse; }
    
    public double getAnnEse() { return annEse; }
    public void setAnnEse(double annEse) { this.annEse = annEse; }

    public double getCntMse() { return cntMse; }
    public void setCntMse(double cntMse) { this.cntMse = cntMse; }
    
    public double getCntEse() { return cntEse; }
    public void setCntEse(double cntEse) { this.cntEse = cntEse; }

    public double getDaaMse() { return daaMse; }
    public void setDaaMse(double daaMse) { this.daaMse = daaMse; }
    
    public double getDaaEse() { return daaEse; }
    public void setDaaEse(double daaEse) { this.daaEse = daaEse; }

    public double getCcMse() { return ccMse; }
    public void setCcMse(double ccMse) { this.ccMse = ccMse; }
    
    public double getCcEse() { return ccEse; }
    public void setCcEse(double ccEse) { this.ccEse = ccEse; }

    // Calculate subject total (MSE is out of 30, ESE is out of 70, total = 100)
    public double getAnnTotal() {
        return annMse + annEse;
    }

    public double getCntTotal() {
        return cntMse + cntEse;
    }

    public double getDaaTotal() {
        return daaMse + daaEse;
    }

    public double getCcTotal() {
        return ccMse + ccEse;
    }

    public double getTotalMarks() {
        return getAnnTotal() + getCntTotal() + getDaaTotal() + getCcTotal();
    }
}
