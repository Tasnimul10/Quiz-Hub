<?php
    include "config.php";

    if(!isset($_SESSION['user_id'])){
        header("Location: login.php");
        exit();
    }
?>

<!DOCTYPE html>
<html>

<head>

    <title>User Dashboard</title>
    <link rel="stylesheet" href="u_dash.css">

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
     <div class="dashboard-container">

        <h1 style="color: white;">Welcome to Your Dashboard</h1>

    <div class="dashboard-cards">

        <div class="card">

            <h3>Book Appointment</h3>

             <p>Schedule a mechanic for your car service.</p>

            <a href="appointment.php" class="card-btn">Make Appointment</a>

        </div>


    <div class="card">

        <h3>My Appointments</h3>

        <p>Check your booked appointments.</p>

        <a href="my_appointments.php" class="card-btn">View Appointments</a>

        </div>


            <div class="card">

                <h3>Profile</h3>

                <p>View your personal information.</p>

                <a href="profile.php" class="card-btn">View Profile</a>


            </div>

        </div>

    </div>

</body>
</html>
