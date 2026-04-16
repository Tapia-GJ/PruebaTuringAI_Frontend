# TuringAI Frontend

Frontend moderno construido con **React 19**, **Vite**, **TypeScript** y un stack UI/UX de excelencia con **Tailwind CSS**, **GSAP** para animaciones y **Lucide React** para iconografía.

## Características

- **React 19 + Vite**: Desarrollo rápido y construcción optimizada
- **Tailwind CSS**: Diseño responsivo y moderno
- **GSAP 3**: Animaciones de alto rendimiento
- **TypeScript**: Tipado estricto para código seguro

## Requisitos del Sistema

- **Node.js**: Versión 18 o superior
- **PNPM**: Versión 8 o superior (gestor de paquetes del proyecto)

Para verificar tus versiones instaladas:

```bash
node --version
pnpm --version
```

## Instalación

### 1. Clonar el repositorio

```bash
git https://github.com/Tapia-GJ/PruebaTuringAI_Frontend.git
cd PruebaTuringAI_Frontend
```

### 2. Configurar variables de entorno

Copia el archivo de ejemplo y configura tus variables:

```bash
cp .env.example .env
```

Luego, edita `.env` y configura la URL de tu API backend:

```env
# API Configuration
VITE_API_BASE=http://localhost:3000
```

> **Nota**: En desarrollo local, por defecto apunta a `http://localhost:3000`.

### 3. Instalar dependencias

```bash
pnpm install
```

Este comando instalará todas las dependencias especificadas en `package.json` usando PNPM.

## Desarrollo

### Iniciar el servidor de desarrollo

```bash
pnpm run dev
```

El proyecto estará disponible en `http://localhost:5173` (o en el puerto que Vite asigne).

## Construcción para Producción

### Build

```bash
pnpm build
```

Este comando:

1. Verifica los tipos de TypeScript (`tsc -b`)
2. Empaqueta y optimiza el código con Vite
3. Genera archivos listos para producción en la carpeta `dist/`

### Previsualización de Producción

Para probar localmente cómo se vería en producción:

```bash
pnpm preview
```

La aplicación se servirá en `http://localhost:4173`.

> **Importante**: Usa `pnpm preview` solo para verificación local. Para desplegar, sube el contenido de la carpeta `dist/` a tu servidor/CDN.

## Estructura del Proyecto

```
src/
├── api/              # Configuración de llamadas a la API
├── components/       # Componentes reutilizables de UI
│   ├── common/       # Componentes genéricos (botones, inputs, etc.)
│   ├── layout/       # Navegación y estructura principal
│   └── ui/           # Componentes específicos del dominio
├── contexts/         # Contextos de React para estado global
├── hooks/            # Custom hooks personalizados
├── layouts/          # Layouts por rol (Main, Auth, Admin)
├── pages/            # Vistas/páginas de la aplicación
│   ├── public/       # Acceso libre
│   ├── auth/         # Autenticación (Login, Register)
│   ├── reader/       # Área de usuario logueado
│   └── admin/        # Panel de administración
├── router/           # Configuración de rutas
├── types/            # Interfaces TypeScript
├── App.tsx           # Componente raíz
└── main.tsx          # Punto de entrada
```

## Stack Tecnológico

### Core

- **React 19.2**: Biblioteca de UI declarativa
- **Vite 8**: Herramienta de construcción y servidor de desarrollo
- **TypeScript 6**: Lenguaje tipado sobre JavaScript

### UI & Styling

- **Tailwind CSS 4**: Framework de CSS utility-first

### Animaciones

- **GSAP 3.15**: Librería profesional de animaciones
- **@gsap/react**: Integración oficial de GSAP con React

## Guía Rápida de Comandos

| Comando        | Descripción                    |
| -------------- | ------------------------------ |
| `pnpm install` | Instala todas las dependencias |
| `pnpm run dev` | Inicia servidor de desarrollo  |
| `pnpm build`   | Construye para producción      |

## Variables de Entorno

### `.env.example`

```env
# API Configuration
# Base URL para las llamadas a la API.
VITE_API_BASE=http://localhost:3000
```

**¿Preguntas o problemas?** Consulta la documentación del proyecto o abre una issue en el repositorio.
