<link rel="stylesheet" href="/style.css">
<script src="/prepscripts.js"></script>
<body>
<center>
<p class=text><a href="/">Home Page</a></p>
<p class=text><a href="/prep.php">Add to the prep list</a></p>
<p class=text id="currentListHolder"></p>
</center>
</body>
<script>outputCurrentPrepList(); setInterval(outputCurrentPrepList, 3000)</script>