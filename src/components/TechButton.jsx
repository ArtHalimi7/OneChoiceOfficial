// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

/**
 * TechButton — Reusable button with the signature tech-cut corner
 * 
 * Props:
 *  - variant: 'solid' (default, black bg) | 'outline' (transparent with border) | 'accent' (orange bg)
 *  - children: button label content
 *  - onClick: click handler (for <button> usage)
 *  - className: extra utility classes (for sizing, margin, etc.)
 *  - as: 'button' (default) | 'div' (for use inside <Link>)
 *  - type: button type, default 'button'
 *  - disabled: boolean
 *  - [any other motion.div / button props]
 */

// Asymmetrical cut: Horizontal (X) and Vertical (Y)
const CUT_X = 15; // Shortened top cut for longer top edge
const CUT_Y = 35; // Deep vertical cut for visibility
// Single cut: top-left corner
// viewBox 100x100, path traced 1px inside edges for crisp border
const SVG_PATH = `M ${CUT_X} 1 L 99 1 L 99 99 L 1 99 L 1 ${CUT_Y} Z`;

const TechButton = ({
    variant = 'solid',
    children,
    onClick,
    className = '',
    as = 'button',
    type = 'button',
    disabled = false,
    ...rest
}) => {
    const clipStyle = {
        // Asymmetrical cut: X on top, Y on left
        clipPath: `polygon(${CUT_X}% 0, 100% 0, 100% 100%, 0 100%, 0 ${CUT_Y}%)`
    };

    const baseClasses = `
        relative overflow-hidden
        font-['Anton'] tracking-[0.15em] uppercase
        text-sm sm:text-base
        px-8 py-3.5
        flex items-center justify-center gap-3
        transition-colors duration-300
        cursor-pointer select-none
    `.trim();

    const variantClasses = {
        solid: 'bg-black text-white hover:bg-[#FF5F00]',
        outline: 'bg-transparent text-black hover:bg-black hover:text-white',
        accent: 'bg-[#FF5F00] text-white hover:bg-black',
    };

    const borderColor = variant === 'solid' ? 'black' : 'black';
    const disabledClasses = disabled ? 'opacity-40 cursor-not-allowed' : '';

    const content = (
        <>
            <span className="relative z-10 flex items-center gap-3">
                {children}
            </span>
            {/* SVG border that perfectly follows the clip-path cut */}
            <svg
                className="absolute inset-0 w-full h-full pointer-events-none z-20"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
            >
                <path
                    d={SVG_PATH}
                    fill="none"
                    stroke={borderColor}
                    strokeWidth="1.5"
                    vectorEffect="non-scaling-stroke"
                />
            </svg>
        </>
    );

    if (as === 'div') {
        return (
            <motion.div
                className={`${baseClasses} ${variantClasses[variant]} ${disabledClasses} ${className}`}
                style={clipStyle}
                whileHover={!disabled ? { y: -3 } : {}}
                whileTap={!disabled ? { scale: 0.97 } : {}}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                onClick={!disabled ? onClick : undefined}
                {...rest}
            >
                {content}
            </motion.div>
        );
    }

    return (
        <motion.button
            type={type}
            disabled={disabled}
            className={`${baseClasses} ${variantClasses[variant]} ${disabledClasses} ${className}`}
            style={clipStyle}
            whileHover={!disabled ? { y: -3 } : {}}
            whileTap={!disabled ? { scale: 0.97 } : {}}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={onClick}
            {...rest}
        >
            {content}
        </motion.button>
    );
};

export default TechButton;
