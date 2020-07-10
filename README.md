# To Do community
> Backend: Sistema para una plataforma de gestión de proyectos (todo list) colaborativo desarrollada con MongoDB, Express, Node y Babel (para usar sintaxis ES6), ademas se utiliza la arquitectura de N-Capas para el desarrollo de los modulos y jest para las pruebas unitarias, cabe mencionar que esta api se consumirá posteriormente con una App hecha en ReactJS "frontend_todo-community".

## Modulos
> Se ira añadiendo más endpoint a esta api, pero por los momentos, se puede realizar las siguientes consultas.

### User

| Endpoint | HTTP | Description |
| --- | --- | ---|
| `/user/signup` | POST | Registar un usuario con los siguientes campos: fullName, email, passowrd y avatar (opcional) enviados por form-data, la petición retorna un status 201 y un objeto data con la información y token del usuario |
| `/user/signin` | POST | Inicia sesión con un usuario mediante los siguientes campos: email y passowrd enviado por data (json), la petición retorna un status 201 y un objeto data con la informacion y token del usuario |
| `/user/edit` | PATCH | Edita el nombre (fullName) de un usuario autenticado, el valor a actualizar se envia por query, la petición retorna un status 200 junto con un mensaje (message) |
| `/user/edit/avatar` | PATCH | Edita la imagen de perfil (avatar) de un usuario autenticado, el nuevo avatar se envia por form-data, la petición retorna un status 201 y el link del nuevo avatar |

### Project

