FROM nginx:alpine

COPY start.sh /start.sh
RUN chmod +x /start.sh

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY dist /usr/share/nginx/html
COPY data /usr/share/nginx/html/data

EXPOSE 8080

ENTRYPOINT ["/start.sh"]
