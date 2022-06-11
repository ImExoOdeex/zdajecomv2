import { createCookie } from "@remix-run/node"; // or "@remix-run/cloudflare"

export const typeCookie = createCookie("type-cookie", {
    maxAge: 604_800, // one week
});

export const bannerCookie = createCookie("banner-cookie", {
    maxAge: 315_360_000, // one year
});

export const userPrefs = createCookie("user-prefs", {
    maxAge: 604_800, // one week
});