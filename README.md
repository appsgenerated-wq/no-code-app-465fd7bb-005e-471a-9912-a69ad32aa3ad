# FoodApp - A Manifest-Powered Recipe Application

This is a complete React application for managing and sharing food recipes, built entirely on the Manifest backend platform.

## Features

- **User Authentication**: Secure user sign-up and login powered by Manifest's `authenticable` feature.
- **Recipe Management**: Full CRUD (Create, Read, Update, Delete) functionality for recipes.
- **Ownership**: Recipes are linked to the users who create them.
- **Public & Private Access**: Recipes are publicly viewable, but only authenticated users can create them, and only owners can edit or delete them.
- **Admin Panel**: A built-in admin interface at `/admin` for managing all users and recipes.
- **Health Check**: A simple status indicator shows if the frontend is successfully connected to the Manifest backend.

## Tech Stack

- **Backend**: Manifest (YAML-based configuration)
- **Frontend**: React, Vite
- **API Communication**: Manifest SDK (`@mnfst/sdk`)
- **Styling**: Tailwind CSS

## Getting Started

Follow the setup guide to get the application running locally.

### Default Credentials

- **Demo User**: `chef@manifest.build` / `password`
- **Admin User**: `admin@manifest.build` / `admin` (Access at `/admin`)
