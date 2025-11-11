import { Download } from "lucide-react";

export default function PdfViewer() {
  return (
    <div className="h-full flex flex-col bg-[#28292A]">
      <div className="px-4 py-2 border-b flex justify-between">
        <span className="mt-2">Alexandru-Moise.pdf</span>
        <a href="/Alexandru-Moise-CV-2025.pdf" download>
          <button className="px-3 py-2 bg-yellow-500 text-black rounded hover:bg-yellow-400 transition-colors font-medium">
            <div className="flex">
              <Download size={20} className="mr-2" />
              Download PDF
            </div>
          </button>
        </a>
      </div>
      <iframe src="/Alexandru-Moise-CV-2025.pdf" className="flex-1 w-full" />
    </div>
  );
}
