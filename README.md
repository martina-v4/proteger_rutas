# Food Store: Autenticación y Roles con TypeScript

Trabajo Práctico Integrador de Programación III. Evolución de la aplicación "Food Store" hacia un sistema con **registro, login, sesión persistente y protección de rutas por rol**, usando **TypeScript**, **Vite** y **localStorage**.

Autora: Martina Vergara

## ⚠️ Aviso de seguridad

La protección de rutas de este proyecto es **educativa y NO es segura**. Toda la información (usuarios, contraseñas y sesión) se guarda en `localStorage`, en el navegador. Cualquier persona puede abrir las herramientas de desarrollador, modificar esos datos y saltarse la protección. Además, las contraseñas se guardan en texto plano.

La seguridad real debe implementarse en un **backend** (con contraseñas hasheadas, tokens y validación de roles en el servidor). Este proyecto deja la lógica separada para poder reemplazar `localStorage` por una API en el futuro.

## Requisitos

- [Node.js](https://nodejs.org/) (versión LTS)
- [Git](https://git-scm.com/)
- Un navegador moderno (se recomienda Chrome)

## Instalación y ejecución

1. Clonar el repositorio:

```bash
   git clone https://github.com/martina-v4/proteger_rutas.git
   cd proteger_rutas
```

2. Instalar las dependencias:

```bash
   npm install
```

3. Iniciar el servidor de desarrollo:

```bash
   npm run dev
```

4. Abrir en el navegador la dirección que aparece en la terminal (normalmente `http://localhost:5173`) y entrar a la página de login:

```
   http://localhost:5173/src/pages/auth/login/login.html
```

## Usuarios de prueba

| Rol | Email | Contraseña |
|---|---|---|
| Administrador | `admin@foodstore.com` | `admin123` |
| Cliente | el que se registre desde la página de registro | (la que elija el usuario) |

El administrador de prueba se crea automáticamente la primera vez que se abre el login o el registro. Los usuarios que se registran siempre tienen el rol `client`.

## Funcionamiento

### 1. Registro (`src/pages/auth/registro/`)

- Formulario con **email y contraseña** (sin selector de rol).
- Valida que los campos estén completos y que la contraseña tenga al menos 6 caracteres.
- **No permite emails duplicados** (la comparación ignora mayúsculas y minúsculas).
- Guarda el usuario en un **array de objetos** en `localStorage`, bajo la clave `"users"`.

### 2. Login y sesión (`src/pages/auth/login/`)

- Busca en el array `"users"` un usuario con el mismo email y contraseña.
- Si coincide, guarda la sesión (`email`, `role`, `loggedIn`) en `localStorage` bajo la clave `"userData"` y redirige según el rol.
- Si no coincide, muestra un mensaje de error.
- El botón **Logout** elimina `"userData"` y vuelve al login.

### 3. Protección de rutas (`src/main.ts`)

`main.ts` se carga en el `<head>` de todas las páginas y ejecuta la función `protegerRuta()` en cada carga (incluido el recargar la página):

- Sin sesión y entrando a `/admin/` o `/client/`: redirige al login.
- Con rol `client` entrando a `/admin/`: redirige al home de cliente.
- Con rol `admin` entrando a `/client/`: redirige al home de admin.
- Con sesión iniciada y entrando al login o al registro: redirige al home del rol.
- Si el JSON de `"userData"` está corrupto o el rol no es válido, se considera que no hay sesión.

## Estructura del proyecto

```
src/
├── main.ts                  # Guard centralizado de rutas
├── pages/
│   ├── auth/
│   │   ├── login/           # login.html y login.ts
│   │   └── registro/        # registro.html y registro.ts
│   ├── admin/home/          # Vista solo para administradores
│   └── client/home/         # Vista solo para clientes
├── types/
│   ├── IUser.ts             # Sesión activa (email, loggedIn, role)
│   ├── IUserRegistrado.ts   # Usuario registrado (email, password, role)
│   └── Rol.ts               # "client" | "admin"
└── utils/
    ├── auth.ts              # Logout
    ├── localStorage.ts      # Lectura y escritura de "users" y "userData"
    └── navigate.ts          # Redirección
```

## Tecnologías

- TypeScript
- Vite
- HTML y CSS
- localStorage