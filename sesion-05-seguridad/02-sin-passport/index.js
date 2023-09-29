const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");

const JWT_SECRET = "ssshhhh!!!";
const db = {
	id: 1,
	username: "paquito_caliente69420",
	password: "123123123",
};

app.use(express.json());

app.get("/protegida", function (request, response) {
	console.log(request.user);
	response.send("Sólo usuarios con sesión pueden ver esto");
});

app.get("/publica", function (request, response) {
	response.send("Cualquiera puede ver esta ruta :D");
});

app.post("/login", function (request, response) {
	const { username, password } = request.body;

	// Si cumple esta condición, el usuario tiene sesión
	if (db.username === username && db.password === password) {
		// Se debe de generar un token de JWT
		const token = jwt.sign({ id: db.id }, JWT_SECRET);
		response.status(200).json({ jwt: token });
	} else {
		response.status(401).json({
			error: "Usuario o contraseña invalidos",
		});
	}
});

app.listen(8080, function () {
	console.log("> Servidor escuchando puerto 8080");
});
