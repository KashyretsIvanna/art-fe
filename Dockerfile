FROM  node:18-alpine as build-stage
WORKDIR /admin
COPY package*.json /admin/
RUN npm install
COPY ./ /admin/
RUN npm run build
FROM nginx:1.24.0
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=build-stage /admin/dist/ .
ENTRYPOINT ["nginx","-g","daemon off;"]



# FROM  node:18-alpine as build-stage
# WORKDIR /admin
# COPY package*.json /admin/
# RUN npm install
# COPY ./ /admin/
# RUN npm run build
# FROM nginx:1.24.0
# COPY --from=build-stage /admin/dist/ /usr/share/nginx/html
# COPY --from=build-stage /admin/nginx.conf /etc/nginx/conf.d/default.conf
