<!DOCTYPE html>
<html lang="en">
	<head>
		<meta name="viewport" content="width=device-width, initial-scale=1.0" charset="utf-8">
		<title>hello!</title>
		<script type="text/javascript" src="jquery.min.js"></script>
		<script type="text/javascript" src="bootstrap.bundle.min.js"></script>
		<script type="text/javascript" src="clock.js"></script>
		<link href="bootstrap.min.css" rel="stylesheet" type="text/css">
		<link rel="icon" type="image/x-icon" href="favicon.ico">
		<link href="style.css" rel="stylesheet" type="text/css">
		<link href="https://fonts.googleapis.com/css?family=Lora" rel="stylesheet" type="text/css">
		<link href="https://fonts.googleapis.com/css?family=Dancing+Script" rel="stylesheet" type="text/css">
		<link href="https://fonts.googleapis.com/css?family=Roboto+Mono" rel="stylesheet" type="text/css">
	</head>
	<body onload="displayTime()">

		<nav class="navbar navbar-expand-lg bg-light justify-content-center">
			<a class="navbar-brand" href="#"><img src="../byto.png" class="navimg"></a>
			<div class="collapse navbar-collapse" id="navbarSupportedContent">
			<ul class="navbar-nav me-auto mb-2 mb-lg-0">
				<li class="nav-item"><a class="nav-link active" aria-current="page" href="index.html">Sobre mim</a></li>
				<li class="nav-item dropdown">
         			<a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
					Projetos
					</a>
          			<ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
						<li><a class="dropdown-item" href="./pixelart/">Pixel Art Maker</a></li>
						<li><a class="dropdown-item" href="./calc/">Calculadora</a></li>
						<li><a class="dropdown-item" href="./convert/">Conversor de numerais</a></li>
						<li><hr class="dropdown-divider"></li>						
        			</ul></li>
	    		<li class="nav-item"><a class="nav-link active" aria-current="page" href="#">Contatos</a></li>
			</ul>
				<span class="navbar-brand cuteb">Bem vindos!</span>
			    <p id="time"></p> 

			</div>
		</nav>


	</body>
</html>