// declare module '*.svg' {
//     import React = require('react');
//     export const ReactComponent: React.FC<React.SVGProps<SVGElement>>;
//     const src: string;
//     export default src;
// }

interface BeforeInstallPromptEvent extends Event {
    readonly platforms: string[];
    readonly userChoice: Promise<{
        outcome: "accepted" | "dismissed";
        platform: string;
    }>;
    prompt(): Promise<void>;
}

declare global {
    interface WindowEventMap {
        beforeinstallprompt: BeforeInstallPromptEvent;
    }
}
