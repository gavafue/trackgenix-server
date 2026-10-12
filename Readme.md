# ⚙️ Trackgenix Server - Backend API REST (Node.js & MongoDB)

[![Node.js](https://img.shields.io/badge/Node.js-16+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-black?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas%20%2F%20Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Jest](https://img.shields.io/badge/Testing-Jest%20%26%20Supertest-C21325?style=for-the-badge&logo=jest&logoColor=white)](https://jestjs.io/)
[![Joi](https://img.shields.io/badge/Validation-Joi-orange?style=for-the-badge)]()
[![Postman](https://img.shields.io/badge/API-Postman%20Collection-FF6C37?style=for-the-badge&logo=postman&logoColor=white)](https://www.postman.com/)
[![Teamwork](https://img.shields.io/badge/Team-Agile%20%2F%20Scrum-blue?style=for-the-badge)]()
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)]()

Backend API REST robusto y escalable desarrollado para la plataforma de gestión de recursos humanos y seguimiento de horas trabajadas **Trackgenix**, construida en equipo durante el bootcamp intensivo **Radium Rocket (Become a Software Professional - BaSP 2022)**.

Provee servicios backend completos para autenticación, gestión jerárquica de usuarios (Super Admins, Admins, Project Managers y Empleados), asignación de proyectos, catalogación de tareas y registro cronológico de partes de horas (*time-sheets*).

Frontend asociado: [trackgenix-app](https://github.com/gavafue/trackgenix-app).

---

## 👥 Equipo de Desarrollo & Colaboradores

Desarrollado de forma colaborativa simulando un entorno de ingeniería corporativo con metodologías ágiles (**Scrum**), integración continua y revisión de código:

### Equipo Core
| Desarrollador / Colaborador | Perfil GitHub | Responsabilidades Principales |
| :--- | :--- | :--- |
| **Gabriel Vázquez** | [@gavafue](https://github.com/gavafue) | Endpoints REST, esquemas de Mongoose, middlewares de autenticación y tests de integración |
| **Octavio Rodríguez Paseyro** | [@OctavioRodriguezPaseyro](https://github.com/OctavioRodriguezPaseyro) | Controladores, validaciones con Joi y lógica de negocio de recursos |
| **Paula Rinaldi** | [@paurinaldi](https://github.com/paurinaldi) | Modelado de datos, configuración de rutas y documentación técnica |
| **Marcia Berón** | [@MarciaBeron](https://github.com/MarciaBeron) | Endpoints de proyectos, empleados y contratos |
| **Pablo Nicolás Correa** | [@pcorreadev](https://github.com/pcorreadev) | Lógica de partes de horas (*time-sheets*) y catálogo de tareas |

### Colaboradores de Células de Backend & Cohorte
* **Alexis Ezequiel Suárez** ([@SuarezAlexisEzequiel](https://github.com/SuarezAlexisEzequiel))
* **Iara Criscenti** ([@iaracriscenti](https://github.com/iaracriscenti))
* **Marco Migliaro** ([@marcomigliaro](https://github.com/marcomigliaro))
* **Alejandro Santini** ([@AlejandroSantini](https://github.com/AlejandroSantini))
* **Nicolás Lalicata** ([@nicolaslalicata](https://github.com/nicolaslalicata))
* **Alan Acosta (DeepFreq)** ([@DeepFreq](https://github.com/DeepFreq))
* **Johsua Nowak** ([@Johsua30](https://github.com/Johsua30))
* **Shirley Seaton** ([@Shirley1702](https://github.com/Shirley1702))
* **Cristian (cristulian)** ([@cristulian](https://github.com/cristulian))

### 🎓 Tech Lead & Mentor
* **Samuel Trillo** ([@samueltrilloRR](https://github.com/samueltrilloRR)) - Tutor técnico, diseño de arquitectura y Code Reviewer (Radium Rocket).

---

## 🏗️ Arquitectura de la API

```mermaid
flowchart LR
    Client["🖥️ Cliente Frontend / Postman"] --> Router["Express Router"]
    Router --> Middleware["Auth & CORS Middlewares"]
    Middleware --> Validation["Joi Schemas Validation"]
    Validation --> Controller["Controllers (Lógica de Negocio)"]
    Controller --> Model["Mongoose ODM Models"]
    Model --> DB[("🍃 MongoDB Atlas")]
```

---

## 🎯 Entidades y Recursos de la API

| Recurso | Endpoints Principales | Descripción |
| :--- | :--- | :--- |
| **Super Admins** | `/api/super-admins` | Administración global del sistema y configuración de tenants |
| **Admins** | `/api/admins` | Gestión departamental, contrataciones y supervisión |
| **Employees** | `/api/employees` | Nómina de empleados, perfiles, tarifas horarias y datos personales |
| **Projects** | `/api/projects` | Creación de proyectos, asignación de PMs y vinculación de equipos |
| **Tasks** | `/api/tasks` | Catálogo de tipos de actividades laborales |
| **Time Sheets** | `/api/time-sheets` | Registro detallado de horas trabajadas por empleado, fecha y proyecto |

---

## 🛠️ Tecnologías y Herramientas

* **Runtime & Framework:** Node.js, Express.js.
* **Base de Datos & ODM:** MongoDB Atlas con Mongoose 6+.
* **Validación de Datos:** Joi schema validator.
* **Pruebas Automatizadas:** Jest con entorno Supertest para endpoints HTTP.
* **Documentación:** Colección oficial de Postman incluida (`postman_collection.json`).
* **Despliegue:** Preparado para Vercel Serverless / Cloud Hosting (`vercel.json`).

---

## 🚀 Instalación y Puesta en Marcha

```bash
# 1. Clonar el repositorio
git clone https://github.com/gavafue/trackgenix-server.git
cd trackgenix-server

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
# Crear archivo .env en la raíz con:
# PORT=3000
# DATABASE_URL=mongodb+srv://<usuario>:<password>@cluster.mongodb.net/trackgenix

# 4. Iniciar en modo desarrollo
npm run dev

# 5. Ejecutar suite de pruebas unitarias
npm test
```

---

## 📄 Licencia

Distribuido bajo la licencia MIT.
