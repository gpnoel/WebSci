<!DOCTYPE HTML>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>testing connecting to kenny's mysql</title>
    </head>
    <body>
        <?php
            $servername = "kennethwschmittcom.ipagemysql.com";
            $username = "sdd";
            $password = "sddimin";

            // Create connection
           /* $conn = new mysqli($servername, $username, $password);

            // Check connection
            if ($conn->connect_error) {
                die("Connection failed: " . $conn->connect_error);
            } 
            echo "Connected successfully";*/
            $link = mysql_connect('sql9.freemysqlhosting.net', 'sql9160186', 'JJkkGAHcka'); 
            if (!$link) { 
                die('Could not connect ' . mysql_error()); 
            } 
            echo 'Connected successfully'; 
            mysql_select_db('sql9160186');
        ?>
    </body>
</html>