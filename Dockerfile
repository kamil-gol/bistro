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

# Add metadata
LABEL maintainer="Bistro Pętla <kamilgolebiowski@10g.pl>"
LABEL description="Website for Bistro Pętla - Chorzów"
LABEL version="2.1.0"
LABEL features="Analytics, GDPR, News"

# Expose port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]