# Bitsonomy Project

## Setup Instructions

### Prerequisites
- Docker
- Node.js
- npm/yarn

### Environment Setup

1. Create a `.env` file in the root directory by copying the example:


2. Configure the following environment variables in `.env`:
- `PORT`: Server port (default: 8080)
- `MONGO_URL`: MongoDB connection string

### Docker Setup

1. Build the Docker image:

```bash
docker-compose up -d
```


### Local Development Setup

1. Install dependencies:

```bash
yarn install
```


2. Start the development server:

```bash
yarn dev
```