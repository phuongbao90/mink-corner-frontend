# FROM node:18-alpine AS base

# # Step 1. Rebuild the source code only when needed
# FROM base AS builder

# WORKDIR /app

# # Install dependencies based on the preferred package manager
# COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
# RUN apk add --update --no-cache python3 build-base gcc && ln -sf /usr/bin/python3 /usr/bin/python
# # Omit --production flag for TypeScript devDependencies
# RUN \
#   if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
#   elif [ -f package-lock.json ]; then npm ci; \
#   elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i; \
#   # Allow install without lockfile, so example works even without Node.js installed locally
#   else echo "Warning: Lockfile not found. It is recommended to commit lockfiles to version control." && yarn install; \
#   fi

# COPY src ./src
# COPY public ./public
# COPY next.config.js .
# COPY next-sitemap.config.js .
# COPY tsconfig.json .

# # Environment variables must be present at build time
# # https://github.com/vercel/next.js/discussions/14030
# ARG JWT_SECRET
# ENV JWT_SECRET=${JWT_SECRET}
# ARG NEXT_PUBLIC_SITE_URL
# ENV NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL}
# ARG NEXT_PUBLIC_BACKEND_URL
# ENV NEXT_PUBLIC_BACKEND_URL=${NEXT_PUBLIC_BACKEND_URL}
# ARG NEXT_PUBLIC_API_URL
# ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
# ARG NEXT_PUBLIC_ENABLE_MOCK
# ENV NEXT_PUBLIC_ENABLE_MOCK=${NEXT_PUBLIC_ENABLE_MOCK}
# ARG NEXT_PUBLIC_COLLECTION_PRODUCT_LIMIT
# ENV NEXT_PUBLIC_COLLECTION_PRODUCT_LIMIT=${NEXT_PUBLIC_COLLECTION_PRODUCT_LIMIT}
# ARG NEXT_PUBLIC_DEFAULT_SEO_TITLE
# ENV NEXT_PUBLIC_DEFAULT_SEO_TITLE=${NEXT_PUBLIC_DEFAULT_SEO_TITLE}
# ARG NEXT_PUBLIC_DEFAULT_SEO_DESCRIPTION
# ENV NEXT_PUBLIC_DEFAULT_SEO_DESCRIPTION=${NEXT_PUBLIC_DEFAULT_SEO_DESCRIPTION}

# # Next.js collects completely anonymous telemetry data about general usage. Learn more here: https://nextjs.org/telemetry
# # Uncomment the following line to disable telemetry at build time
# # ENV NEXT_TELEMETRY_DISABLED 1

# # Build Next.js based on the preferred package manager
# # RUN yarn build;
# RUN \
#   if [ -f yarn.lock ]; then yarn build; \
#   elif [ -f package-lock.json ]; then npm run build; \
#   elif [ -f pnpm-lock.yaml ]; then pnpm build; \
#   else yarn build; \
#   fi

# # Note: It is not necessary to add an intermediate step that does a full copy of `node_modules` here

# # Step 2. Production image, copy all the files and run next
# FROM base AS runner

# WORKDIR /app

# # Don't run production as root
# RUN addgroup --system --gid 1001 nodejs
# RUN adduser --system --uid 1001 nextjs
# USER nextjs

# COPY --from=builder /app/public ./public

# # Automatically leverage output traces to reduce image size
# # https://nextjs.org/docs/advanced-features/output-file-tracing
# COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# # Environment variables must be redefined at run time
# ARG JWT_SECRET
# ENV JWT_SECRET=${JWT_SECRET}
# ARG NEXT_PUBLIC_SITE_URL
# ENV NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL}
# ARG NEXT_PUBLIC_BACKEND_URL
# ENV NEXT_PUBLIC_BACKEND_URL=${NEXT_PUBLIC_BACKEND_URL}
# ARG NEXT_PUBLIC_API_URL
# ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
# ARG NEXT_PUBLIC_ENABLE_MOCK
# ENV NEXT_PUBLIC_ENABLE_MOCK=${NEXT_PUBLIC_ENABLE_MOCK}
# ARG NEXT_PUBLIC_COLLECTION_PRODUCT_LIMIT
# ENV NEXT_PUBLIC_COLLECTION_PRODUCT_LIMIT=${NEXT_PUBLIC_COLLECTION_PRODUCT_LIMIT}
# ARG NEXT_PUBLIC_DEFAULT_SEO_TITLE
# ENV NEXT_PUBLIC_DEFAULT_SEO_TITLE=${NEXT_PUBLIC_DEFAULT_SEO_TITLE}
# ARG NEXT_PUBLIC_DEFAULT_SEO_DESCRIPTION
# ENV NEXT_PUBLIC_DEFAULT_SEO_DESCRIPTION=${NEXT_PUBLIC_DEFAULT_SEO_DESCRIPTION}

# # Uncomment the following line to disable telemetry at run time
# # ENV NEXT_TELEMETRY_DISABLED 1

# # Note: Don't expose ports here, Compose will handle that for us

# CMD ["node", "server.js"]

# ---------------------------------------------------------------------------- #

FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
RUN apk add --update --no-cache python3 build-base gcc && ln -sf /usr/bin/python3 /usr/bin/python
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi


# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN yarn build

# If using npm comment out above and use below instead
# RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]