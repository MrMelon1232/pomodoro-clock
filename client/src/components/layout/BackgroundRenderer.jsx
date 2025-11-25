import { useSettingsContext } from "../../context/SettingsContext";
import { useEffect, useState } from "./react";

export const BackgroundRenderer = () => {
    const { backgrounds, backgroundIndex } = useSettingsContext();
    const currentBg = backgrounds[backgroundIndex];

    const [isMobile, setIsMobile] = useState(false);

    // UseEffect to check if we are on mobile viewport
    useEffect(() => {
        if (typeof window === "undefined") return;

        const mq = window.matchMedia("(max-width: 768px)");
        const handleChange = (event) => {
            setIsMobile(Boolean(event.matches));
        };

        setIsMobile(mq.matches);

        // Add event listener for changes
        mq.addEventListener("change", handleChange);

        return () => mq.removeEventListener?.("change", handleChange);
    }, []);

    // return null if we don't have a valid background index
    if (!currentBg) return null;

    // Choose source type based on device
    const resolvedSrc =
        isMobile && currentBg.srcMobile ? currentBg.srcMobile : currentBg.src;

    return (
        <div className="fixed inset-0 -z-10 overflow-hidden">
            {/* Background Layer */}
            {currentBg.type === "color" && (
                <div
                    className="fixed inset-0 -z-10"
                    style={{
                        backgroundColor: currentBg.value,
                        transition: "background-color 0.6 ease",
                    }}
                />
            )}

            {currentBg.type === "image" && (
                <div
                    className="absolute inset-0 bg-center bg-cover"
                    style={{ backgroundImage: `url(${resolvedSrc})` }}
                />
            )}

            {currentBg.type === "video" && (
                <video key={resolvedSrc} className="absolute inset=0">
                    <source src={resolvedSrc} type="video/mp4" />
                </video>
            )}
        </div>
    );
};
