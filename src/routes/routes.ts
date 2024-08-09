import { Router } from "express";
import {
    registerMiddleware,
    authenticationMiddleware,
    permissionsMiddleware,
    addBookValidatorMiddleware,
    bookIsbnValidatorMiddleware,
} from "./../middlewares/";

import { healthCheck, register, addBook, removeBook } from "./../controllers/";

import { Role } from "./../utils";

/**
 * Handle all routes
 * @param router
 */
export const routes = (router: Router) => {
    // Health check
    router.get("/api/health", healthCheck);

    // Register new user (Librarian/Customer)
    router.post("/api/register", registerMiddleware, register);

    // For Librarian
    router.post(
        "/api/add-book",
        authenticationMiddleware,
        permissionsMiddleware(Role.LIBRARIAN),
        addBookValidatorMiddleware,
        addBook
    );
    router.delete(
        "/api/remove-book",
        authenticationMiddleware,
        permissionsMiddleware(Role.LIBRARIAN),
        bookIsbnValidatorMiddleware,
        removeBook
    );
};
