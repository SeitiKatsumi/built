FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY index.html /usr/share/nginx/html/index.html
COPY styles.css /usr/share/nginx/html/styles.css
COPY script.js /usr/share/nginx/html/script.js
COPY assets /usr/share/nginx/html/assets
COPY sobre /usr/share/nginx/html/sobre
COPY glossario /usr/share/nginx/html/glossario
COPY sitemap.xml /usr/share/nginx/html/sitemap.xml
COPY robots.txt /usr/share/nginx/html/robots.txt

EXPOSE 80

