FROM maven:3.8.3-openjdk-17
COPY . .
RUN mvn clean package
COPY target/Game-Store-API-0.0.1-SNAPSHOT.jar Game-Store-API-0.0.1-SNAPSHOT.jar
EXPOSE 8081
CMD ["java", "-jar", "/Game-Store-API-0.0.1-SNAPSHOT.jar"]
