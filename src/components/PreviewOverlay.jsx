import React from 'react';

const PreviewOverlay = () => {
    return (
        <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden flex flex-wrap justify-center items-center">
            {Array.from({ length: 150 }).map((_, i) => (
                <div
                    key={i}
                    className="text-black/15 dark:text-black/20 font-bold text-2xl md:text-5xl px-8 py-10 -rotate-45 whitespace-nowrap select-none tracking-widest"
                >
                    arthalimi.com
                </div>
            ))}
        </div>
    );
};

export default PreviewOverlay;