| Endpoint | HTTP | Description |
| --- | --- | ---|
| `/project` | POST | Crea un project (para usuarios autenticado) con los siguientes campos: name, type y description (opcional), enviado por form-data, la petición retorna un status 201 junto con un objeto data con la información inicial del proyecto |
| `/project` | GET | Obtiene todos los proyecto en que participa un usuario authenticado, la petición retorna un status 201 y una lista data con los proyectos |
| `/project/public` | GET | Obtiene todos los proyecto publicos (type igual a public) (para usuario authenticado), la petición retorna un status 201 y lista data con los proyectos |
| `/project` | PATCH | Edita la información base de un projecto (name, type y description) solo válido para usuarios administradores, la petición retorna un status 200 y un mensaje (message) |
| `/project/collaborator/up` | PATCH | Otorga a un usuario colaborador credenciales de administrador de un projecto, se debe enviar por data los siguiente campos (projectId y collaboratorId), solo válido para usuarios creadores, la petición retorna un status 200 y un mensaje (message) |
| `/project/collaborator/down` | PATCH | remueve a un usuario colaborador sus credenciales de administrador de un projecto, se debe enviar por data los siguiente campos (projectId y collaboratorId), solo válido para usuarios creadores, la petición retorna un status 200 y un mensaje (message) |
| `/project/collaborator/delete` | PATCH | remueve a un usuario de un projecto, solo válido para usuarios creadores, se debe enviar por data los siguiente campos (projectId y collaboratorId), la petición retorna un status 200 y un mensaje (message) |
| `/project/panel` | POST | Crea una tarea para un proyecto con los siguientes campos: title, project (el id del proyecto), y description (opcional), enviado por data, la petición retorna un status 201 junto con un objeto data con la información inicial del panel |
| `/project/panel` | GET | Obtiene todos los paneles de un proyecto, válido para usuarios colaboradores, se debe enviar el id del proyecto por params, la petición retorna un status 201 y una lista data con los paneles |
| `/project/panel` | PATCH | Edita la información un panel (name, description, y tasks), ademas de los campos a actualizar se debe enviar por data los siguiente campos (projectId y panelId) solo válido para usuarios administradores, la petición retorna un status 200 y un mensaje (message) |
| `/project/panel/position` | PATCH | Edita la posición de un panel (para un sistema drag and drop), se debe enviar por data los siguiente campos (projectId, panelId, startPos y endPos) solo válido para usuarios administradores, la petición retorna un status 200 y un mensaje (message) |
| `/project/panel/task` | POST | Crea una tarea para un panel de proyecto con los siguientes campos: title, expire (opcional), description (opcional) y assigned (opcional), ademas de se debe enviar los siguiente campos (projectId y panelId) enviado por data, solo válido para usuarios administradores, la petición retorna un status 201 junto con un objeto data con la información inicial de la tarea |
| `/project/panel/task` | PATCH | Edita la información una tarea (title, description, expire y assigned), ademas de los campos a actualizar se debe enviar por data los siguiente campos (projectId, panelId y taskId) solo válido para usuarios administradores, la petición retorna un status 200 y un mensaje (message) |
| `/project/panel/task` | DELETE | Elimina una tarea de un panel de proyecto, solo válido para usuarios administradores, se debe enviar por data los siguiente campos (projectId, panelId y taskId), la petición retorna un status 200 y un mensaje (message) |
| `/project/panel/task/change` | PATCH | cambia una tarea de panel (excelente para un sistema drag and drop), se debe enviar por data los siguiente campos (projectId, panel1Id, panel2Id y taskId) solo válido para usuarios administradores, la petición retorna un status 200 y un mensaje (message) |
| `/project/panel/delete` | DELETE | Elimina un panel de un proyecto, solo válido para usuarios administradores, se debe enviar por data los siguiente campos (projectId, panelId y panelPosition), la petición retorna un status 200 y un mensaje (message) |
| `/project/invitation` | POST | Crea una invitación para un proyecto con los siguientes campos: emitter (el id del creador), receiver (el id del invitado), project (el id del proyecto) enviado por data, válido para usuarios creadores, la petición retorna un status 200 y un mensaje (message) |
| `/project/invitation` | GET | Obtiene todos las invitaciones de un usuario, válido para usuarios autenticado, la petición retorna un status 201 y una lista data con las invitaciones |
| `/project/invitation/:projectId` | GET | Obtiene todos las invitaciones de un proyecto, se debe enviar el id del proyecto por query, válido para usuarios creadores, la petición retorna un status 201 y una lista data con las invitaciones |
| `/project/invitation/accept` | PATCH | Acepta una invitación a colaborar, solo válido para usuarios autenticado (invitado), se debe enviar por data los siguiente campos (invitationId y projectId), la petición retorna un status 200 y un mensaje (message) |
| `/project/invitation/deny` | PATCH | Rechaza una invitación a colaborar, solo válido para usuarios autenticado (invitado), se debe enviar por data el campo invitationId, la petición retorna un status 200 y un mensaje (message) |
| `/project/invitation/delete` | DELETE | Elimina una invitacio de un proyecto, solo válido para usuarios creadores, se debe enviar por data los siguiente campos (projectId, invitationId), la petición retorna un status 200 y un mensaje (message) |
| `/project/:projectId` | DELETE | Elimina un proyecto, solo válido para usuarios creadores, se debe enviar el id del proyecto por query, la petición retorna un status 200 y un mensaje (message) |

## Como probar

### 1 - Clonar repositorio

debe tener instalado node y mongodb en su computadora.

### 2 - Instalar paquetes

ejecute el comando `npm install` en una terminal ubicada en la carpeta donde clonó el repositorio.

### 3 - Añadir credenciales de Cloudinary

cree una cuenta en cloudinary y coloque su name, key y secret en las variables de entorno CLOUDINARY_NAME, CLOUDINARY_KEY y CLOUDINARY_SECRET respectivamente, en el archivo `.env` de la raiz de la carpeta.

### 4 - Correr el server

ejecute el comando `npm run watch:dev` para correr el serve y quede en escucha, asi se reiniciará cada vez que se realice un cambio en el código.

### Otros comandos

* `transpile` - convierte el código ES6 de la carpeta `server-dev` a eES5 y lo guarda en una carpeta `server`
* `clean` - elimina la carpeta `server`
* `build` - ejecuta `clean` y luego `transpile`

## License
MIT (c) Damuel Querales