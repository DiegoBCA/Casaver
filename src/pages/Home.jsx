import Hero from '../components/Hero';
import BrandValues from '../components/BrandValues';
import EsotericServices from '../components/EsotericServices';
import OurEssence from '../components/OurEssence';
import ProductGrid from '../components/ProductGrid';
import TeaCollection from '../components/TeaCollection';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import Newsletter from '../components/Newsletter';
import Vines from '../components/Vines';
import AuroraBackground from '../components/AuroraBackground';

export default function Home() {
  return (
    <>
      <AuroraBackground />
      <Vines />
      <Hero />
      <BrandValues />
      <EsotericServices />
      <OurEssence />
      <ProductGrid />
      <TeaCollection />
      <Testimonials />
      <FAQ />
      <Newsletter />
    </>
  );
}
