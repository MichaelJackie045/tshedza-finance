FROM eclipse-temurin:17-jre

WORKDIR /app

COPY . .

RUN chmod +x mvnw && ./mvnw -q -DskipTests package

EXPOSE 8080

CMD ["java", "-jar", "target/fallback-backend-0.1.0.jar"]
