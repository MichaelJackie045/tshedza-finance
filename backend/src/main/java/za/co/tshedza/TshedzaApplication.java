package za.co.tshedza;

/**
 * Spring Boot entry point for the Tshedza Finance API (port 8080).
 *
 * LINK MAP
 * - Frontend Vite app (port 5173) talks to this API via {@code /api/*}
 *   (see frontend/src/lib/api.ts and frontend/vite.config.ts proxy).
 * - Seed users / demo loan: {@link za.co.tshedza.config.DataInitializer}
 * - JWT + route rules: {@link za.co.tshedza.config.SecurityConfig}
 */
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
@ConfigurationPropertiesScan
public class TshedzaApplication {
    public static void main(String[] args) {
        SpringApplication.run(TshedzaApplication.class, args);
    }
}
