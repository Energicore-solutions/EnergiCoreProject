export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-green-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-green-800 mb-6">Power Your Future with Renewable Energy</h1>
            <p className="text-xl text-gray-600 mb-8">Transform your energy consumption with sustainable and cost-effective renewable solutions.</p>
            <a href="/purchase" className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors">Get Started</a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <h3 className="text-xl font-semibold mb-4">Solar Energy</h3>
              <p className="text-gray-600">Harness the power of the sun with our efficient solar solutions.</p>
            </div>
            <div className="text-center p-6">
              <h3 className="text-xl font-semibold mb-4">Wind Power</h3>
              <p className="text-gray-600">Clean, sustainable wind energy for a greener tomorrow.</p>
            </div>
            <div className="text-center p-6">
              <h3 className="text-xl font-semibold mb-4">Smart Solutions</h3>
              <p className="text-gray-600">Intelligent energy management systems for optimal efficiency.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Make the Switch?</h2>
          <p className="mb-8 max-w-2xl mx-auto">Join thousands of households already benefiting from clean, renewable energy.</p>
          <button className="bg-white text-green-800 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors">Contact Us Today</button>
        </div>
      </section>
    </div>
  );
}
