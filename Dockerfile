# Render-friendly Dockerfile (build context = repository root).
# Prefer Root Directory=backend + backend/Dockerfile when possible;
# this file exists so a default "Dockerfile" path at repo root still works.

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
