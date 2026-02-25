// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';

const FeaturedCollection = () => {
    // Mock Data for sneakers mapped to premium transparent/isolated sneaker imagery
    const featuredProducts = [
        {
            id: 1,
            title: "Jordan 1 Retro High",
            price: "240",
            imageSrc: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&q=80&w=800&ixlib=rb-4.0.3" // A clean Nike/Jordan dunk
        },
        {
            id: 2,
            title: "Yeezy Boost 700",
            price: "300",
            imageSrc: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800&ixlib=rb-4.0.3" // Minimalist futuristic sneaker
        },
        {
            id: 3,
            title: "Air Max 95 OG",
            price: "185",
            imageSrc: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=800&ixlib=rb-4.0.3" // Classic sporty runner
        },
        {
            id: 4,
            title: "Dunk Low Panda",
            price: "160",
            imageSrc: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800&ixlib=rb-4.0.3" // Streetwear staple
        }
    ];

    return (
        <section className="py-20 md:py-32 px-6 md:px-12 bg-white w-full overflow-hidden relative">
            <div className="max-w-[1400px] mx-auto relative z-10">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-20 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="w-12 h-[2px] bg-[#FF5F00] mb-6"></div>
                        <h2 className="font-['Anton'] text-4xl md:text-5xl lg:text-6xl tracking-wide uppercase leading-none">
                            Koleksioni <br /> i Veçantë
                        </h2>
                    </motion.div>

                    <motion.button
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="font-mono text-xs md:text-sm tracking-widest uppercase border border-black/20 hover:border-black px-6 py-3 transition-colors duration-300"
                    >
                        Shiko Të Gjitha
                    </motion.button>
                </div>

                {/* 4-Column Grid: Fully Responsive and Centered */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 lg:gap-8 justify-center items-center">
                    {featuredProducts.map((product) => (
                        <div key={product.id} className="w-full flex justify-center">
                            <ProductCard
                                id={product.id}
                                title={product.title}
                                price={product.price}
                                imageSrc={product.imageSrc}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedCollection;
