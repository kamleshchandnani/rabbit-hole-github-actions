FROM node:12-slim

ARG STAGE

EXPOSE 8888

# Create app directory
RUN mkdir /rabbit-hole-github-actions && chown -R node:node /rabbit-hole-github-actions
WORKDIR /rabbit-hole-github-actions

# Switch to node user
USER node

# Copy dependencies files so we can have better caching as these don't change often
COPY --chown=node:node package.json yarn.lock ./
# Install strictly from lockfile don't generate new lockfile
RUN yarn install --frozen-lockfile

# Copy app source
COPY --chown=node:node . ./


# serve the app. This command will run during docker run
CMD yarn $STAGE


# docker build \
# -t username/appname \
# -f ./Dockerfile \
# --build-arg STAGE=staging .



# docker run \
# -dt \
# --rm \
# -p 8888:8888 \
# -e "STAGE=staging" \
# --name appname \
# username/appname
