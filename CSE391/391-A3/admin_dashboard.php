<?php
session_start();
include "config.php";

if(!isset($_SESSION['role']) || $_SESSION['role'] != "admin"){
    header("Location: login.php");
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Admin Panel - Workshop</title>
    <link rel="stylesheet" href="admin.css">
</head>
<body class="dashboard-page">
    <img src="images/cars.jpg" 
         style="position:fixed; 
                top:0; 
                left:0; 
                width:100%; 
                height:100%; 
                object-fit:cover; 
                z-index:-1;">

    <div class="navbar">
        <a href="logout.php" class="logout-btn">Logout</a>
    </div>

    <div class="dashboard-container" style="max-width: 1200px;">
        <h1 style="margin-bottom: 20px; text-align: center;">Workshop Appointments</h1>
        
        <div class="card" style="width: 100%; max-width: 100%; text-align: left;">
            <table style="width: 100%; margin-top: 10px;">
                <thead>
                    <tr style="background: #2c3e50; color: white;">
                        <th>Client Name</th>
                        <th>Phone</th>
                        <th>Car License</th>
                        <th>Date</th>
                        <th>Assigned Mechanic</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                        $sql = "SELECT appointments.*, users.name, users.phone, mechanics.name AS mechanic_name 
                                FROM appointments 
                                JOIN users ON appointments.user_id = users.id 
                                JOIN mechanics ON appointments.mechanic_id = mechanics.id
                                ORDER BY appointments.appointment_date DESC";

                        $result = $conn->query($sql);

                        if ($result->num_rows > 0) {
                            while($row = $result->fetch_assoc()){
                                echo "<tr>";
                                echo "<td><strong>" . htmlspecialchars($row['name']) . "</strong></td>";
                                echo "<td>" . htmlspecialchars($row['phone']) . "</td>";
                                echo "<td><span style='background:#eee; padding:3px 8px; border-radius:4px; font-family:monospace;'>" . htmlspecialchars($row['car_license']) . "</span></td>";
                                echo "<td>" . htmlspecialchars($row['appointment_date']) . "</td>";
                                echo "<td>" . htmlspecialchars($row['mechanic_name']) . "</td>";
                                echo "<td><a href='update_appointment.php?id=".$row['id']."' class='card-btn' style='text-decoration: none; padding:5px 12px; font-size:18px;'>Update</a></td>";
                                echo "</tr>";
                            }
                        } else {
                            echo "<tr><td colspan='6' style='text-align:center;'>No appointments found.</td></tr>";
                        }
                    ?>
                </tbody>
            </table>
        </div>
    </div>

</body>
</html>