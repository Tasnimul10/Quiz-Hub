<?php
session_start();
include "config.php";

if(!isset($_SESSION['user_id'])){
    header("Location: login.php");
    exit();
}

$id = $_SESSION['user_id'];
$sql = "SELECT * FROM users WHERE id='$id'";
$result = mysqli_query($conn, $sql);
$row = mysqli_fetch_assoc($result);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>User Profile</title>
    <link rel="stylesheet" href="style.css">
</head>
<body class="dashboard-page">
    <img src="images/cars.jpg" 
         style="position:fixed; 
                top:0; 
                left:0; 
                width:100%; 
                height:100%; 
                object-fit:cover; 
                z-index:-1;"

    <div class="dashboard-container">
        <div class="container" style="margin-top: 20px; text-align: left;">
            <h2 style="border-bottom: 2px solid #3498db; padding-bottom: 10px; margin-bottom: 20px;">
                Personal Profile
            </h2>

            <div class="profile-info">
                <p><strong>Full Name:</strong> <?php echo htmlspecialchars($row['name']); ?></p>
                <p><strong>Username:</strong> <?php echo htmlspecialchars($row['username']); ?></p>
                <p><strong>Phone Number:</strong> <?php echo htmlspecialchars($row['phone']); ?></p>
                <p><strong>Address:</strong> <?php echo htmlspecialchars($row['address']); ?></p>
            </div>

            <hr style="margin: 20px 0; border: 0; border-top: 1px solid #eee;">

            <div style="display: flex; gap: 10px;">
                <a href="user_dashboard.php" class="card-btn">Back</a>
            </div>
        </div>
    </div>

</body>
</html>