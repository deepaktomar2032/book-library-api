import { Router } from "express";
import { registerMiddleware } from "./../middlewares";
import { healthCheck, register } from "./../controllers";
/**
 * Handle all routes
 * @param router
 */
export const routes = (router: Router) => {
    // Health check
    router.get("/api/health", healthCheck);

    // Register new user (Librarian/Customer)
    router.post("/api/register", registerMiddleware, register);
};
