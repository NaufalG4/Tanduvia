import { Dialog, DialogContent } from "../ui/dialog";
import { AlertTriangle } from "lucide-react";
import { ChildHealthData } from "../../types/health";

interface NutritionalStatusAlertProps {
  child: ChildHealthData | null;
  open: boolean;
  onClose: () => void;
}

export function NutritionalStatusAlert({
  child,
  open,
  onClose,
}: NutritionalStatusAlertProps) {
  if (!child) return null;

  const status = child.nutritionalStatus;

  // Konfigurasi tampilan & teks berdasarkan status
  const config =
    status === "normal"
      ? {
          headerBg: "bg-green-50 border-b border-green-200",
          iconColor: "text-green-600",
          title: "Status Gizi Normal",
          highlight: (
            <>
              <strong>{child.name}</strong> berada dalam{" "}
              <span className="text-green-700 font-semibold">
                status gizi normal
              </span>
              .
            </>
          ),
          bodyTitle: "Pertumbuhan Sesuai Standar WHO",
          bodyText:
            "Berdasarkan kurva pertumbuhan, tinggi dan berat badan anak berada dalam rentang yang diharapkan untuk usianya. Pertumbuhan berjalan baik dan stabil.",
          listTitle: "Hal yang Disarankan:",
          listItems: [
            "Pertahankan pola makan seimbang sesuai usia anak.",
            "Pastikan waktu tidur cukup dan anak tetap aktif bermain.",
            "Lanjutkan pemantauan pertumbuhan secara rutin di posyandu.",
            "Konsultasikan ke tenaga kesehatan bila terlihat perubahan yang mengkhawatirkan.",
          ],
          buttonClass: "bg-green-700 hover:bg-green-800",
        }
      : {
          headerBg: "bg-amber-50 border-b border-amber-200",
          iconColor: "text-amber-600",
          title: "Peringatan Status Gizi",
          highlight: (
            <>
              <strong>{child.name}</strong> telah diidentifikasi mengalami{" "}
              <span className="text-red-600 font-semibold">
                kondisi gizi khusus.
              </span>
            </>
          ),
          bodyTitle:
            "Stunting/Wasting berarti tinggi atau berat badan anak berada di bawah rentang yang diharapkan untuk usianya.",
          bodyText:
            "Pemantauan rutin, perbaikan pola makan, dan konsultasi dengan tenaga kesehatan sangat dianjurkan untuk mencegah risiko jangka panjang.",
          listTitle: "Tindakan yang Disarankan:",
          listItems: [
            "Konsultasi dengan tenaga kesehatan anak.",
            "Tinjau dan tingkatkan kualitas asupan nutrisi harian.",
            "Ikuti jadwal pemantauan pertumbuhan secara rutin.",
            "Pertimbangkan rujukan bila tidak ada perbaikan signifikan.",
          ],
          buttonClass: "bg-slate-900 hover:bg-slate-950",
        };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 rounded-2xl overflow-hidden">

        {/* HEADER (krem / hijau, sama struktur dengan screenshot) */}
        <div
          className={`${config.headerBg} px-6 py-4 flex items-center gap-3`}
        >
          <AlertTriangle className={`h-5 w-5 ${config.iconColor}`} />
          <h2 className="text-lg font-semibold text-gray-900">
            {config.title}
          </h2>
        </div>

        {/* BODY */}
        <div className="p-6 space-y-4">

          {/* KARTU 1: IDENTITAS */}
          <div className="rounded-xl border bg-white px-5 py-4">
            <p className="text-gray-800">{config.highlight}</p>
            <p className="mt-2 text-gray-700">
              Tinggi saat ini: <strong>{child.height} cm</strong> (Usia:{" "}
              {child.age} bulan).
            </p>
          </div>

          {/* KARTU 2: PENJELASAN (BIRU) */}
          <div className="rounded-xl border bg-blue-50 px-5 py-4">
            <p className="font-semibold text-blue-900">{config.bodyTitle}</p>
            <p className="mt-2 text-blue-800">{config.bodyText}</p>
          </div>

          {/* KARTU 3: SARAN */}
          <div className="rounded-xl border bg-white px-5 py-4">
            <p className="font-semibold text-gray-900">
              {config.listTitle}
            </p>
            <ul className="mt-2 list-disc ml-5 space-y-1 text-gray-700">
              {config.listItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          {/* TOMBOL */}
          <div className="pt-2">
            <button
              onClick={onClose}
              className={`px-5 py-2 text-white rounded-md text-sm font-medium ${config.buttonClass}`}
            >
              Saya Mengerti
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
