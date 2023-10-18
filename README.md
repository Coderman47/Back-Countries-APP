# Back-Countries-APP

1. Cambiar el nombre del archivo .env.template a .env y proporcionar los valores a las variables de entorno.

2. Levantar el backend con:
```
npm start
```

3. Levantar el backend insertará en la base de datos de Postgres, de forma automática, todos los paises debido a la funcion: 
```
createCountriesToDb();
```

4. Ejecutar en Postman el siguiente endpoint para hacer un GET de los 250 paises de la API externa.
```
http://localhost:3001/countries
```

5. Devolver un pais buscando por ID alfabetico compuesto por 3 letras mayusculas.
```
http://localhost:3001/countries/:id
``` 

6. Devolver un pais buscado por su nombre. Hacer un GET a 
```
http://localhost:3001/countries?name=
```

7. Ejecutar solicitud POST en Postman para crear una actividad deportiva y relacionarla con los paises seleccionados.
```
http://localhost:3001/activities
```

Cuerpo para la solicitud POST ACTIVITY:
```
{
    "name": "Voley",
    "difficulty": 5,
    "duration": 30,
    "season": "Summer",
    "countries": ["Argentina", "Colombia"]
}
```

8. Devolver todas las actividades creadas mediante un GET a:
```
http://localhost:3001/activities
```