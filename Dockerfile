FROM node:16 as build
WORKDIR /usr/src/app
COPY . .
ARG env=dev
RUN yarn
RUN yarn build:$env

FROM nginx:stable-alpine
COPY --from=build /usr/src/app/dist/angular-starter /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
