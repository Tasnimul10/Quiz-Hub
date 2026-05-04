<?php
    include "config.php";

    $id=$_GET['id'];

    if(isset($_POST['update'])){

        $date=$_POST['date'];
        $mechanic=$_POST['mechanic'];

        $conn->query("UPDATE appointments
        SET mechanic_id='$mechanic',
        appointment_date='$date'
        WHERE id='$id'");

        echo "Appointment Updated";

    }
?>
<img src="images/cars.jpg" 
         style="position:fixed; 
                top:0; 
                left:0; 
                width:100%; 
                height:100%; 
                object-fit:cover; 
                z-index:-1;">
<form method="POST" style="position: relative; z-index: 1; background: rgba(255, 255, 255, 0.8); padding: 20px; border-radius: 8px; max-width: 400px; margin: 100px auto; gap: 25px;">

    <input type="date" name="date" required>

    <select name="mechanic">

    <?php

        $result=$conn->query("SELECT * FROM mechanics");

        while($row=$result->fetch_assoc()){

            echo "<option value='".$row['id']."'>".$row['name']."</option>";

        }

    ?>

    </select>

    <button name="update" style="background-color: rgb(98, 137, 229); color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">Update</button>

</form>
