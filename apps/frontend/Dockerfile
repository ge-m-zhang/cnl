#! upate App Name
ARG APP_NAME=frontend

#! Base
FROM node:20-slim AS base
RUN apt-get update && apt-get upgrade -y

#! Builder
FROM base AS builder
WORKDIR /app
ARG APP_NAME

# Install turbo globally
RUN npm install --ignore-scripts -g turbo@1.13.4

# Copy over workspace configuration and lock files
COPY apps ./apps
COPY pnpm-workspace.yaml .
COPY pnpm-lock.yaml .
COPY package.json .
COPY turbo.json .
COPY tsconfig.json .

# Prune the workspace for Docker
RUN turbo prune --scope=${APP_NAME} --docker

#! Installer
FROM base AS installer
WORKDIR /app
ARG APP_NAME

# Install pnpm globally for dependencies
ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

# Disable CRA's ESLint plugin during build
# ENV DISABLE_ESLINT_PLUGIN=true

RUN mkdir -p /root/.local/share/pnpm
# Install pnpm globally
RUN npm install -g pnpm@9.11.0

# Copy pruned files from the builder stage
COPY --from=builder /app/out/json/ .

# Install pnpm and fetch dependencies
RUN pnpm fetch
RUN pnpm install --ignore-scripts --offline

# Copy the root tsconfig.json and other necessary files
COPY --from=builder /app/tsconfig.json .
COPY --from=builder /app/apps/${APP_NAME}/tsconfig.json ./apps/${APP_NAME}/
COPY --from=builder /app/apps/${APP_NAME}/tsconfig.node.json ./apps/${APP_NAME}/

# Build the project
COPY --from=builder /app/out/full/ .
RUN pnpm build --filter=${APP_NAME}...

#! Runner
FROM nginxinc/nginx-unprivileged:1.26.2 AS runner
WORKDIR /app
ARG APP_NAME

USER root

# Copy built static files and NGINX configuration
COPY --from=installer /app/apps/${APP_NAME}/build /usr/share/nginx/html
COPY --from=installer /app/apps/${APP_NAME}/nginx.default.conf /etc/nginx/conf.d/default.conf
COPY --from=installer /app/apps/${APP_NAME}/entrypoint.sh .

# Change owner to non-root user
RUN chown -R 101:101 /app /usr/share/nginx/html

# Switch to non-root user
USER 101
RUN chmod u+x ./entrypoint.sh
# Set the entrypoint script as the executable to run when the container starts
ENTRYPOINT ["/app/entrypoint.sh"]

EXPOSE 3000
# Start NGINX
CMD ["nginx", "-g", "daemon off;"]