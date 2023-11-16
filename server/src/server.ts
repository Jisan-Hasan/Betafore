import { Server } from "http";
import app from "./app";
import config from "./config";

async function main() {
    // Start the server
    const server: Server = app.listen(config.port, () => {
        console.log(`Server running on port ${config.port}`);
    });

    // exit handler
    const exitHandler = () => {
        if (server) {
            server.close(() => {
                console.log("Server closed");
            });
        }
        process.exit(1);
    };

    // unexpected error handler
    const unexpectedErrorHandler = (error: unknown) => {
        console.error(error);
        exitHandler();
    };

    // handle uncaught errors
    process.on("uncaughtException", unexpectedErrorHandler);

    // handle unhandled promise rejections
    process.on("unhandledRejection", unexpectedErrorHandler);

    // handle server termination
    process.on("SIGTERM", () => {
        console.log("SIGTERM received");
        if (server) {
            server.close();
        }
    });
}

main();
