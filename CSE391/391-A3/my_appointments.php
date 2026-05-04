<?php
session_start();
include "config.php";

if(!isset($_SESSION['user_id'])){
    header("Location: login.php");
    exit();
}

$user_id = $_SESSION['user_id'];
?>

<!DOCTYPE html>
<html>
<head>
    <title>My Appointments</title>
    <link rel="stylesheet" href="style.css">
</head>
<body class="dashboard-page">

    <h2>My Appointments</h2>

    <table border="1">
        <thead>
            <tr>
                <th>Date</th>
                <th>Mechanic Name</th> <th>Car License</th>
                <th>Engine No</th>
            </tr>
        </thead>
        <tbody>
            <?php
            $sql = "SELECT a.*, m.name AS mechanic_name 
                    FROM appointments a
                    JOIN mechanics m ON a.mechanic_id = m.id
                    WHERE a.user_id = '$user_id'";
            
            $result = mysqli_query($conn, $sql);

            if ($result && mysqli_num_rows($result) > 0) {
                while($row = mysqli_fetch_assoc($result)){
                    echo "<tr>";
                    echo "<td>".$row['appointment_date']."</td>";
                    echo "<td>".$row['mechanic_name']."</td>"; 
                    echo "<td>".$row['car_license']."</td>";
                    echo "<td>".$row['engine_no']."</td>";
                    echo "</tr>";
                }
            } else {
                echo "<tr><td colspan='4'>No appointments found.</td></tr>";
            }
            ?>
        </tbody>
    </table>

    <p style="text-align:center;"><a href="user_dashboard.php">Back to Dashboard</a></p>

</body>
</html>