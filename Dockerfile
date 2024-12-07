# Используем образ Node.js
FROM node:16

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальной код
COPY . .

# Собираем проект
RUN npm run build

# Используем Nginx для статического хостинга
FROM nginx:alpine
COPY --from=0 /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
