# Retired: Spring Boot API on Render.
# Backend is now Supabase. Prefer deploying Edge Functions + Postgres via the Supabase CLI.
# This Dockerfile remains only for historical reference of the old Java service.

FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app

COPY backend/pom.xml .
COPY backend/.mvn .mvn
COPY backend/mvnw .
RUN chmod +x mvnw && ./mvnw -q -B dependency:go-offline

COPY backend/src ./src
RUN ./mvnw -q -B -DskipTests package

FROM eclipse-temurin:21-jre
WORKDIR /app

RUN mkdir -p /app/data /app/uploads

COPY --from=build /app/target/backend-0.0.1-SNAPSHOT.jar app.jar

ENV APP_UPLOAD_DIR=/app/uploads
EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
