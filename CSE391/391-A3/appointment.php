<?php
    include "config.php";

    if(isset($_POST['submit'])){

        $user=$_SESSION['user_id'];
        $mechanic=$_POST['mechanic'];
        $license=$_POST['license'];
        $engine=$_POST['engine'];
        $date=$_POST['date'];

        $check=$conn->query("SELECT * FROM appointments 
        WHERE user_id='$user' AND appointment_date='$date'");

        if($check->num_rows>0){
            echo "You already have appointment on this date.";
            exit();
            }

        $count=$conn->query("SELECT * FROM appointments 
        WHERE mechanic_id='$mechanic' AND appointment_date='$date'");

        if($count->num_rows>=4){
            echo "Mechanic already full.";
            exit();
        }

        $sql="INSERT INTO appointments(user_id,mechanic_id,car_license,engine_no,appointment_date)
        VALUES('$user','$mechanic','$license','$engine','$date')";

        $conn->query($sql);

        echo "Appointment Successful";
    }
?>

<!DOCTYPE html>
<html>
<head>
<title>Appointment</title>
<link rel="stylesheet" href="style.css">
<script src="script.js"></script>
</head>

<body>
    <img src="images/cars.jpg" 
         style="position:fixed; 
                top:0; 
                left:0; 
                width:100%; 
                height:100%; 
                object-fit:cover; 
                z-index:-1;">
    <div class="container">
        <h2>Book Appointment</h2>
        <form method="POST" onsubmit="return validateForm()">

            <input type="text" name="license" placeholder="Car License No">

            <input type="text" name="engine" placeholder="Engine Number">

            <input type="date" name="date">

            <select name="mechanic">

                <option value="">Select Mechanic</option>

                <?php

                    $result=$conn->query("SELECT * FROM mechanics");

                    while($row=$result->fetch_assoc()){

                        $id=$row['id'];

                        $count=$conn->query("SELECT * FROM appointments WHERE mechanic_id='$id'");

                        $free=4-$count->num_rows;

                        echo "<option value='$id'>".$row['name']." (Free slots:$free)</option>";

                    }

                ?>

            </select>

            <button name="submit">Book</button>

        </form>
    </div>
</body>
</html>
