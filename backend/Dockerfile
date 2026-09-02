# Build stage
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app

COPY pom.xml .
COPY .mvn .mvn
COPY mvnw .
RUN chmod +x mvnw && ./mvnw -q -B dependency:go-offline

COPY src ./src
RUN ./mvnw -q -B -DskipTests package

# Runtime stage
FROM eclipse-temurin:21-jre
WORKDIR /app

RUN mkdir -p /app/data /app/uploads

COPY --from=build /app/target/backend-0.0.1-SNAPSHOT.jar app.jar

ENV APP_UPLOAD_DIR=/app/uploads
EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
