# NexusERP AI Full Stack Dockerfile
FROM node:20-alpine AS base
WORKDIR /app

# Step 1: Install dependencies
COPY package.json ./
RUN npm install

# Step 2: Build Application
COPY . .
RUN npx prisma generate
RUN npm run build

# Step 3: Production Runner Stage
EXPOSE 5000

ENV NODE_ENV=production
ENV PORT=5000
CMD ["npm", "run", "start"]
