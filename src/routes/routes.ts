import { Router } from "express";

/**
 * Handle all routes
 * @param router
 */
export const routes = (router: Router) => {
    // Health check
    router.get("/api/health", (req, res) => {
        res.status(200).json({ status: "UP" });
    });
};
