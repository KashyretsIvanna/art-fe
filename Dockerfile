FROM  node:18-alpine as build-stage
WORKDIR /admin
COPY package*.json /admin/
RUN npm install
COPY ./ /admin/
RUN npm run build

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.24.0
COPY --from=build-stage /admin/dist/ /usr/share/nginx/html
# Copy the default nginx.conf provided by tiangolo/node-frontend
COPY --from=build-stage /etc/nginx/nginx.conf /etc/nginx/conf.d/default.conf