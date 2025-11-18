import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import { Badge } from '../ui/badge';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { nutritionalGuidelines, stuntingPrevention } from '../../data/mockHealthData';
import { 
  Apple, 
  Milk, 
  Wheat, 
  Droplet, 
  Egg, 
  Carrot,
  AlertCircle,
  Clock,
  CheckCircle
} from 'lucide-react';

const iconMap: Record<string, any> = {
  'Apple': Apple,
  'Milk': Milk,
  'Wheat': Wheat,
  'Droplet': Droplet,
  'Egg': Egg,
  'Carrot': Carrot,
};

export function NutritionEducation() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mb-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-6 items-center">
            <div className="p-8 lg:p-12 text-white">
              <h1 className="mb-4 text-white">
                Panduan Gizi untuk Pertumbuhan Sehat
              </h1>
              <p className="text-lg text-blue-100 mb-6">
                Pelajari cara mencegah stunting dan malnutrisi melalui nutrisi yang tepat dan praktik pemberian makan yang baik.
              </p>
              <div className="flex gap-2 flex-wrap">
                <Badge className="bg-white text-blue-600">Berbasis Bukti</Badge>
                <Badge className="bg-white text-blue-600">Pedoman WHO</Badge>
                <Badge className="bg-white text-blue-600">Disetujui Ahli</Badge>
              </div>
            </div>
            <div className="hidden lg:block h-[300px]">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1761839258044-e59f324b5a7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwY2hpbGRyZW4lMjBlYXRpbmd8ZW58MXx8fHwxNzYyNzgzMDYyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Anak sehat sedang makan"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Warning Section */}
        <Card className="mb-8 border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-900">
              <AlertCircle className="h-5 w-5" />
              Memahami Stunting & Malnutrisi
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-red-900 mb-2">Apa itu Stunting?</h3>
              <p className="text-red-800 text-sm">
                Stunting adalah kondisi di mana tinggi badan anak jauh di bawah rentang yang diharapkan untuk usianya. Ini disebabkan oleh malnutrisi kronis dan dapat berdampak jangka panjang pada perkembangan fisik dan kognitif.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg">
                <h4 className="text-red-900 mb-2 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  Tanda Peringatan
                </h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  {stuntingPrevention.warningSign.map((sign, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">•</span>
                      <span>{sign}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h4 className="text-green-900 mb-2 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Intervensi Dini
                </h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  {stuntingPrevention.earlyInterventions.map((intervention, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span>{intervention}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Essential Food Groups */}
        <div className="mb-8">
          <h2 className="mb-6 text-gray-900">Kelompok Makanan Esensial</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nutritionalGuidelines.map((guideline) => {
              const IconComponent = iconMap[guideline.icon] || Apple;
              return (
                <Card key={guideline.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-3">
                      <IconComponent className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-lg">{guideline.title}</CardTitle>
                    <CardDescription>{guideline.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-3">
                      <Badge variant="secondary">{guideline.ageGroup}</Badge>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Makanan yang direkomendasikan:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {guideline.foods.map((food, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {food}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Feeding Schedule */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Jadwal Pemberian Makan Sesuai Usia
            </CardTitle>
            <CardDescription>
              Ikuti pedoman ini untuk nutrisi optimal di setiap tahap perkembangan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 gap-4">
              {Object.entries(stuntingPrevention.feedingSchedule).map(([age, schedule]) => (
                <div key={age} className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-gray-900 mb-2">{age}</h4>
                  <p className="text-sm text-gray-600">{schedule}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Sample Meal Plans */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Contoh Menu Harian</CardTitle>
            <CardDescription>
              Contoh menu untuk memastikan nutrisi seimbang sepanjang hari
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="6-12-months">
                <AccordionTrigger>6-12 Bulan</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 text-sm">
                    <div>
                      <strong className="text-gray-900">Sarapan:</strong>
                      <p className="text-gray-600">Bubur sereal yang diperkaya zat besi dicampur ASI atau susu formula, pisang lumat</p>
                    </div>
                    <div>
                      <strong className="text-gray-900">Pagi:</strong>
                      <p className="text-gray-600">ASI atau susu formula</p>
                    </div>
                    <div>
                      <strong className="text-gray-900">Makan Siang:</strong>
                      <p className="text-gray-600">Ubi jalar lumat dengan ayam lumat, wortel kukus</p>
                    </div>
                    <div>
                      <strong className="text-gray-900">Camilan Sore:</strong>
                      <p className="text-gray-600">Alpukat lumat, ASI atau susu formula</p>
                    </div>
                    <div>
                      <strong className="text-gray-900">Makan Malam:</strong>
                      <p className="text-gray-600">Nasi lembut dengan lentil, sayuran lumat</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="12-24-months">
                <AccordionTrigger>12-24 Bulan</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 text-sm">
                    <div>
                      <strong className="text-gray-900">Sarapan:</strong>
                      <p className="text-gray-600">Telur orak-arik dengan roti gandum, potongan buah, susu</p>
                    </div>
                    <div>
                      <strong className="text-gray-900">Camilan Pagi:</strong>
                      <p className="text-gray-600">Keju potong dan biskuit, air putih</p>
                    </div>
                    <div>
                      <strong className="text-gray-900">Makan Siang:</strong>
                      <p className="text-gray-600">Ikan bakar dengan nasi merah, brokoli kukus, yogurt</p>
                    </div>
                    <div>
                      <strong className="text-gray-900">Camilan Sore:</strong>
                      <p className="text-gray-600">Irisan apel dengan selai kacang (jika tidak alergi), susu</p>
                    </div>
                    <div>
                      <strong className="text-gray-900">Makan Malam:</strong>
                      <p className="text-gray-600">Sup ayam dengan sayuran dan kentang, roti</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="24-36-months">
                <AccordionTrigger>24-36 Bulan</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 text-sm">
                    <div>
                      <strong className="text-gray-900">Sarapan:</strong>
                      <p className="text-gray-600">Oatmeal dengan berry dan kacang, telur rebus, susu</p>
                    </div>
                    <div>
                      <strong className="text-gray-900">Camilan Pagi:</strong>
                      <p className="text-gray-600">Pisang dengan yogurt</p>
                    </div>
                    <div>
                      <strong className="text-gray-900">Makan Siang:</strong>
                      <p className="text-gray-600">Daging sapi tumis sayuran, quinoa, irisan jeruk</p>
                    </div>
                    <div>
                      <strong className="text-gray-900">Camilan Sore:</strong>
                      <p className="text-gray-600">Wortel stik dengan hummus, susu</p>
                    </div>
                    <div>
                      <strong className="text-gray-900">Makan Malam:</strong>
                      <p className="text-gray-600">Salmon panggang, ubi jalar, buncis, salad buah</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        {/* Visual Guide */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="overflow-hidden">
            <div className="h-48 overflow-hidden">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1674758001966-8a0bd2b72529?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxudXRyaXRpb3VzJTIwZm9vZCUyMHZlZ2V0YWJsZXN8ZW58MXx8fHwxNzYyNzgzMDYyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Sayuran bergizi"
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader>
              <CardTitle>Piring Warna-Warni</CardTitle>
              <CardDescription>
                Sertakan berbagai sayuran dan buah berwarna dalam setiap makan untuk memastikan nutrisi yang beragam
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="overflow-hidden">
            <div className="h-48 overflow-hidden">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1613082487279-1e16f1e81505?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcnVpdHMlMjBoZWFsdGh5JTIwZGlldHxlbnwxfHx8fDE3NjI3ODMwNjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Buah-buahan segar"
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader>
              <CardTitle>Buah Segar</CardTitle>
              <CardDescription>
                Tawarkan buah musiman segar sebagai camilan dan pencuci mulut untuk vitamin dan mineral alami
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Important Tips */}
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-900">Tips Penting yang Harus Diingat</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-blue-900">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>Jangan pernah memaksakan anak untuk makan. Dorong makan tapi hormati nafsu makan mereka.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>Hindari minuman manis dan junk food. Fokus pada makanan utuh dan bergizi.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>Pertahankan waktu makan yang teratur untuk membentuk kebiasaan makan yang sehat.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>Lanjutkan pemberian ASI bersama makanan padat hingga setidaknya usia 2 tahun.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>Pastikan kebersihan yang baik saat menyiapkan dan menyimpan makanan untuk mencegah penyakit.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>Jadwalkan pemeriksaan kesehatan rutin untuk memantau pertumbuhan dan perkembangan.</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}