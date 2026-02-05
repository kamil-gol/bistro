# Multi-stage build for optimized production image
FROM nginx:alpine

# Set working directory
WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy main HTML files
COPY index.html .
COPY news.html .
COPY privacy.html .

# Copy CSS files
COPY styles.css .
COPY cookieconsent.css .

# Copy JavaScript files
COPY script.js .
COPY cookieconsent.js .
COPY analytics.js .

# Copy PWA files
COPY pwa.js .
COPY install-prompt.js .
COPY service-worker.js .
COPY offline.html .
COPY manifest.json .

# Copy icons directory (if exists)
COPY icons ./icons

# Copy documentation (optional, for reference)
COPY README.md .
COPY PWA_GUIDE.md .

# Add metadata
LABEL maintainer="Bistro Pętla <kamilgolebiowski@10g.pl>"
LABEL description="Progressive Web App for Bistro Pętla - Chorzów"
LABEL version="2.0.0"
LABEL features="PWA, Analytics, GDPR, News"

# Expose port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]