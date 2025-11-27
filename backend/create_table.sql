-- Drop existing table
DROP TABLE IF EXISTS student_results;

-- Create new table with subject-specific column names
CREATE TABLE student_results (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_name VARCHAR(255) NOT NULL,
    roll_no VARCHAR(255) NOT NULL,
    
    -- ANN (Artificial Neural Networks)
    ann_mse DOUBLE CHECK (ann_mse >= 0 AND ann_mse <= 30),
    ann_ese DOUBLE CHECK (ann_ese >= 0 AND ann_ese <= 70),
    
    -- CNT (Computer Networks and Technologies)
    cnt_mse DOUBLE CHECK (cnt_mse >= 0 AND cnt_mse <= 30),
    cnt_ese DOUBLE CHECK (cnt_ese >= 0 AND cnt_ese <= 70),
    
    -- DAA (Design and Analysis of Algorithms)
    daa_mse DOUBLE CHECK (daa_mse >= 0 AND daa_mse <= 30),
    daa_ese DOUBLE CHECK (daa_ese >= 0 AND daa_ese <= 70),
    
    -- CC (Cloud Computing)
    cc_mse DOUBLE CHECK (cc_mse >= 0 AND cc_mse <= 30),
    cc_ese DOUBLE CHECK (cc_ese >= 0 AND cc_ese <= 70)
) ENGINE=InnoDB;
