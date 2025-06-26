import React, { useState, useEffect } from "react";
import { getFile, isExternalUrl } from "../../services/FileServerServices";

/**
 * Affiche une image ou une vidéo sécurisée selon l'extension du fichier.
 * @param {string} fileName - Nom du fichier sur le serveur ou URL externe
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

        // Si c'est une URL externe (Giphy, etc.), l'utiliser directement
        if (isExternalUrl(fileName)) {
            if (isMounted) setSrc(fileName);
            return;
        }

        // Si c'est un fichier local, récupérer le blob
        getFile(fileName)
            .then(blob => {
                if (isMounted && blob instanceof Blob) {
                    setSrc(URL.createObjectURL(blob));
                } else if (isMounted && typeof blob === 'string') {
                    // Si getFile retourne une string (URL externe), l'utiliser directement
                    setSrc(blob);
                }
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
        return (
            <video src={src} controls className={className}>
                <track kind="captions" src="" label="No captions available" />
            </video>
        );
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