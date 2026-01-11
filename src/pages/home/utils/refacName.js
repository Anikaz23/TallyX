export function refacName(name) {
        const safe = name
        .normalize("NFKD")
        .replace(/[^a-zA-Z0-9_ -]/g, "")
        .replace(/^[0-9-]+/, "")
        return safe.charAt(0).toUpperCase() + safe.slice(1);
}

