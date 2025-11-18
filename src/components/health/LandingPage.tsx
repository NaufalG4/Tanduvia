import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Heart, TrendingUp, AlertCircle, BookOpen, ArrowRight, CheckCircle, Users, BarChart3, LogIn } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
  onLearnMore?: () => void;
}

export function LandingPage({ onGetStarted, onLearnMore }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-blue-600 text-white p-4 rounded-2xl shadow-lg">
                <Heart className="h-12 w-12" fill="currentColor" />
              </div>
            </div>
            <h1 className="mb-6 text-gray-900 max-w-4xl mx-auto">
              Tanduvia: Posyandu Digital
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Sistem pemantauan kesehatan dan gizi anak berbasis standar WHO untuk mencegah stunting dan malnutrisi
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={onGetStarted}
                className="gap-2 text-lg px-8 py-6"
              >
                <LogIn className="h-5 w-5" />
                Masuk ke Sistem
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={onLearnMore}
                className="gap-2 text-lg px-8 py-6"
              >
                <BookOpen className="h-5 w-5" />
                Pelajari Lebih Lanjut
              </Button>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">21.6%</div>
              <p className="text-gray-600">Prevalensi Stunting di Indonesia (2022)</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">1000+</div>
              <p className="text-gray-600">Anak Terpantau</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">WHO</div>
              <p className="text-gray-600">Standar Pertumbuhan Internasional</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="mb-4 text-gray-900">Fitur Unggulan</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Sistem komprehensif untuk memantau dan mencegah stunting pada anak
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <Card className="border-2 border-gray-200 hover:border-blue-400 transition-colors">
              <CardContent className="p-6">
                <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="mb-2 text-gray-900">Kurva Pertumbuhan WHO</h3>
                <p className="text-gray-600">
                  Grafik pertumbuhan dengan standar WHO untuk berat badan dan tinggi badan, lengkap dengan zona interpretasi warna
                </p>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="border-2 border-gray-200 hover:border-purple-400 transition-colors">
              <CardContent className="p-6">
                <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <AlertCircle className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="mb-2 text-gray-900">Deteksi Dini Stunting</h3>
                <p className="text-gray-600">
                  Sistem peringatan otomatis untuk anak yang berisiko stunting atau malnutrisi berdasarkan pengukuran
                </p>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className="border-2 border-gray-200 hover:border-green-400 transition-colors">
              <CardContent className="p-6">
                <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="mb-2 text-gray-900">Panduan Nutrisi</h3>
                <p className="text-gray-600">
                  Rekomendasi makanan bergizi dan panduan pencegahan stunting sesuai dengan usia anak
                </p>
              </CardContent>
            </Card>

            {/* Feature 4 */}
            <Card className="border-2 border-gray-200 hover:border-amber-400 transition-colors">
              <CardContent className="p-6">
                <div className="bg-amber-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-amber-600" />
                </div>
                <h3 className="mb-2 text-gray-900">Riwayat Pertumbuhan</h3>
                <p className="text-gray-600">
                  Tracking perkembangan anak dari waktu ke waktu untuk melihat tren pertumbuhan secara visual
                </p>
              </CardContent>
            </Card>

            {/* Feature 5 */}
            <Card className="border-2 border-gray-200 hover:border-red-400 transition-colors">
              <CardContent className="p-6">
                <div className="bg-red-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="mb-2 text-gray-900">Dashboard Kesehatan</h3>
                <p className="text-gray-600">
                  Dashboard interaktif dengan statistik lengkap dan visualisasi data kesehatan semua anak
                </p>
              </CardContent>
            </Card>

            {/* Feature 6 */}
            <Card className="border-2 border-gray-200 hover:border-indigo-400 transition-colors">
              <CardContent className="p-6">
                <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="mb-2 text-gray-900">Manajemen Data Posyandu</h3>
                <p className="text-gray-600">
                  Input dan kelola data pemeriksaan bulanan dengan mudah, lengkap dengan validasi otomatis
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="mb-4 text-gray-900">Cara Kerja</h2>
            <p className="text-xl text-gray-600">
              Tiga langkah sederhana untuk memantau kesehatan anak
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative">
              <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-blue-200">
                <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <span className="text-xl">1</span>
                </div>
                <h3 className="text-center mb-3 text-gray-900">Input Data Pemeriksaan</h3>
                <p className="text-center text-gray-600">
                  Masukkan data hasil pemeriksaan posyandu: nama, usia, berat, tinggi, dan tanggal pemeriksaan
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-purple-200">
                <div className="bg-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <span className="text-xl">2</span>
                </div>
                <h3 className="text-center mb-3 text-gray-900">Analisis Otomatis</h3>
                <p className="text-center text-gray-600">
                  Sistem menghitung status gizi berdasarkan standar WHO dan menampilkan hasil pada kurva pertumbuhan
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-green-200">
                <div className="bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <span className="text-xl">3</span>
                </div>
                <h3 className="text-center mb-3 text-gray-900">Dapatkan Rekomendasi</h3>
                <p className="text-center text-gray-600">
                  Terima panduan nutrisi dan peringatan jika anak memerlukan perhatian khusus atau intervensi
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="mb-6 text-gray-900">Mengapa Tanduvia?</h2>
              <p className="text-lg text-gray-600 mb-8">
                Tanduvia membantu petugas posyandu dan orang tua dalam memantau kesehatan anak secara akurat dan efisien
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 p-1 rounded-full mt-1">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-gray-900 mb-1">Standar Internasional</h4>
                    <p className="text-gray-600">Menggunakan kurva pertumbuhan WHO yang telah tervalidasi secara global</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 p-1 rounded-full mt-1">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-gray-900 mb-1">Deteksi Dini</h4>
                    <p className="text-gray-600">Identifikasi risiko stunting sejak dini untuk intervensi yang tepat waktu</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 p-1 rounded-full mt-1">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-gray-900 mb-1">Mudah Digunakan</h4>
                    <p className="text-gray-600">Interface yang intuitif dan responsif untuk desktop maupun mobile</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 p-1 rounded-full mt-1">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-gray-900 mb-1">Panduan Lengkap</h4>
                    <p className="text-gray-600">Rekomendasi nutrisi dan edukasi untuk mencegah malnutrisi</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-purple-100 p-8 rounded-2xl">
              <div className="bg-white p-6 rounded-xl shadow-lg mb-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-600">Status Gizi Normal</span>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">85%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-green-500 h-3 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg mb-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-600">Perlu Perhatian</span>
                  <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm">10%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-amber-500 h-3 rounded-full" style={{ width: '10%' }}></div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-600">Perlu Intervensi</span>
                  <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">5%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-red-500 h-3 rounded-full" style={{ width: '5%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="mb-6 text-white">Mulai Pantau Kesehatan Anak Sekarang</h2>
          <p className="text-xl text-blue-100 mb-8">
            Bergabunglah dengan ribuan orang tua dan petugas kesehatan yang telah mempercayai Tanduvia untuk memantau pertumbuhan anak
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            onClick={onGetStarted}
            className="gap-2 text-lg px-8 py-6"
          >
            Mulai Pemeriksaan Gratis
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-blue-600 text-white p-2 rounded-lg">
                  <Heart className="h-5 w-5" fill="currentColor" />
                </div>
                <span className="text-white">Tanduvia</span>
              </div>
              <p className="text-sm">
                Sistem pemantauan kesehatan anak berbasis WHO untuk mencegah stunting di Indonesia
              </p>
            </div>
            <div>
              <h4 className="text-white mb-4">Tentang</h4>
              <ul className="space-y-2 text-sm">
                <li>Tentang Tanduvia</li>
                <li>Standar WHO</li>
                <li>Tim Kami</li>
                <li>Kontak</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white mb-4">Sumber Daya</h4>
              <ul className="space-y-2 text-sm">
                <li>Panduan Penggunaan</li>
                <li>FAQ</li>
                <li>Artikel Kesehatan</li>
                <li>Dukungan</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            <p>&copy; 2025 Tanduvia. Semua hak dilindungi. Dibuat untuk kesehatan anak Indonesia.</p>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}