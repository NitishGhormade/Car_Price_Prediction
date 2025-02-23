import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Loader2, Car, DollarSign, Fuel, Gauge, Calendar } from 'lucide-react';

interface PredictionFormData {
  company: string;
  model: string;
  fuelType: string;
  kilometers: number;
  yearOfPurchase: number;
}

const COMPANIES: string[] = [
  'Hyundai', 'Mahindra', 'Ford'
];

const ALL_MODELS: string[] = [
  'Hyundai Santro Xing', 'Hyundai Grand i10', 'Mahindra Jeep CL550', 'Mahindra Quanto C8', 'Ford EcoSport Titanium', 'Ford Figo'
];

const FUEL_TYPES = ['Petrol', 'Diesel', 'LPG'];

const CURRENT_YEAR = new Date().getFullYear();
const MIN_YEAR = 1990;
const YEARS = Array.from(
  { length: CURRENT_YEAR - MIN_YEAR + 1 },
  (_, i) => CURRENT_YEAR - i
);

function App() {
  const [loading, setLoading] = useState(false);
  const [predictedPrice, setPredictedPrice] = useState<number | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<PredictionFormData>({
    company: '',
    model: '',
    fuelType: 'Petrol',
    kilometers: 0,
    yearOfPurchase: CURRENT_YEAR
  });

  useEffect(() => {
    if (predictedPrice !== null && !loading && resultRef.current) {
      resultRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
      });
    }
  }, [predictedPrice, loading]);

  const availableModels = useMemo(() => {
    if (!formData.company) return [];
    return ALL_MODELS.filter(model => 
      model.toLowerCase().startsWith(formData.company.toLowerCase())
    );
  }, [formData.company]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const basePrice = Math.floor(Math.random() * 1000000) + 500000;
    const yearFactor = (CURRENT_YEAR - formData.yearOfPurchase) * 50000;
    const mockPrediction = Math.max(basePrice - yearFactor, 100000);
    
    setPredictedPrice(mockPrediction);
    setLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
      if (name === 'company') {
        return {
          ...prev,
          [name]: value,
          model: ''
        };
      }
      if (name === 'yearOfPurchase') {
        return {
          ...prev,
          [name]: parseInt(value)
        };
      }
      return {
        ...prev,
        [name]: value
      };
    });
  };

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-4 sm:p-6 lg:p-8 flex items-center justify-center"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=2400&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay',
      }}
    >
      <div className="w-full max-w-xl">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-extrabold text-white mb-2 drop-shadow-lg">
            Car Price Predictor
          </h1>
          <p className="text-white text-lg opacity-90 drop-shadow-md">
            Get an instant estimate for your car's value
          </p>
        </div>

        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl">
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                {/* Left Column */}
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                    <Car className="w-4 h-4" />
                    Company
                  </label>
                  <select
                    name="company"
                    id="company"
                    required
                    className="block w-full rounded-lg border-gray-300 bg-gray-50 shadow-sm 
                             focus:border-indigo-500 focus:ring-indigo-500 
                             transition-colors duration-200 ease-in-out
                             px-3 py-2 text-gray-900"
                    value={formData.company}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Company</option>
                    {COMPANIES.map(company => (
                      <option key={company} value={company}>
                        {company}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Right Column */}
                <div>
                  <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Model
                  </label>
                  <select
                    name="model"
                    id="model"
                    required
                    disabled={!formData.company}
                    className="block w-full rounded-lg border-gray-300 bg-gray-50 shadow-sm 
                             focus:border-indigo-500 focus:ring-indigo-500 
                             transition-colors duration-200 ease-in-out
                             px-3 py-2 text-gray-900
                             disabled:opacity-50 disabled:cursor-not-allowed"
                    value={formData.model}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Model</option>
                    {availableModels.map(model => (
                      <option key={model} value={model}>
                        {model}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Left Column */}
                <div>
                  <label htmlFor="fuelType" className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                    <Fuel className="w-4 h-4" />
                    Fuel Type
                  </label>
                  <select
                    name="fuelType"
                    id="fuelType"
                    required
                    className="block w-full rounded-lg border-gray-300 bg-gray-50 shadow-sm 
                             focus:border-indigo-500 focus:ring-indigo-500 
                             transition-colors duration-200 ease-in-out
                             px-3 py-2 text-gray-900"
                    value={formData.fuelType}
                    onChange={handleInputChange}
                  >
                    {FUEL_TYPES.map(fuel => (
                      <option key={fuel} value={fuel}>
                        {fuel}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Right Column */}
                <div>
                  <label htmlFor="yearOfPurchase" className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Year of Purchase
                  </label>
                  <select
                    name="yearOfPurchase"
                    id="yearOfPurchase"
                    required
                    className="block w-full rounded-lg border-gray-300 bg-gray-50 shadow-sm 
                             focus:border-indigo-500 focus:ring-indigo-500 
                             transition-colors duration-200 ease-in-out
                             px-3 py-2 text-gray-900"
                    value={formData.yearOfPurchase}
                    onChange={handleInputChange}
                  >
                    {YEARS.map(year => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Full Width - Kilometers */}
                <div className="col-span-2">
                  <label htmlFor="kilometers" className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                    <Gauge className="w-4 h-4" />
                    Kilometers Travelled
                  </label>
                  <input
                    type="number"
                    name="kilometers"
                    id="kilometers"
                    required
                    min="0"
                    className="block w-full rounded-lg border-gray-300 bg-gray-50 shadow-sm 
                             focus:border-indigo-500 focus:ring-indigo-500 
                             transition-colors duration-200 ease-in-out
                             px-3 py-2 text-gray-900"
                    value={formData.kilometers}
                    onChange={handleInputChange}
                    placeholder="e.g., 50000"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center py-2.5 px-4
                         border border-transparent rounded-lg text-base font-medium text-white 
                         bg-gradient-to-r from-indigo-600 to-purple-600 
                         hover:from-indigo-700 hover:to-purple-700 
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 
                         transition-all duration-200 ease-in-out
                         disabled:opacity-50 disabled:cursor-not-allowed
                         shadow-lg hover:shadow-xl"
              >
                {loading ? (
                  <span className="flex items-center">
                    <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
                    Calculating Estimate...
                  </span>
                ) : (
                  'Get Price Estimate'
                )}
              </button>
            </form>

            {predictedPrice !== null && !loading && (
              <div 
                ref={resultRef}
                className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-100"
              >
                <div className="text-center">
                  <h3 className="text-lg font-medium text-gray-900 mb-1">
                    Estimated Price
                  </h3>
                  <p className="text-3xl font-bold text-green-600">
                    ₹{predictedPrice.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Based on {formData.yearOfPurchase} model year and {formData.kilometers.toLocaleString()} km driven
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;