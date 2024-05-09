import { META_CONSTANTS } from "~/config/constants";

export default `
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>${META_CONSTANTS.APP_TITLE}</title>
		<link href="stylesheet.css" rel="stylesheet" />
		<link rel="preconnect" href="https://fonts.googleapis.com">
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
		<link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Rowdies&display=swap" rel="stylesheet">
	</head>
	<body>
		<div id="root"></div>
		<script src="./bundle.js"></script>
	</body>
</html>`;
