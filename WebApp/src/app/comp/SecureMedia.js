import React, { useState, useEffect } from "react";
import { getFile } from "../../services/FileServerService";

/**
 * Affiche une image ou une vidéo sécurisée selon l'extension du fichier.
 * @param {string} fileName - Nom du fichier sur le serveur
 * @param {string} type - "image" ou "video"
 * @param {string} className - Classes CSS
 * @param {string} alt - Texte alternatif (pour les images)
 */
export default function SecureMedia({ fileName, type, className, alt }) {
    const [src, setSrc] = useState(type === "image" ? "/default-avatar.png" : null);

    useEffect(() => {
        let isMounted = true;
        if (!fileName) {
            setSrc(type === "image" ? "/default-avatar.png" : null);
            return;
        }
        getFile(fileName)
            .then(blob => {
                if (isMounted) setSrc(URL.createObjectURL(blob));
            })
            .catch(() => {
                if (isMounted) setSrc(type === "image" ? "/default-avatar.png" : null);
            });
        return () => {
            isMounted = false;
            if (src && src.startsWith("blob:")) URL.revokeObjectURL(src);
        };
        // eslint-disable-next-line
    }, [fileName]);

    if (type === "video") {
        if (!src) return null;
        return <video src={src} controls className={className} />;
    }
    // image
    return (
        <img
            src={src}
            alt={alt}
            className={className}
            style={{ objectFit: "cover" }}
        />
    );
}