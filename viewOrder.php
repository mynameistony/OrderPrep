<link rel="stylesheet" href="/style.css">
<script src="scripts.js"></script>
<body>
<center>
<p class=text><a href="/">Home Page</a></p>
<p class=text><a href="/order.php">Add to the order list</a></p>
<p class=text id="currentListHolder"></p>
</center>
</body>
<script>outputCurrentList(); setInterval(outputCurrentList, 3000)</script>
