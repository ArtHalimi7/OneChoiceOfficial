// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';

const FeaturedCollection = () => {
    // Mock Data for sneakers mapped to premium transparent/isolated sneaker imagery
    const featuredProducts = [
        {
            id: 1,
            title: "Jordan 1 Retro High",
            price: "240",
            imageSrc: "https://static.ftshp.digital/img/tl/ddc3d690-e297-4984-9638-a9685db1dc9e-1369768.jpg"
        },
        {
            id: 2,
            title: "Yeezy Boost 700",
            price: "300",
            imageSrc: "https://thedropdate.com/_next/image?url=https%3A%2F%2Fstatic.sneakerjagers.com%2Fp%2Fxssu9XAuewVtzkhx821s9uksBN2vnO8BzKlOlIVL.png&w=3840&q=100"
        },
        {
            id: 3,
            title: "Air Max 95 OG",
            price: "185",
            imageSrc: "https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/d6a9287b-8943-4a92-b9d0-5f0f2d525477/NIKE+AIR+MAX+95+BIG+BUBBLE.png"
        },
        {
            id: 4,
            title: "Dunk Low Panda",
            price: "160",
            imageSrc: "https://imagedelivery.net/2DfovxNet9Syc-4xYpcsGg/b462a49c-f423-49bf-c6d6-7c48778ab000/products"
        }
    ];

    return (
        <section className="pt-12 md:pt-16 pb-20 md:pb-32 px-6 md:px-12 bg-white w-full overflow-hidden relative">
            <div className="max-w-[1400px] mx-auto relative z-10">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-20 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="w-16 h-[2px] bg-[#FF5F00] mb-6"></div>
                        <h2 className="font-['Anton'] text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wide uppercase leading-[0.9] text-black">
                            Koleksioni <br /> i Veçuar
                        </h2>
                    </motion.div>

                    <Link to="/collection">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="bg-[#FF5F00] text-white hover:bg-black px-8 py-3.5 font-['Anton'] uppercase tracking-widest transition-colors duration-300"
                        >
                            Shiko Të Gjitha
                        </motion.button>
                    </Link>
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
