import { Router } from "express";

interface Route {
  basePath: string;
  path: string;
  name: string;
  caption: string;
  fullPath?: string;
  description: string;
}

let routes: Route[] = [];

/**
 * Utility function for registering routes.
 * Routes registered via this function are available to the capability route.
 *
 * @see capability.route.ts
 *
 * @param route {Route} the route to add.
 * @param router {Router} the router to add the route.
 * @param fn {any} the function to call
 */
export function registerRoute(route: Route, router: Router, fn: any) {
  if (route.path.startsWith("/")) {
    throw new Error(`(${route.path}) => route.path should not start with '/'.`);
  }

  const path = route.path.endsWith("/") ? route.path.slice(0, -1) : route.path;
  const fullPath =
    route.path === "" ? route.basePath : `${route.basePath}/${path}`;

  router.get(path, fn);
  routes.push({
    ...route,
    fullPath,
  });
  return router;
}

export function getRegisteredRoutes() {
  return routes;
}
